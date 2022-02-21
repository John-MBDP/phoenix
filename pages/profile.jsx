import RoundedTopContainer from "../components/RoundedTopContainer";
import MenuItem from "../components/MenuItem";
import List from "@mui/material/List";
import FaceIcon from "@mui/icons-material/Face";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import UserStatCard from "../components/UserStatsCard";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import ViewLikesCounter from "../components/ViewLikesCounter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";
import { prisma } from "../lib/prisma";

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  console.log(user);
  const clientInfo = await prisma.clients.findUnique({
    where: {
      id: user.id
    }
  });
  console.log(clientInfo);

  return {
    props: {
      firstName: clientInfo.first_name,
      lastName: clientInfo.last_name
    }
  };
}, sessionOptions);

const Profile = ({ setHeader, setNavbar, firstName, lastName }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  return (
    <RoundedTopContainer
      image={"/images/backgrounds/forest.jpeg"}
      alt={"forest"}
      height="600px"
      padBottom
    >
      <UserStatCard name={`${firstName} ${lastName}`} />
      <ViewLikesCounter />
      <div style={{ paddingTop: "1rem" }}>
        <Typography
          component="h1"
          variant="h6"
          style={{ marginLeft: "1.5rem" }}
        >
          Account Settings
        </Typography>
      </div>

      <List component="nav">
        <MenuItem heading="Personal Information" path="/personal-info">
          <FaceIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Connections" path="/connections">
          <PersonAddIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Favourites" path="/favourites">
          <LogoutIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Service Status" path="/service-status">
          <LocalMallIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Payments" path="/payments">
          <LocalAtmIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="How does Phoenix Work?" path="/about-us">
          <ReportIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Log Out" path="/logout">
          <LogoutIcon sx={{ color: "black" }} />
        </MenuItem>
      </List>
    </RoundedTopContainer>
  );
};

export default Profile;
