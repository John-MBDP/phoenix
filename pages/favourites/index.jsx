import { Tab, Tabs } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import styles from "../../styles/Home.module.css";
import ArticleCard from "../../components/ArticleCard";
import SearchCard from "../../components/SearchCard";
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
    orderBy: [
      {
        date_created: "desc",
      },
    ],
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
    orderBy: [
      {
        date_created: "desc",
      },
    ],
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
    orderBy: [
      {
        date_created: "desc",
      },
    ],
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

  const [value, setValue] = useState(0);
  const [favourites, setFavourites] = useState(ARTICLES);

  useEffect(() => {
    setHeader({ header: "FAVOURITES", hidden: false });
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

  const parsedLawyerFavourites = lawyerFavourites.map(favourite => {
    return (
      <SearchCard
        key={favourite.id}
        fullName={`${favourite.lawyers.first_name} ${favourite.lawyers.last_name}`}
        location={favourite.lawyers.location}
        certified={favourite.lawyers.date_certified.getFullYear()}
        phone={favourite.lawyers.phone_number}
        image={favourite.lawyers.profile_pic}
        id={favourite.lawyers.id}
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
      {favourites === LAWYERS && parsedLawyerFavourites}
    </div>
  );
};

export default Favourites;
