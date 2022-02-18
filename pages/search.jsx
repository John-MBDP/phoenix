import ScrollableMenu from "../components/ScrollableMenu";
import { Tabs, Tab, Box, OutlinedInput, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import SearchCard from "../components/SearchCard";
import { PrismaClient } from "@prisma/client";
import getGeoLocation from "../helpers/getGeoLocation";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { InputAdornment, InputLabel } from "@material-ui/core";
const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const lawyers = await prisma.lawyers.findMany();

  return {
    props: {
      lawyers
    }
  };
};

const Search = ({ setHeader, lawyers, setNavbar }) => {
  const [currentData, setCurrentData] = useState(lawyers);
  const [selectedField, setSelectedField] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [city, setCity] = useState("");

  const fields = [
    "All",
    "Injury",
    "Immigration",
    "Criminal",
    "Legal Assistance",
    "NFT's"
  ];
  const searchTypes = ["lawyers", "lawfirms"];

  useEffect(() => {
    setHeader({ header: "LAWYERS", hidden: false });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  useEffect(() => {
    getData(city, fields[selectedField], searchTypes[selectedType]);
  }, [city]);

  const handleFieldChange = async (e, index) => {
    setSelectedField(index);
    getData(city, fields[index], searchTypes[selectedType]);
  };
  const handleSearchTypeChange = (e, index) => {
    setSelectedType(index);
    getData(city, fields[selectedField], searchTypes[index]);
  };
  const handleSubmit = (e, city, field) => {
    e.preventDefault();
    getData(city, field, searchTypes[selectedType]);
  };
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getData = async (location, field, type) => {
    const response = await fetch(
      `/api/${type}?location=${location ? location : "null"}&field=${
        field === "All" ? "null" : field
      }`
    );

    const parsedResponse = await response.json();
    setCurrentData(parsedResponse);
  };

  const tabs = fields.map((tab, i) => {
    return <Tab key={i} label={tab} wrapped />;
  });

  const cardArray = currentData.map((card) => {
    if (card) {
      return (
        <SearchCard
          key={card.id}
          fullName={
            card.first_name ? `${card.first_name} ${card.last_name}` : card.name
          }
          name={card.name}
          location={card.location}
          certified={
            new Date(
              card.date_certified || card.registration_date
            ).getFullYear() || null
          }
          phone={card.phone_number}
          image={card.profile_pic}
          id={card.id}
          type={searchTypes[selectedType].slice(0, -1)}
        />
      );
    }
  });

  return (
    <Box sx={{ px: "2rem", mt: "5rem" }}>
      <br />
      <form onSubmit={(e) => handleSubmit(e, city, fields[selectedField])}>
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Location"
            id="location"
            value={city}
            onChange={handleInputChange}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <GpsFixedIcon
                  onClick={() =>
                    getGeoLocation((location) => setCity(location))
                  }
                  color="primary"
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={selectedType}
        onChange={handleSearchTypeChange}
      >
        <Tab label="Lawyers" />
        <Tab label="Lawfirms" />
      </Tabs>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={selectedField}
        onChange={handleFieldChange}
      >
        {tabs}
      </Tabs>
      {cardArray}
    </Box>
  );
};

export default Search;
