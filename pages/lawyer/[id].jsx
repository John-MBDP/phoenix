import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useEffect } from "react";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import { Box, Typography } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

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
      <UserStatsCard>hi</UserStatsCard>
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
          <strong>Recognised Since: {date_certified.getFullYear()}</strong>
        </Typography>
        {/* <style jsx>{`
            .container {
              display: flex;
              flex-direction: column;
            }
          `}</style> */}
      </Box>
    </RoundedTopContainer>
  );
};

export default Lawyer;
