import { useEffect, useState } from "react";
import RoundedTopContainer from "/components/RoundedTopContainer";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "../Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Stack from "@mui/material/Stack";
import { inputLabelClasses } from "@mui/material/InputLabel";
import InputError from "../InputError";

const LoginCard = ({ setHeader, errorMessage, handleSubmit }) => {
  const [formInput, setFormInput] = useState({ email: "", password: "" });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => setHeader({ header: "", hidden: true }), []);

  const onEmailChangeHandler = (e) => {
    setFormInput((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const onPasswordChangeHandler = (e) => {
    setFormInput((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  return (
    <RoundedTopContainer image={"/images/backgrounds/newfountainpen.jpg"} alt={"signup-image"} height="350px">
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <InputError message={errorMessage} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formInput);
        }}
      >
        <TextField
          sx={{ mb: 2, "& .MuiInput-underline:after": { borderBottomColor: "#FF0056" } }}
          id="input-with-icon-textfield"
          label="Email Address"
          type="email"
          InputLabelProps={{
            sx: {
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#FF0056",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="standard"
          onChange={onEmailChangeHandler}
        />
        <TextField
          sx={{ mb: 2, "& .MuiInput-underline:after": { borderBottomColor: "#FF0056" } }}
          id="input-with-icon-textfield"
          label="Password"
          type="password"
          InputLabelProps={{
            sx: {
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#FF0056",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
          variant="standard"
          fullWidth
          onChange={onPasswordChangeHandler}
        />
        <Stack sx={{ mb: 2, spacing: 2 }}>
          {/* <Button
            type="submit"
            variant="contained"
            endIcon={<ArrowRightAltIcon />}
          >
            LOG IN
          </Button> */}
          <Button type="submit">
            LOG IN <ArrowRightAltIcon />
          </Button>
          <Link href="/signup">
            {/* <Typography sx={{ display: "flex", justifyContent: "flex-end" }} variant="h7">
              SIGN UP
            </Typography> */}
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                color: "#ff0056",
                mb: 4,
                fontWeight: "500",
              }}
              variant="h7"
            >
              SIGN UP
            </Typography>
          </Link>
        </Stack>
      </form>
    </RoundedTopContainer>
  );
};

export default LoginCard;
