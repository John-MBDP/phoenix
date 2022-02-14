import ScrollableMenu from "../components/ScrollableMenu";
import { Tab } from "@mui/material";
import { useEffect } from "react";

const Search = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "LAWYERS", hidden: false }));
  return (
    <ScrollableMenu>
      <Tab label="Item One" />
      <Tab label="Item One" />
      <Tab label="Item One" />
      <Tab label="Item One" />
      <Tab label="Item One" />
    </ScrollableMenu>
  );
};

export default Search;
