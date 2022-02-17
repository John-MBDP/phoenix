import { Box } from "@material-ui/core";
import { Drawer } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const NavDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = open => e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setOpen(open);
  };

  return (
    <Drawer
      anchor="top"
      variant="temporary"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      onClick={toggleDrawer(true)}
    >
      <Box
        sx={{
          p: 2,
          height: 1,
          backgroundColor: "#dbc8ff",
        }}
      >
        <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
