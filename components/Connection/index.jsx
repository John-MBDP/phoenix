import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import Link from "next/link";

const Connection = ({ id, route, name, photo, pending, accepted }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (pending) {
      setStatus("Pending");
    } else if (accepted) {
      setStatus("Connected");
    } else {
      setStatus("Blocked");
    }
  }, [status]);

  return (
    <Link href={`/${route}/${id}`}>
      <ListItem
        sx={{ p: 0 }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            style={{ backgroundColor: "white" }}
            src={photo || "/images/huTao.png"}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={status} />
      </ListItem>
    </Link>
  );
};

export default Connection;
