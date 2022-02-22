import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";

import { prisma } from "../../lib/prisma";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import Button from "../../components/Button";
import ViewLikesCounter from "../../components/ViewLikesCounter";
import Widebutton from "../../components/WideButton";
import PaymentButton from "../../components/PaymentButton";
import { saveFavourite, destroyFavourite } from "../../lib/lawyerFavourites";
import {
  sendConnectionRequest,
  destroyConnectionRequest
} from "../../lib/lawyerConnections";
import CustomAccordion from "../../components/Accordion";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Typography,
  AccordionSummary,
  Accordion,
  AccordionDetails
} from "@mui/material";

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.user;
    const id = Number(params.id);

    const lawfirmMembers = await prisma.lawfirm_members.findMany({
      where: { lawyer_id: id },
      include: {
        lawyers: true
      }
    });
    const lawyerFields = await prisma.lawyer_fields.findMany({
      where: {
        lawyers_id: id
      },
      include: {
        fields_of_law: true
      }
    });

    const lawyerFavourite = await prisma.lawyer_favourites.findFirst({
      where: {
        lawyer_id: id
      }
    });

    const lawyerConnection = await prisma.lawyer_connections.findFirst({
      where: {
        lawyer_id: id
      },
      orderBy: [
        {
          date_changed: "desc"
        }
      ]
    });

    const lawyer = await prisma.lawyers.findUnique({
      where: { id }
    });
    const parsedLawyerFields = lawyerFields.map(
      (item) => item.fields_of_law.field
    );

    return {
      props: {
        user,
        lawyerFavourite,
        lawyerConnection,
        lawyer: {
          ...lawyer,
          date_certified: `${lawyer.date_certified.getFullYear()}`
        },
        lawfirmId:
          lawfirmMembers.length > 0 ? lawfirmMembers[0].lawfirm_id : null,
        fieldsOfLaw: parsedLawyerFields
      }
    };
  },
  sessionOptions
);

const Lawyer = ({
  setHeader,
  setNavbar,
  lawyer,
  lawfirmId,
  user,
  lawyerFavourite,
  lawyerConnection,
  fieldsOfLaw
}) => {
  const router = useRouter();
  const {
    last_name,
    first_name,
    address,
    phone_number,
    location,
    email,
    description,
    profile_pic,
    education,
    date_certified,
    views,
    likes
  } = lawyer;
  useEffect(() => {
    setHeader((prev) => ({ ...prev, hidden: true }));
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const [favourited, setFavourited] = useState(lawyerFavourite ? true : false);
  const [connection, setConnection] = useState({
    pending: lawyerConnection ? lawyerConnection.pending : false,
    accepted: lawyerConnection ? lawyerConnection.accepted : false
  });
  const userIds = { client_id: user.id, lawyer_id: lawyer.id };

  const handleLawfirmClick = () => {
    if (lawfirmId) {
      router.push(`/lawfirm/${lawfirmId}`);
    }
  };

  return (
    <RoundedTopContainer
      image="/images/backgrounds/forest.jpeg"
      height="600px"
      alt="forest"
      padBottom
    >
      {favourited && (
        <FavoriteIcon
          sx={{
            color: "#ff0056",
            position: "absolute",
            zIndex: "10",
            top: "0"
          }}
          onClick={async () => {
            try {
              await destroyFavourite(userIds);
              setFavourited(false);
            } catch (err) {
              console.log(err);
            }
          }}
        />
      )}
      {!favourited && (
        <FavoriteBorderIcon
          sx={{
            color: "#ff0056",
            position: "absolute",
            zIndex: "10",
            top: "0"
          }}
          onClick={async () => {
            try {
              await saveFavourite(userIds);
              setFavourited(true);
            } catch (err) {
              console.log(err);
            }
          }}
        />
      )}
      <UserStatsCard
        name={`${first_name} ${last_name}`}
        image={profile_pic}
      ></UserStatsCard>
      <ViewLikesCounter views={views} likes={likes} />
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="#00589B"
            background={
              connection.pending || connection.accepted ? "grey" : null
            }
            padding="0.5rem 1rem"
            icon={<AnnouncementIcon />}
            onClick={() => {
              if (!connection.pending && !connection.accepted) {
                try {
                  sendConnectionRequest(userIds);
                  setConnection({ ...connection, pending: true });
                } catch (err) {
                  console.log(err);
                }
              } else {
                try {
                  destroyConnectionRequest(userIds);
                  setConnection({
                    pending: false,
                    accepted: false
                  });
                } catch (err) {
                  console.log(err);
                }
              }
            }}
          >
            {(connection.pending && "request sent") ||
              (connection.accepted && "connected") ||
              "connect"}
          </Button>
          <div style={{ width: "0.2rem" }}></div>
          <Button
            background="#00589B"
            padding="0.5rem 1rem"
            icon={<AnnouncementIcon />}
            onClick={() => router.push(`/messages/lawyers/${lawyer.id}`)}
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
          <strong>Recognized Since: {date_certified}</strong>
        </Typography>
      </div>

      <PaymentButton
        lawyerId={lawyer.id}
        header="One time service fee"
        amount="125"
        paymentType="payment"
      />

      <PaymentButton
        lawyerId={lawyer.id}
        header="Monthly Fee"
        amount="550"
        paymentType="subscription"
      />

      <Widebutton
        color={lawfirmId ? "white" : "#405b6e"}
        padding="1rem 0"
        strong
        backgroundColor={lawfirmId ? "#1B4463" : "#0c1f2e"}
        onClick={handleLawfirmClick}
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
        backgroundColor="#2E2E2E"
        textAlign="left"
      >
        <div>
          <Typography variant="body2">Expertise:</Typography>
          <Typography variant="caption">
            {fieldsOfLaw ? `${fieldsOfLaw.join(", ")}` : null}
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
        backgroundColor="#2E2E2E"
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

      <CustomAccordion
        header={`More about ${first_name}`}
        description={description}
      />
      <CustomAccordion header={"Case History"} description={description} />
    </RoundedTopContainer>
  );
};

export default Lawyer;
