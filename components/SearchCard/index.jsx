import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SearchCard = ({ name, location, phone, certified }) => {
  return (
    <Card
      sx={{
        mt: "40px",
        p: "0.7rem",
        borderRadius: 1,
        display: "flex",
        boxShadow: 5
      }}
    >
      <Box sx={{ borderRadius: 1 }}>
        <CardMedia
          sx={{
            width: "110px",
            height: "110px",
            objectFit: "cover",
            borderRadius: 1
          }}
          image="/images/user1.jpeg"
          alt="user-icon"
        />
      </Box>
      <Box
        sx={{
          width: 1,
          ml: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly"
        }}
      >
        <Typography variant="body1">
          <strong>John Doe</strong>
        </Typography>
        <br />
        <Box>
          <Typography variant="body2">New York</Typography>
        </Box>
        <Typography variant="body2">(647) 555 5555</Typography>
        <Typography variant="body2" noWrap>
          <LocationOnIcon fontSize="small" />
          <strong>Recognised Since: 2012</strong>
        </Typography>
      </Box>
    </Card>
  );
};

export default SearchCard;
