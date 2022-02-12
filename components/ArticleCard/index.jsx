import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function ArticleCard(props) {
  const { id, title, body, date } = props;

  return (
    <Link href={`/articles/${id}`}>
      <a>
        <Card
          sx={{
            maxWidth: 345,
            margin: "2em 0",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            "&:hover": {
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              cursor: "pointer",
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/justice-gd35301419_1920.jpg"
            alt=""
          />
          <CardContent>
            <Typography
              sx={{ fontWeight: "bold" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography
              sx={{ margin: "0.5em 0" }}
              variant="body2"
              color="text.secondary"
            >
              {body}
            </Typography>
            <Typography
              sx={{ marginBottom: "-0.5em" }}
              variant="subtitle2"
              component="div"
            >
              {date} - 5 min read
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
