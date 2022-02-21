import RoundedTopContainer from "../components/RoundedTopContainer";
import MenuItem from "../components/MenuItem";
import List from "@mui/material/List";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import FaceIcon from "@mui/icons-material/Face";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import UserStatCard from "../components/UserStatsCard";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import ViewLikesCounter from "../components/ViewLikesCounter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Profile = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  return (
    <RoundedTopContainer
      image={"/images/articles/forest.jpeg"}
      alt={"forest"}
      height="600px"
      padBottom
    >
      <UserStatCard name="Hu Tao" />
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
        <MenuItem heading="Notifications" path="/notifications">
          <NotificationImportantIcon sx={{ color: "black" }} />
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
