import { prisma } from "../../lib/prisma";
import { useEffect, useState } from "react";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "../../components/Button";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EmailIcon from "@mui/icons-material/Email";
import Widebutton from "../../components/WideButton";
import { useRouter } from "next/router";
import ViewLikesCounter from "../../components/ViewLikesCounter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { Rating } from "@mui/material";
import Image from "next/image";

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.user;
    const id = Number(params.id);

    const lawfirmFromId = await prisma.lawfirms.findUnique({
      where: {
        id
      }
    });

    const lawfirmMembers = await prisma.lawfirm_members.findMany({
      where: {
        lawfirm_id: id
      },
      include: {
        lawyers: true
      }
    });

    const parsedMembers = lawfirmMembers.map((member) => ({
      id: member.lawyers.id,
      image: member.lawyers.profile_pic
    }));
    console.log(parsedMembers);

    const lawfirmFavourite = await prisma.lawfirm_favourites.findFirst({
      where: {
        lawfirm_id: id
      }
    });

    const lawfirmConnection = await prisma.lawfirm_connections.findFirst({
      where: {
        lawfirm_id: id
      },
      orderBy: [
        {
          date_changed: "desc"
        }
      ]
    });

    return {
      props: {
        user,
        lawfirmFavourite,
        lawfirmConnection,
        lawfirm: lawfirmFromId,
        lawyers: parsedMembers
      }
    };
  },
  sessionOptions
);

const Lawyer = ({
  setHeader,
  setNavbar,
  lawfirm,
  user,
  lawfirmFavourite,
  lawfirmConnection,
  lawyers
}) => {
  const router = useRouter();
  const {
    name,
    address,
    phone_number,
    location,
    email,
    profile_pic,
    description,
    registration_date,
    views,
    likes,
    rating
  } = lawfirm;
  useEffect(() => {
    setHeader((prev) => ({ ...prev, hidden: true }));
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const [favourited, setFavourited] = useState(lawfirmFavourite ? true : false);
  const [connection, setConnection] = useState({
    pending: lawfirmConnection ? lawfirmConnection.pending : false,
    accepted: lawfirmConnection ? lawfirmConnection.accepted : false
  });
  const userIds = { client_id: user.id, lawfirm_id: lawfirm.id };

  const sendConnectionRequest = async (connectionIds) => {
    const response = await fetch("/api/connections/lawfirms/create", {
      method: "POST",
      body: JSON.stringify({ ...connectionIds, date_changed: new Date() })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("sent connection request!");
    return await response.json();
  };

  const destroyConnectionRequest = async (connectionIds) => {
    const response = await fetch("/api/connections/lawfirms/delete", {
      method: "POST",
      body: JSON.stringify({ ...connectionIds })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("destroyed connection!");
    return await response.json();
  };

  const saveFavourite = async (favourite) => {
    const response = await fetch("/api/favourites/lawfirms/create", {
      method: "POST",
      body: JSON.stringify({ ...favourite, date_created: new Date() })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("saved!");
    return await response.json();
  };

  const destroyFavourite = async (favourite) => {
    const response = await fetch("/api/favourites/lawfirms/delete", {
      method: "POST",
      body: JSON.stringify(favourite)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("destroyed!");
    return await response.json();
  };

  const lawyerArray = lawyers.map((item) => {
    return (
      <Image
        className="image"
        height={100}
        width={100}
        src={item.image}
        key={item.id}
        lawyerId={item.id}
      />
    );
  });

  return (
    <RoundedTopContainer
      image="/images/backgrounds/forest.jpeg"
      height="600px"
      alt="forest"
      padBottom
    >
      {favourited && (
        <FavoriteIcon
          sx={{ color: "#ff0056", position: "absolute", zIndex: "10" }}
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
          sx={{ color: "#ff0056", position: "absolute", zIndex: "10" }}
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
      <UserStatsCard name={name} image={profile_pic}></UserStatsCard>
      <div className="flex-center">
        <Rating
          name="read-only"
          value={rating / 10}
          precision={0.1}
          readOnly
          size="large"
        />
      </div>
      <ViewLikesCounter views={views} likes={likes} />
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="#00589B"
            padding="0.5rem 1rem"
            background={
              connection.pending || connection.accepted ? "grey" : null
            }
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
            onClick={() => router.push(`/messages/law_firms/${lawfirm.id}`)}
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
          <strong>
            Recognized Since: {new Date(registration_date).getFullYear()}
          </strong>
        </Typography>
      </div>
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
        </div>
      </Widebutton>
      <Accordion
        sx={{
          backgroundColor: "#1B4463",
          padding: "0 0.7em",
          marginTop: "1em",
          color: "white",
          textAlign: "center"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography variant="body2">More About {name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left" }}>
          {description}
        </AccordionDetails>
      </Accordion>
      <div className="lawyers">{lawyerArray}</div>

      <style jsx>{`
        .lawyers {
          margin: 1rem 0 3rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: 0.5rem;
          row-gap: 0.5rem;
        }
        .flex-center {
          display: grid;
          place-items: center;
          padding: 0.3rem 0 0.5rem 0;
        }
      `}</style>
    </RoundedTopContainer>
  );
};

export default Lawyer;
