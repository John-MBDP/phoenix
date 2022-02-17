import Notification from "../components/Notification";
import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, List } from "@mui/material";

import { useEffect } from "react";

const Notifications = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  return (
    <RoundedTopContainer image="/images/waves.jpeg" alt="waves" height="600px">
      <UserStatCard />
      <RoundedTopContainer.Header text="Notifications" />
      <List component="nav">
        <Notification />
      </List>
    </RoundedTopContainer>
  );
};

export default Notifications;
