import { Tab, Tabs } from "@material-ui/core";
import { useState, useEffect } from "react";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { prisma } from "../../lib/prisma";
import styles from "../../styles/Home.module.css";
import ArticleCard from "../../components/ArticleCard";
import SearchCard from "../../components/SearchCard";
import Timeago from "react-timeago";
import Alert from "../../components/Alert";

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  const articleFavourites = await prisma.article_favourites.findMany({
    where: {
      client_id: {
        equals: user.id
      }
    },
    include: {
      articles: true
    },
    orderBy: [
      {
        date_created: "desc"
      }
    ]
  });
  const lawyerFavourites = await prisma.lawyer_favourites.findMany({
    where: {
      client_id: {
        equals: user.id
      }
    },
    include: {
      lawyers: true
    },
    orderBy: [
      {
        date_created: "desc"
      }
    ]
  });
  const lawfirmFavourites = await prisma.lawfirm_favourites.findMany({
    where: {
      client_id: {
        equals: user.id
      }
    },
    include: {
      lawfirms: true
    },
    orderBy: [
      {
        date_created: "desc"
      }
    ]
  });
  return {
    props: {
      articleFavourites,
      lawyerFavourites,
      lawfirmFavourites,
      user
    }
  };
}, sessionOptions);

const Favourites = ({
  setHeader,
  setNavbar,
  articleFavourites,
  lawyerFavourites,
  lawfirmFavourites
}) => {
  const ARTICLES = "ARTICLES";
  const LAWYERS = "LAWYERS";
  const LAWFIRMS = "LAWFIRMS";

  const [value, setValue] = useState(0);
  const [favourites, setFavourites] = useState(ARTICLES);

  useEffect(() => {
    setHeader({ header: "FAVOURITES", hidden: false });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const parsedArticleFavourites = articleFavourites.map((favourite) => {
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

  const parsedLawyerFavourites = lawyerFavourites.map((favourite) => {
    return (
      <SearchCard
        key={favourite.id}
        fullName={`${favourite.lawyers.first_name} ${favourite.lawyers.last_name}`}
        location={favourite.lawyers.location}
        certified={favourite.lawyers.date_certified.getFullYear()}
        phone={favourite.lawyers.phone_number}
        image={favourite.lawyers.profile_pic}
        id={favourite.lawyers.id}
        type="lawyer"
      />
    );
  });

  const parsedLawfirmFavourites = lawfirmFavourites.map((favourite) => {
    return (
      <SearchCard
        key={favourite.id}
        fullName={favourite.lawfirms.name}
        location={favourite.lawfirms.location}
        certified={favourite.lawfirms.registration_date.getFullYear()}
        phone={favourite.lawfirms.phone_number}
        image={favourite.lawfirms.profile_pic}
        id={favourite.lawfirms.id}
        type="lawfirm"
      />
    );
  });

  return (
    <div className={styles.container}>
      <Tabs
        value={value}
        textColor="secondary"
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
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
      {favourites === ARTICLES && parsedArticleFavourites.length === 0 ? (
        <Alert message="You have not liked any articles yet." />
      ) : null}
      {favourites === LAWYERS && parsedLawyerFavourites}
      {favourites === LAWYERS && parsedLawyerFavourites.length === 0 ? (
        <Alert message="You have not liked any lawyers yet." />
      ) : null}
      {favourites === LAWFIRMS && parsedLawfirmFavourites}
      {favourites === LAWFIRMS && parsedLawfirmFavourites.length === 0 ? (
        <Alert message="You have not liked any lawfirms yet." />
      ) : null}
    </div>
  );
};

export default Favourites;
