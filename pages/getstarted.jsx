import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const getstarted = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer image={"/images/signup.png"} alt={"signup-image"} height="400px">
      <Stack spacing={2}>
        <Typography variant="h7" fontWeight sx={{ color: "#1D1F37" }}>
          THE BEST MOBILE ALL FOR LAWYERS
        </Typography>
        <Typography variant="h4" fontWeight sx={{ color: "#1D1F37" }}>
          Find Your Lawyer
        </Typography>
        <Typography paragraph fontWeight>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore beatae accusantium
          minima doloremque
        </Typography>
      </Stack>
      <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
        GET STARTED
      </Button>
      <Typography sx={{ display: "flex", justifyContent: "flex-end" }} variant="h7" fontWeight>
        Have an account?{" "}
        <Typography sx={{ color: "#FF0056" }} fontWeight>
          LOG IN
        </Typography>
      </Typography>
    </RoundedTopContainer>
  );
};

export default getstarted;
