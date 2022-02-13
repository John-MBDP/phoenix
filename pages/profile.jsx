import RoundedTopContainer from "../components/RoundedTopContainer";
import MenuItem from "../components/MenuItem";
import Person from "@mui/icons-material/Person";
import List from "@mui/material/List";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import FaceIcon from "@mui/icons-material/Face";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  return (
    <RoundedTopContainer image={"/images/articles/forest.jpeg"} alt={"forest"}>
      <List component="nav">
        <MenuItem heading="Personal Information">
          <FaceIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Notifications">
          <NotificationImportantIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Payments">
          <LocalAtmIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="How does Phoenix Work?">
          <ReportIcon sx={{ color: "black" }} />
        </MenuItem>
        <MenuItem heading="Log Out">
          <LogoutIcon sx={{ color: "black" }} />
        </MenuItem>
      </List>
    </RoundedTopContainer>
  );
};

export default Profile;
