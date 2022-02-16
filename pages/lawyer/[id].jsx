import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useEffect } from "react";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import { Box as div, Typography } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "../../components/Button";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EmailIcon from "@mui/icons-material/Email";
import Widebutton from "../../components/WideButton";
export const getServerSideProps = async (context) => {
  const id = Number(context.params.id);
  const lawyer = await prisma.lawyers.findUnique({
    where: {
      id: id
    }
  });

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
    email,
    profile_pic,
    education
  } = lawyer;
  useEffect(() => {
    setHeader((prev) => ({ ...prev, hidden: true }));
  }, []);
  return (
    <RoundedTopContainer
      image="/images/articles/forest.jpeg"
      height="600px"
      alt="forest"
      padBottom
    >
      <UserStatsCard
        name={`${first_name} ${last_name}`}
        image={profile_pic}
      ></UserStatsCard>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="#00589B"
            padding="0.5rem 1rem"
            icon={<AnnouncementIcon />}
            onClick={() => console.log("button")}
          >
            connect
          </Button>
          <div style={{ width: "0.2rem" }}></div>
          <Button
            background="#00589B"
            padding="0.5rem 1rem"
            icon={<AnnouncementIcon />}
            onClick={() => console.log("button")}
          >
            message
          </Button>
        </div>
      </div>
      <div>
        <Typography variant="body2">
          <LocationOnIcon fontSize="20" sx={{ mr: " 0.3rem" }} />
          {`${address}, ${location}`}
        </Typography>

        <Typography variant="body2">
          <PhoneIcon fontSize="20px" sx={{ mr: " 0.3rem" }} />
          {phone_number}
        </Typography>
        <Typography variant="body2">
          <EmailIcon fontSize="16px" sx={{ mr: " 0.3rem" }} />
          {email}
        </Typography>
        <Typography variant="body2">
          <strong>Recognized Since: {date_certified.getFullYear()}</strong>
        </Typography>
      </div>
      <Widebutton
        color="black"
        outLineColor="#1B4463"
        padding=" 0.3rem 0"
        outline
        strong
        ammount="$550"
      >
        <div>
          <Typography variant="button">
            <strong>ONE TIME SERVICE FEE</strong>
          </Typography>
          <Typography variant="caption">click to see more</Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton>
      <Widebutton
        color="black"
        outLineColor="#00589B"
        padding="0.3rem 0"
        outline
        strong
        ammount="$550"
      >
        <div>
          <Typography variant="button">
            <strong>Monthly Fee</strong>
          </Typography>
          <Typography variant="caption">click to see more</Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton>
      <Widebutton
        color="white"
        padding="1rem 0"
        strong
        backgroundColor="#1B4463"
      >
        <div>
          <Typography variant="button">Firm Affiliation</Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton>
      <Widebutton
        color="white"
        padding="0.4rem 0"
        strong
        backgroundColor="#1B4463"
        textAlign="left"
      >
        <div>
          <Typography variant="body2">Expertise:</Typography>
          <Typography variant="caption">
            Mining, Criminal, Administrative
          </Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton>
      <Widebutton
        color="white"
        padding="0.4rem 0"
        strong
        backgroundColor="#1B4463"
        textAlign="left"
        onClick={(e) => console.log("potato")}
      >
        <div>
          <Typography variant="body2">Education:</Typography>
          <Typography variant="caption">{education}</Typography>
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
