import RoundedTopContainer from "../components/RoundedTopContainer";
import Typography from "@mui/material/Typography";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "../components/Button";

const GetStarted = ({ setHeader, setNavbar }) => {
  const router = useRouter();

  // useEffect(() => setHeader({ header: "", hidden: true }), []);
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: true });
  }, []);
  return (
    <RoundedTopContainer image={"/GetStarted-3.png"} alt={"signup-image"} height="350px">
      <Stack spacing={2}>
        <Typography variant="h7" fontWeight sx={{ color: "#1D1F37", fontWeight: "600px" }}>
          THE BEST MOBILE ALL FOR LAWYERS
        </Typography>
        <Typography variant="h4" sx={{ color: "#1D1F37", fontWeight: "800px" }}>
          Find Your Lawyer
        </Typography>
        <Typography paragraph fontWeight>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore beatae accusantium
          minima doloremque
        </Typography>
        <Button onClick={() => router.push("/typeofuser")}>GET STARTED</Button>
        <Typography sx={{ display: "flex", justifyContent: "flex-end" }} variant="h7" fontWeight>
          Have an account?{" "}
          <Typography sx={{ color: "#FF0056" }} fontWeight>
            LOG IN
          </Typography>
        </Typography>
      </Stack>
    </RoundedTopContainer>
  );
};

export default GetStarted;
