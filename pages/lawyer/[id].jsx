import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useEffect } from "react";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import { Box, Typography } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "../../components/Button";
import AnnouncementIcon from "@mui/icons-material/Announcement";

export const getServerSideProps = async (context) => {
  const id = Number(context.params.id);
  console.log(id);
  const lawyer = await prisma.lawyers.findUnique({
    where: {
      id: id
    }
  });
  console.log(lawyer);
  return {
    props: {
      lawyer
    }
  };
};

const Lawyer = ({ setHeader, lawyer }) => {
  const {
    last_name,
    first_name,
    address,
    date_certified,
    phone_number,
    location
  } = lawyer;
  useEffect(() => {
    setHeader((prev) => ({ ...prev, hidden: true }));
  }, []);
  console.log(lawyer);
  return (
    <RoundedTopContainer
      image="/images/articles/forest.jpeg"
      height="600px"
      alt="forest"
    >
      <UserStatsCard name={`${first_name} ${last_name}`}></UserStatsCard>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          justifyContent="center"
          color="#00589B"
          padding="0.5rem 1rem"
          icon={<AnnouncementIcon />}
          onClick={() => console.log("button")}
        >
          message
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2">
          <LocationOnIcon fontSize="16px" />
          {`${address}, ${location}`}
        </Typography>

        <Typography variant="body2">
          <PhoneIcon fontSize="16px" />
          {phone_number}
        </Typography>
        <Typography variant="body2">
          <strong>Recognized Since: {date_certified.getFullYear()}</strong>
        </Typography>
      </Box>
    </RoundedTopContainer>
  );
};

export default Lawyer;
