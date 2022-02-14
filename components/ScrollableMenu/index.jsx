import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

const ScrollableMenu = ({ children }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={value}
        onChange={handleChange}
      >
        {children}
      </Tabs>
    </div>
  );
};

export default ScrollableMenu;
