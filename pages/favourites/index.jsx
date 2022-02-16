import { Tab, Tabs } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import styles from "../../styles/Home.module.css";
import { BottomNavigationContext } from "../../Contexts/BottomNavigationContext";
import ArticleCard from "../../components/ArticleCard";
import Timeago from "react-timeago";

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
  const ARTICLES = "ARTICLES";
  const LAWYERS = "LAWYERS";
  const LAWFIRMS = "LAWFIRMS";

  const { setActive } = useContext(BottomNavigationContext);
  const [value, setValue] = useState(0);
  const [favourites, setFavourites] = useState(ARTICLES);

  useEffect(() => {
    setHeader({ header: "FAVOURITES", hidden: false });
    setActive(true);
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const parsedArticleFavourites = articleFavourites.map(favourite => {
    return (
      <ArticleCard
        key={favourite.id}
        articleId={favourite.article_id}
        title={favourite.articles.title}
        body={favourite.articles.body.slice(0, 100) + "..."}
        date={<Timeago date={favourite.articles.date} />}
        image={favourite.articles.image}
      />
    );
  });

  return (
    <div className={styles.container}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <Tab label="Articles" onClick={() => setFavourites(ARTICLES)} />
        <Tab label="Lawyers" onClick={() => setFavourites(LAWYERS)} />
        <Tab
          label="Lawfirms"
          onClick={() => {
            setFavourites(LAWFIRMS);
          }}
        />
      </Tabs>
      {favourites === ARTICLES && parsedArticleFavourites}
    </div>
  );
};

export default Favourites;
