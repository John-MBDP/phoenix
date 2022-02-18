import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "../components/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";

const Confirmation = ({ setHeader, setNavbar }) => {
  const router = useRouter();
  useEffect(() => {
    setHeader({ header: "", hidden: true }), setNavbar({ navbar: "", hidden: true });
  }, []);
  return (
    <RoundedTopContainer image={"/sms-2.png"} alt={"signup-image"} height="350px">
      <Typography variant="h5" sx={{ fontWeight: "800px", mb: 2, color: "#1D1F37" }}>
        Confirmation
      </Typography>
      <Stack spacing={1}>
        <Typography paragraph sx={{ color: "#1D1F37", fontWeight: "800px" }}>
          Please Type the verification code sent to +0123456789
        </Typography>
        <Box
          sx={{
            width: "100",
            height: "70px",
            backgroundColor: "#1D1F37",
            borderRadius: "5px",
            boxShadow: 5,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField value="0" />
          </Card>
          <Card
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField value="9" />
          </Card>
          <Card
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField value="2" />
          </Card>
          <Card
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField value="6" />
          </Card>
        </Box>
        <Typography paragraph fontWeight sx={{ color: "#FF0056" }}>
          Resend code.
        </Typography>
      </Stack>
      <Button onClick={() => router.push("/")}>Confirm</Button>
    </RoundedTopContainer>
  );
};

export default Confirmation;
