import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "../components/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const btnMain = {
  alignItems: "right",
};

const Signup = ({ setHeader }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checked: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => setHeader({ header: "", hidden: true }), []);

  const onEmailChangeHandler = e => {
    setFormInput(prev => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const onPasswordChangeHandler = e => {
    setFormInput(prev => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  const onNameChangeHandler = e => {
    const firstName = e.target.value.split(" ")[0];
    const lastName = e.target.value.split(" ")[1];
    setFormInput(prev => {
      return {
        ...prev,
        firstName,
        lastName,
      };
    });
  };

  const onCheckboxChangeHandler = e => {
    setFormInput(prev => {
      return {
        ...prev,
        checked: e.target.checked,
      };
    });
  };

  const handleSubmit = async inputValues => {
    if (
      !inputValues.firstName ||
      !inputValues.lastName ||
      !inputValues.email ||
      !inputValues.password
    ) {
      setErrorMsg("Please fill out all fields");
      return;
    } else if (!inputValues.checked) {
      setErrorMsg("Please accept Terms and Conditions");
      return;
    }
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(inputValues),
      });
      return router.push("/");
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  };

  return (
    <RoundedTopContainer image={"/images/signup.png"} alt={"signup-image"}>
      <Typography variant="h4" component="h1">
        Signup
      </Typography>
      {errorMsg && <p>{errorMsg}</p>}
      <TextField
        sx={{ mb: 2 }}
        id="input-with-icon-textfield"
        label="Full Name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountBoxIcon sx={{ color: "black" }} />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="standard"
        onChange={onNameChangeHandler}
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
          ),
        }}
        fullWidth
        variant="standard"
        onChange={onEmailChangeHandler}
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
          ),
        }}
        variant="standard"
        fullWidth
        onChange={onPasswordChangeHandler}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Checkbox {...label} onChange={onCheckboxChangeHandler} />
        <Typography
          fontWeight
          sx={{ display: "flex", justifyContent: "flex-end", color: "#ff0056" }}
          variant="h7"
        >
          Terms and Conditions
        </Typography>
      </Stack>
      <Stack sx={{ mb: 2, spacing: 2 }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(formInput);
          }}
        >
          <Button type="submit">
            SIGN UP <ArrowRightAltIcon />
          </Button>
        </form>
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

export default Signup;
