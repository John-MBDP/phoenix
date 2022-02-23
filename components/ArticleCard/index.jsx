import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ArticleCard(props) {
  const { articleId, title, body, date, image } = props;

  return (
    <Link
      href={`/articles/${articleId}`}
      style={{ textDecoration: "none" }}
      passHref
    >
      <Card
        sx={{
          maxWidth: 345,
          margin: "1em auto 2em auto",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            cursor: "pointer"
          }
        }}
      >
        <CardMedia component="img" height="140" image={image} alt={image} />
        <CardContent>
          <Typography
            style={{ fontWeight: "bold" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            style={{ margin: "0.5em 0" }}
            variant="body2"
            color="text.secondary"
          >
            {body}
          </Typography>
          <Typography
            style={{ marginBottom: "-0.5em" }}
            variant="subtitle2"
            component="div"
          >
            {date} - 5 min read
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
