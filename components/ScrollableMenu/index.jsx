import { Tabs, Tab } from "@mui/material";

const ScrollableMenu = ({ children }) => {
  return (
    <div>
      <Tabs variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
        {children}
      </Tabs>
    </div>
  );
};

export default ScrollableMenu;
