import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./index.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";



const saveFavourite = () => {};

const destroyFavourite = () => {};

const Article = ({ articleId, title, author, body, date, user }) => {
  const [favourited, setFavourited] = useState(false);

  return (
    <Card sx={{ padding: "1em" }}>
      <CardContent>
        <header className={styles.header}>
          <Typography
            sx={{ fontSize: 14, fontWeight: "bold" }}
            color="text.secondary"
            className={styles.popular}
          >
            #{articleId} in Popular
          </Typography>
          {favourited && (
            <FavoriteIcon
              sx={{ color: 'salmon' }}
              onClick={() => {
                setFavourited(false);
              }}
            />
          )}
          {!favourited && (
            <FavoriteBorderIcon
              sx={{ color: 'salmon' }}
              onClick={() => {
                setFavourited(true);
              }}
            />
          )}
        </header>
        <Typography
          sx={{ fontWeight: "bold", color: "salmon", margin: "0.5em 0" }}
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {date} - 5 min read
        </Typography>
        <Typography sx={{ mb: 2, fontSize: 14, fontWeight: "bold" }}>
          {author}
        </Typography>
        <Typography variant="body1">
          {body}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Article;
