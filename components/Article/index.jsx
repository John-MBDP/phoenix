import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Article = ({ id, title, author, body, date }) => {
  return (
    <Card sx={{ padding: "1em" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold", textAlign: "right" }}
          color="text.secondary"
          gutterBottom
        >
          #{id} in Popular
        </Typography>
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
