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
  useEffect(() => {
    setHeader({ header: "LAWYERS", hidden: false });
  }, []);

  const lawyersArray = lawyers.map((lawyer) => {
    return (
      <SearchCard
        key={lawyer.id}
        fullName={`${lawyer.first_name} ${lawyer.last_name}`}
        location={lawyer.location}
        certified={lawyer.date_certified.getFullYear()}
        phone={lawyer.phone_number}
        image={lawyer.profile_pic}
        id={lawyer.id}
      />
    );
  });

  return (
    <Box sx={{ px: "2rem", mt: "5rem" }}>
      <ScrollableMenu>
        <Tab label="Injury" />
        <Tab label="Immigration" />
        <Tab label="Criminal" />
        <Tab label="Legal Aid" />
        <Tab label="NTF's" />
      </ScrollableMenu>
      {lawyersArray}
    </Box>
  );
};

export default Search;
