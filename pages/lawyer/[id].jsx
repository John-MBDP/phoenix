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
import EmailIcon from "@mui/icons-material/Email";
import Widebutton from "../../components/WideButton";
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
    location,
    email
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
        <Typography variant="body1">
          <LocationOnIcon fontSize="20" sx={{ mr: " 0.3rem" }} />
          {`${address}, ${location}`}
        </Typography>

        <Typography variant="body1">
          <PhoneIcon fontSize="20px" sx={{ mr: " 0.3rem" }} />
          {phone_number}
        </Typography>
        <Typography variant="body1">
          <EmailIcon fontSize="16px" sx={{ mr: " 0.3rem" }} />
          {email}
        </Typography>
        <Typography variant="body1">
          <strong>Recognized Since: {date_certified.getFullYear()}</strong>
        </Typography>
      </Box>
      <Widebutton
        color="black"
        outLineColor="#1B4463"
        padding="0.5rem 0"
        outline
        strong
        ammount="$550"
      >
        <div>
          <Typography variant="button">ONE TIME SERVICE FEE</Typography>
          <Typography variant="subtitle">click to see more</Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton>
    </RoundedTopContainer>
  );
};

export default Lawyer;
