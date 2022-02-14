import Notification from "../components/Notification";
import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, List } from "@mui/material";

import { useEffect } from "react";

const Notifications = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  return (
    <RoundedTopContainer image="/images/waves.jpeg" alt="waves" height="600px">
      <UserStatCard />
      <div style={{ paddingTop: "1rem" }}>
        <Typography
          component="h1"
          variant="h6"
          style={{ marginLeft: "1.5rem" }}
        ></Typography>
      </div>
      <List component="nav">
        <Notification />
      </List>
    </RoundedTopContainer>
  );
};

export default Notifications;
