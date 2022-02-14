import { useEffect } from "react";
import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

const signup = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer image={"/images/signup.png"} alt={"signup-image"} height="600px">
      <Typography variant="h4" component="h1">
        Signup
      </Typography>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-AccountBox">FullName:</InputLabel>
        <Input
          id="input-with-icon-AccountBox"
          endAdornment={
            <InputAdornment position="end">
              <AccountBoxIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-AccountBox">Email Adress:</InputLabel>
        <Input
          id="input-with-icon-AccountBox"
          endAdornment={
            <InputAdornment position="end">
              <MailIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-AccountBox">Password:</InputLabel>
        <Input
          id="input-with-icon-AccountBox"
          endAdornment={
            <inputAdornment position="end">
              <LockIcon />
            </inputAdornment>
          }
        />
      </FormControl>
    </RoundedTopContainer>
  );
};

export default signup;
