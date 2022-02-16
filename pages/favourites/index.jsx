import { Tab, Tabs } from "@material-ui/core";
import { useState, useEffect } from "react";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import styles from "./index.module.scss";

const prisma = new PrismaClient();

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  const articleFavourites = await prisma.article_favourites.findMany({
    where: {
      client_id: {
        equals: user.id,
      },
    },
    include: {
      articles: true,
    },
  });
  const lawyerFavourites = await prisma.lawyer_favourites.findMany({
    where: {
      client_id: {
        equals: user.id,
      },
    },
    include: {
      lawyers: true,
    },
  });
  const lawfirmFavourites = await prisma.lawfirm_favourites.findMany({
    where: {
      client_id: {
        equals: user.id,
      },
    },
    include: {
      lawfirms: true,
    },
  });
  return {
    props: {
      articleFavourites,
      lawyerFavourites,
      lawfirmFavourites,
      user,
    },
  };
}, sessionOptions);

const Favourites = ({
  setHeader,
  articleFavourites,
  lawyerFavourites,
  lawfirmFavourites,
}) => {
  const [value, setValue] = useState(0);
  const [favourites, setFavourites] = useState({
    articles: articleFavourites,
    lawyers: lawyerFavourites,
    lawfirms: lawfirmFavourites,
  });

  useEffect(() => {
    setHeader({ header: "FAVOURITES", hidden: false });
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  console.log(articleFavourites);

  return (
    <div className={styles.favourites}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <Tab label="Articles" onClick={() => setMessageCards(lawyerMessages)} />
        <Tab label="Lawyers" onClick={() => setMessageCards(lawyerMessages)} />
        <Tab
          label="Lawfirms"
          onClick={() => {
            setMessageCards(lawfirmMessages);
          }}
        />
      </Tabs>
    </div>
  );
};

export default Favourites;
