import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const SearchCard = ({ fullName, location, phone, certified, image }) => {
  return (
    <Card
      sx={{
        mt: "0.5rem",
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
          image={image}
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
          <strong>{fullName}</strong>
        </Typography>
        <br />

        <Typography variant="body2">
          <LocationOnIcon fontSize="16px" />
          {location}
        </Typography>

        <Typography variant="body2">
          <PhoneIcon fontSize="16px" />
          {phone}
        </Typography>
        <Typography variant="body2">
          <strong>Recognized Since: {certified}</strong>
        </Typography>
      </Box>
    </Card>
  );
};

export default SearchCard;
