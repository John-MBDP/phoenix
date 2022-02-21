import { Typography } from "@mui/material";

const Alert = ({ message }) => {
  return (
    <Typography
      style={{
        marginTop: "1em",
        padding: "1.5em 2em",
        backgroundColor: "grey",
        color: "white",
        borderRadius: "2em"
      }}
    >
      {message}
    </Typography>
  );
};

export default Alert;
