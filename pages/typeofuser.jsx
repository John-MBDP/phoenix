import RoundedTopContainer from "../components/RoundedTopContainer";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const typeofuser = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  //uwu
  return (
    <RoundedTopContainer image={"/images/signup.png"} alt={"signup-image"} height="400px">
      <Typography
        variant="h6"
        fontWeight
        sx={{ color: "#1D1F37", display: "flex", justifyContent: "center" }}
      >
        I AM SIGNING UP AS A
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" sx={{ padding: "20px" }}>
          Contained
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="contained">Contained</Button>
      </Stack>
    </RoundedTopContainer>
  );
};

export default typeofuser;
