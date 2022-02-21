import Connection from "../components/Connection";
import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, List } from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";
import { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";

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

const Connections = ({
  setHeader,
  setNavbar,
  lawfirmConnections,
  lawyerConnections,
  lawyers,
  lawfirms,
}) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const parsedlawyerConnections = lawyerConnections.map(connection => {
    if (connection) {
      const name = `${connection.lawyers.first_name} ${connection.lawyers.last_name}`;
      const photo = connection.lawyers.profile_pic;
      return (
        <Connection
          key={connection.lawyer_id}
          id={connection.lawyer_id}
          route="lawyer"
          name={name}
          photo={photo}
          pending={connection.pending}
          accepted={connection.pending}
        />
      );
    }
  });

  const parsedLawfirmConnections = lawfirmConnections.map(connection => {
    if (connection) {
      return (
        <Connection
          key={connection.lawfirm_id}
          id={connection.lawfirm_id}
          route="lawfirm"
          name={connection.lawfirms.name}
          photo={connection.lawfirms.profile_pic}
          pending={connection.pending}
          accepted={connection.pending}
        />
      );
    }
  });

  const allConnections = parsedlawyerConnections.concat(parsedLawfirmConnections);

  return (
    <RoundedTopContainer image="/images/waves.jpeg" alt="waves" height="600px">
      <UserStatCard />
      <RoundedTopContainer.Header text="Connections" />
      <List component="nav">{allConnections} {allConnections.length === 0 && 'You have no connections yet!'}</List>
    </RoundedTopContainer>
  );
};

export default Connections;
