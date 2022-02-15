import ArticleCard from "../../components/ArticleCard";
import Timeago from "react-timeago";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const articles = await prisma.articles.findMany({
    orderBy: [
      {
        date: "desc"
      }
    ]
  });
  return {
    props: {
      initialArticles: articles
    }
  };
};

const ArticleCardList = ({ initialArticles }) => {
  const parsedArticleCards = initialArticles.map((article) => {
    return (
      <ArticleCard
        key={article.id}
        id={article.id}
        title={article.title}
        body={article.body.slice(0, 100) + "..."}
        date={<Timeago date={article.date} />}
      />
    );
  });

  return <div>{parsedArticleCards}</div>;
};

export default ArticleCardList;
