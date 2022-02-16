import { useEffect } from "react";
import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Stack from "@mui/material/Stack";

const btnMain = {
  alignItems: "right"
};

const signup = ({ setHeader }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer
      image={"/images/signup.png"}
      alt={"signup-image"}
      height="400px"
    >
      <Typography variant="h4" component="h1">
        Signup
      </Typography>
      {/* <TextField id="standard-basic" label="Full Name" variant="standard" fullWidth /> */}
      <TextField
        sx={{ mb: 2 }}
        id="input-with-icon-textfield"
        label="Full Name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountBoxIcon sx={{ color: "black" }} />
            </InputAdornment>
          )
        }}
        fullWidth
        variant="standard"
      />
      <TextField
        sx={{ mb: 2 }}
        id="input-with-icon-textfield"
        label="Email Address"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailIcon sx={{ color: "black" }} />
            </InputAdornment>
          )
        }}
        fullWidth
        variant="standard"
      />
      <TextField
        sx={{ mb: 2 }}
        id="input-with-icon-textfield"
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon sx={{ color: "black" }} />
            </InputAdornment>
          )
        }}
        variant="standard"
        fullWidth
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Checkbox {...label} />
        Terms and Conditions
      </Stack>
      <Stack sx={{ mb: 2, spacing: 2 }}>
        <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
          SIGN UP
        </Button>
        <Typography
          sx={{ display: "flex", justifyContent: "flex-end" }}
          variant="h7"
        >
          LOG IN
        </Typography>

        {/* 
        <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
          LOG IN
        </Button> */}
      </Stack>
    </RoundedTopContainer>
  );
};

export default signup;
