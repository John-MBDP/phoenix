import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import RoundedTopContainer from "../components/RoundedTopContainer";

const Logout = ({ setHeader }) => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setTimeout(async () => {
      mutateUser(await fetch("/api/auth/logout", { method: "POST" }), false);
      router.push("/signup");
    }, 2000);
  }, []);
  return (
    <RoundedTopContainer image={"/Logout-2.png"} alt={"signup-image"} height={"300px"}>
      <Typography
        sx={{
          fontWeight: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        See you next time!
      </Typography>
    </RoundedTopContainer>
  );
};

export default Logout;
