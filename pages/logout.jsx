import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../hooks/useUser";

const Logout = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  useEffect(() => {
    setTimeout(async() => {
      mutateUser(await fetch("/api/auth/logout", { method: "POST" }), false);
      router.push("/signup")
    }, 2000);
  }, []);
  return (
    <div>
      <Typography>See you next time!</Typography>
    </div>
  );
};

export default Logout;
