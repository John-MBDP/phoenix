import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./index.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

const Article = ({
  articleId,
  title,
  author,
  body,
  date,
  userId,
  articleFavourite,
}) => {
  const [favourited, setFavourited] = useState(articleFavourite ? true : false);
  const favourite = { client_id: userId, article_id: articleId };

  const saveFavourite = async favourite => {
    const response = await fetch("/api/favourites/articles/create", {
      method: "POST",
      body: JSON.stringify({ ...favourite, date_created: new Date() }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("saved!");
    return await response.json();
  };

  const destroyFavourite = async favourite => {
    const response = await fetch("/api/favourites/articles/delete", {
      method: "POST",
      body: JSON.stringify(favourite),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("destroyed!");
    return await response.json();
  };

  return (
    <Card style={{ padding: "1.5em 1em" }}>
      <CardContent>
        <header className={styles.header}>
          <Typography
            style={{ fontSize: 14, fontWeight: "bold" }}
            color="text.secondary"
            className={styles.popular}
          >
            #{articleId} in Popular
          </Typography>
          {favourited && (
            <div className={styles.favourite}>
              <span style={{ marginRight: 5 }}>Favourited!</span>
              <FavoriteIcon
                style={{ color: "#ff0056" }}
                onClick={async () => {
                  try {
                    await destroyFavourite(favourite);
                    setFavourited(false);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </div>
          )}
          {!favourited && (
            <div className={styles.favourite}>
              <span style={{ marginRight: 5 }}>Favourite Me!</span>
              <FavoriteBorderIcon
                style={{ color: "#ff0056" }}
                onClick={async () => {
                  try {
                    await saveFavourite(favourite);
                    setFavourited(true);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </div>
          )}
        </header>
        <Typography
          style={{ fontWeight: "bold", marginBottom: '1em' }}
          variant="h5"
          component="div"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography style={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {date} - 5 min read
        </Typography>
        <Typography style={{ marginBottom: '2em', fontSize: 14, fontWeight: "bold" }}>
          {author}
        </Typography>
        <Typography variant="body1" style={{ lineHeight: '2rem', marginBottom: '3em' }}>
          {body}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Article;
