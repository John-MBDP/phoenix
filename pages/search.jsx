import ScrollableMenu from "../components/ScrollableMenu";
import { Tab, Box } from "@mui/material";
import { useEffect } from "react";
import SearchCard from "../components/SearchCard";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const lawyers = await prisma.lawyers.findMany();

  return {
    props: {
      lawyers
    }
  };
};

const Search = ({ setHeader, lawyers }) => {
  useEffect(() => setHeader({ header: "LAWYERS", hidden: false }), []);

  return (
    <Box sx={{ px: "2rem" }}>
      <ScrollableMenu>
        <Tab label="Item One" />
        <Tab label="Item One" />
        <Tab label="Item One" />
        <Tab label="Item One" />
        <Tab label="Item One" />
      </ScrollableMenu>
      <SearchCard />
    </Box>
  );
};

export default Search;
