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
  const [city, setCity] = useState("");
  useEffect(() => {
    setHeader({ header: "LAWYERS", hidden: false });
  }, []);

  const getGeoLocation = async () => {
    const success = async (data) => {
      console.log(data);
      const { latitude, longitude } = data.coords;

      const cityData = await fetch("/api/location", {
        method: "POST",
        body: JSON.stringify({ latitude: latitude, longitude: longitude })
      });
      const parsedCitydata = await cityData.json();
      console.log(parsedCitydata.location);
      setCity(parsedCitydata.location);
    };
    const error = (err) => {
      console.log(err.code);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

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
      <br />
      <div>
        <button onClick={() => getGeoLocation()}>Get Location</button>
        <form>
          <TextField
            fullWidth
            name="firstName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            margin="normal"
          />
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
