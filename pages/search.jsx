import ScrollableMenu from "../components/ScrollableMenu";
import { Tabs, Tab, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [currentLawyers, setCurrentLaywers] = useState(lawyers);
  const [city, setCity] = useState("");
  const [selectedField, setSelectedField] = useState(0);
  const fields = [
    "All",
    "Injury",
    "Immigration",
    "Criminal",
    "Legal Assistance",
    "NFT's"
  ];

  useEffect(() => {
    setHeader({ header: "LAWYERS", hidden: false });
  }, []);

  useEffect(() => {
    getLawyers(city, fields[selectedField]);
  }, [city]);

  const handleChange = async (e, index) => {
    setSelectedField(index);
    getLawyers(city, fields[index]);
  };
  const handleSubmit = (e, city, field) => {
    e.preventDefault();
    getLawyers(city, field);
  };
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getGeoLocation = async () => {
    const success = async (data) => {
      const { latitude, longitude } = data.coords;

      const cityData = await fetch(
        `/api/location?latitude=${latitude}&longitude=${longitude}`,
        {
          method: "POST"
        }
      );
      const parsedCitydata = await cityData.json();

      setCity(parsedCitydata.location);
    };
    const error = (err) => {
      console.log(err.code);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const getLawyers = async (location, field) => {
    const response = await fetch(
      `/api/lawyers?location=${location ? location : "null"}&field=${
        field === "All" ? "null" : field
      }`
    );

    const parsedResponse = await response.json();
    setCurrentLaywers(parsedResponse);
  };

  const tabs = fields.map((tab, i) => {
    return <Tab key={i} label={tab} />;
  });

  const lawyersArray = currentLawyers.map((lawyer) => {
    if (lawyer) {
      return (
        <SearchCard
          key={lawyer.id}
          fullName={`${lawyer.first_name} ${lawyer.last_name}`}
          location={lawyer.location}
          certified={new Date(lawyer.date_certified).getFullYear()}
          phone={lawyer.phone_number}
          image={lawyer.profile_pic}
          id={lawyer.id}
        />
      );
    }
  });

  return (
    <Box sx={{ px: "2rem", mt: "5rem" }}>
      <br />
      <div>
        <button onClick={() => getGeoLocation()}>Get Location</button>
        <form onSubmit={(e) => handleSubmit(e, city, fields[selectedField])}>
          <TextField
            fullWidth
            value={city}
            onChange={handleInputChange}
            margin="normal"
            autoComplete="off"
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={selectedField}
        onChange={handleChange}
        onKeyUp={handleChange}
      >
        {tabs}
      </Tabs>
      {lawyersArray}
    </Box>
  );
};

export default Search;
