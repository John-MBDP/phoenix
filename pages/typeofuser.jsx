import RoundedTopContainer from "../components/RoundedTopContainer";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "../components/Button";
import { useRouter } from "next/router";
const TypeofUser = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const router = useRouter();
  //uwu
  return (
    <RoundedTopContainer image={"/images/articles/forest.jpeg"} alt={"signup-image"}>
      <Typography
        variant="h6"
        fontWeight
        sx={{ color: "#1D1F37", display: "flex", justifyContent: "center", fontWeight: "800px" }}
      >
        I AM SIGNING UP AS A
      </Typography>

      <Button expanded={true}>Lawyer</Button>
      <Button expanded={true} onClick={() => router.push("/signup")}>
        Client
      </Button>
      <Button expanded={true}>Law Firm</Button>
    </RoundedTopContainer>
  );
};

export default TypeofUser;
