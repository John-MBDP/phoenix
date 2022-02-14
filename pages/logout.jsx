import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/signup"), 2000);
  }, []);
  return (
    <div>
      <Typography>See you next time!</Typography>
    </div>
  );
};

export default Logout;
