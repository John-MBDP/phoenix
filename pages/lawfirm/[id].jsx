import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { prisma } from "../../lib/prisma";

import Button from "../../components/Button";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import Widebutton from "../../components/WideButton";
import UserStatsCard from "../../components/UserStatsCard";
import sessionOptions from "../../lib/session";
import ViewLikesCounter from "../../components/ViewLikesCounter";
import { saveFavourite, destroyFavourite } from "../../lib/lawfirmFavourites";
import {
  sendConnectionRequest,
  destroyConnectionRequest
} from "../../lib/lawfirmConnections";
import Image from "next/image";
import Link from "next/link";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomAccordion from "../../components/Accordion";

import { Rating, Typography } from "@mui/material";

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

  const lawyerArray = lawyers.map((item) => {
    return (
      <Link key={item.id} href={`/lawyer/${item.id}`}>
        <div>
          <Image className="image" height={100} width={100} src={item.image} />
        </div>
      </Link>
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

      <CustomAccordion
        header={`More about ${name}`}
        description={description}
      />

      <RoundedTopContainer.Header text="Lawfirm Members" />
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
