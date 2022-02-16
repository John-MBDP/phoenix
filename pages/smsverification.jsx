import RoundedTopContainer from "../components/RoundedTopContainer";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PublicIcon from "@mui/icons-material/Public";
// import Button from "../components/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../components/Button";
const SmsVerification = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer image={"/images/articles/forest.jpeg"} alt={"signup-image"} height="350px">
      <Typography variant="h5" sx={{ fontWeight: "800px", mb: 4 }}>
        SMS Verification
      </Typography>
      {/* <Button sx={{ display: "flex" }}>
        <PublicIcon sx={{ color: "black" }}></PublicIcon>
        <KeyboardArrowDownIcon sx={{ color: "black" }} />
      </Button> */}

      <TextField
        sx={{ mb: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
        id="standard-basic"
        label="Your Phone Number"
        value="+0123456789"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <KeyboardArrowDownIcon sx={{ color: "black" }} /> */}
              <PublicIcon sx={{ color: "black" }}></PublicIcon>
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </InputAdornment>
          ),
        }}
        variant="standard"
        fullWidth
      />
      <Typography paragraph={true} sx={{ fontWeight: "800px", mb: 4, color: "#FF0056" }}>
        Please check your messages for the verification code.
      </Typography>
      <Button>
        CONFIRM <ArrowRightAltIcon />
      </Button>
    </RoundedTopContainer>
  );
};

export default SmsVerification;
