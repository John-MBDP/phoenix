import Connection from "../components/Connection";
import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, List } from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";
import { useEffect } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.user;

    const lawyerConnections = await prisma.lawyer_connections.findMany({
      where: {
        client_id: user.id,
      },
      include: {
        lawyers: true,
      },
      orderBy: [
        {
          date_changed: "desc",
        },
      ],
    });

    const lawfirmConnections = await prisma.lawfirm_connections.findMany({
      where: {
        client_id: user.id,
      },
      include: {
        lawfirms: true,
      },
      orderBy: [
        {
          date_changed: "desc",
        },
      ],
    });

    return {
      props: {
        user,
        lawfirmConnections,
        lawyerConnections,
      },
    };
  },
  sessionOptions
);

const Connections = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  return (
    <RoundedTopContainer image="/images/waves.jpeg" alt="waves" height="600px">
      <UserStatCard />
      <RoundedTopContainer.Header text="Connections" />
      <List component="nav">
        <Connection />
      </List>
    </RoundedTopContainer>
  );
};

export default Connections;
