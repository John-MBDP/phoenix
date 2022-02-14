import RoundedTopContainer from "../components/RoundedTopContainer";
import MenuItem from "../components/MenuItem";
import List from "@mui/material/List";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import FaceIcon from "@mui/icons-material/Face";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import UserStatCard from "../components/UserStatsCard";
import { Typography, Box, TextField } from "@material-ui/core";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { Label } from "@mui/icons-material";

const PersonalInfo = () => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    emailAdress: ""
  });

  const handleInput = (e) => {
    console.log(formInput);
    setFormInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <RoundedTopContainer image={"/images/articles/forest.jpeg"} alt={"forest"}>
      <UserStatCard />

      <div sx={{ pl: "1rem" }}>
        <Typography component="h1" variant="h6" sx={{ color: "pink" }}>
          Personal Information
        </Typography>
      </div>

      <form>
        <TextField
          fullWidth
          label="First Name"
          id="first-name"
          name="firstName"
          value={formInput.firstName}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formInput.lastName}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email Address"
          name="emailAdress"
          value={formInput.emailAdress}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formInput.phoneNumber}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formInput.address}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
      </form>
    </RoundedTopContainer>
  );
};

export default PersonalInfo;
