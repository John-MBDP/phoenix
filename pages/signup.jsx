import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "../components/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import fetchJson, { FetchError } from "../lib/fetchJson";
import useUser from "../hooks/useUser";
import Link from "next/link";
import { inputLabelClasses } from "@mui/material/InputLabel";
import InputError from "../components/InputError";

const btnMain = {
  alignItems: "right",
};

const Signup = ({ setHeader, setNavbar }) => {
  // const classes = useStyles();
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { mutateUser } = useUser({
    redirectTo: "/smsverification",
    redirectIfFound: true,
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: true });
  }, []);

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

  const onNameChangeHandler = (e) => {
    const firstName = e.target.value.split(" ")[0];
    const lastName = e.target.value.split(" ")[1];
    setFormInput((prev) => {
      return {
        ...prev,
        firstName,
        lastName,
      };
    });
  };

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

  const handleSubmit = async (inputValues) => {
    if (
      !inputValues.firstName ||
      !inputValues.lastName ||
      !inputValues.email ||
      !inputValues.password
    ) {
      setErrorMsg("Please fill out all fields");
      return;
    } else if (!checked) {
      setErrorMsg("Please accept Terms and Conditions");
      return;
    }
    try {
      await fetchJson("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues),
      });
      router.push('/');
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return (
    <RoundedTopContainer image={"/SignUp.png"} alt={"signup-image"} height={"430px"}>
      <Typography variant="h4" component="h1">
        Signup
      </Typography>
      <InputError message={errorMsg} />
      <TextField
        sx={{ mb: 2, "& .MuiInput-underline:after": { borderBottomColor: "#FF0056" } }}
        id="input-with-icon-textfield"
        label="Full Name"
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
              <AccountBoxIcon style={{ color: "black" }} />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="standard"
        onChange={onNameChangeHandler}
      />
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
            <MailIcon position="end">
              <AccountBoxIcon style={{ color: "black" }} />
            </MailIcon>
          ),
        }}
        fullWidth
        variant="standard"
        onChange={onEmailChangeHandler}
      />
      <TextField
        sx={{
          mb: 2,
          "& .MuiInput-underline:after": { borderBottomColor: "#FF0056" },
        }}
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
            <LockIcon position="end">
              <AccountBoxIcon style={{ color: "black" }} />
            </LockIcon>
          ),
        }}
        fullWidth
        variant="standard"
        onChange={onPasswordChangeHandler}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Checkbox
          {...label}
          onChange={(e) => setChecked(e.target.checked)}
          sx={{
            [`&, &.${checkboxClasses.checked}`]: {
              color: "#ff0056",
            },
          }}
        />
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formInput);
          }}
        >
          <Button type="submit">
            SIGN UP <ArrowRightAltIcon />
          </Button>
        </form>
        <Link href="/login">
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
        </Link>
        {/* 
        <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
          LOG IN
        </Button> */}
      </Stack>
    </RoundedTopContainer>
  );
};

export default Signup;
