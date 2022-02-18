import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useEffect, useState } from "react";
import RoundedTopContainer from "../../components/RoundedTopContainer";
import UserStatsCard from "../../components/UserStatsCard";
import { Typography } from "@material-ui/core";
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

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.user;
    const id = Number(params.id);

    const lawfirmFromId = await prisma.lawfirms.findUnique({
      where: {
        id
      }
    });

    const lawfirmFavourite = await prisma.lawfirm_favourites.findFirst({
      where: {
        lawfirm_id: id
      }
    });
    console.log(lawfirmFromId);
    return {
      props: {
        user,
        lawfirmFavourite,
        lawfirm: lawfirmFromId
      }
    };
  },
  sessionOptions
);

const Lawyer = ({ setHeader, setNavbar, lawfirm, user, lawfirmFavourite }) => {
  const router = useRouter();
  const {
    name,
    address,
    phone_number,
    location,
    email,
    profile_pic,
    education,
    registration_date,
    views,
    likes
  } = lawfirm;
  useEffect(() => {
    setHeader((prev) => ({ ...prev, hidden: true }));
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const [favourited, setFavourited] = useState(lawfirmFavourite ? true : false);
  const favourite = { client_id: user.id, lawyer_id: lawfirm.id };

  const saveFavourite = async (favourite) => {
    const response = await fetch("/api/favourites/lawyers/create", {
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
    const response = await fetch("/api/favourites/lawyers/delete", {
      method: "POST",
      body: JSON.stringify(favourite)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("destroyed!");
    return await response.json();
  };

  return (
    <RoundedTopContainer
      image="/images/articles/forest.jpeg"
      height="600px"
      alt="forest"
    >
      {favourited && (
        <FavoriteIcon
          sx={{ color: "salmon" }}
          onClick={async () => {
            try {
              await destroyFavourite(favourite);
              setFavourited(false);
            } catch (err) {
              console.log(err);
            }
          }}
        />
      )}
      {!favourited && (
        <FavoriteBorderIcon
          sx={{ color: "salmon" }}
          onClick={async () => {
            try {
              await saveFavourite(favourite);
              setFavourited(true);
            } catch (err) {
              console.log(err);
            }
          }}
        />
      )}
      <UserStatsCard name={name} image={profile_pic}></UserStatsCard>
      <ViewLikesCounter views={views} likes={likes} />
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
          <strong>
            Recognized Since: {new Date(registration_date).getFullYear()}
          </strong>
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
        onClick={() => router.push(`/lawfirm/${lawfirmId}`)}
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
