import { PrismaClient } from "@prisma/client";
import Timeago from "react-timeago";
import Article from "../../components/Article";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import styles from "./index";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";

const prisma = new PrismaClient();

export const getServerSideProps = withIronSessionSsr(async ({ req, res, params }) => {
  const user = req.session.user;
  const id = Number(params.id);
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
  });
  return {
    props: {
      user,
      article,
    },
  };
}, sessionOptions);

const ArticleShow = ({ article, user }) => {
  return (
    <>
      <Card className={styles.image}>
        <CardMedia
          component="img"
          height="390"
          image={article.image}
          alt={article.image}
        />
      </Card>
      <section className="article-container">
        <style jsx>{`
          .article-container {
            height: 500px;
            overflow: scroll;
            position: fixed;
            bottom: 0;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
          }
        `}</style>
        <Article
          userId={user.id}
          articleId={article.id}
          title={article.title}
          author={article.author}
          body={article.body}
          date={<Timeago date={article.date} />}
        />
      </section>
    </>
  );
};

export default ArticleShow;
