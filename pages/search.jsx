import ScrollableMenu from "../components/ScrollableMenu";
import { Tab, Box, TextField } from "@mui/material";
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
  useEffect(() => {
    setHeader({ header: "LAWYERS", hidden: false });
  }, []);

  const getGeoLocation = async () => {
    const success = async (data) => {
      console.log(data);
      const { latitude, longitude } = data.coords;

      const cityData = await fetch(
        `/api/location?latitude=${latitude}&longitude=${longitude}`,
        {
          method: "POST"
        }
      );
      const parsedCitydata = await cityData.json();
      console.log(parsedCitydata.location);
      setCity(parsedCitydata.location);
    };
    const error = (err) => {
      console.log(err.code);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const getLawyers = async (location) => {
    const response = await fetch(`/api/lawyers?location=${location}`);
    const parsedResponse = await response.json();
    setCurrentLaywers(parsedResponse || {});
  };

  const lawyersArray = currentLawyers.map((lawyer) => {
    if (lawyer) {
      return (
        <SearchCard
          key={lawyer.id}
          fullName={`${lawyer.first_name} ${lawyer.last_name}`}
          location={lawyer.location}
          certified={JSON.stringify(lawyer.date_certified)}
          phone={lawyer.phone_number}
          image={lawyer.profile_pic}
          id={lawyer.id}
        />
      );
    }
  });
  const handleSubmit = (e, city) => {
    e.preventDefault();
    getLawyers(city);
    console.log(e);
  };

  return (
    <Box sx={{ px: "2rem", mt: "5rem" }}>
      <br />
      <div>
        <button onClick={() => getGeoLocation()}>Get Location</button>
        <form onSubmit={(e) => handleSubmit(e, city)}>
          <TextField
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            margin="normal"
            autoComplete="off"
          />
          <button type="submit">submit</button>
        </form>
      </div>
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
