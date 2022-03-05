import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import SearchCard from "../components/SearchCard";
import { prisma } from "../lib/prisma";
import getGeoLocation from "../helpers/getGeoLocation";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

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
    <div style={{ padding: "1rem 2rem", marginTop: "5rem" }}>
      <form onSubmit={(e) => handleSubmit(e, city, fields[selectedField])}>
        <div style={{ display: "flex", position: "relative" }}>
          <input
            placeholder="Location"
            value={city}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <GpsFixedIcon
            onClick={() => getGeoLocation((location) => setCity(location))}
            color="primary"
            sx={{ position: "absolute", top: "12px", right: "12px" }}
          />
          <style jsx>{`
            input {
              font-family: roboto;
              flex-grow: 40;
              height: 3rem;
              padding-left: 1rem;
              font-size: 1em;
              border-radius: 5px;
              border: 1px solid lightgrey;
            }
            input:focus {
              border: 1px solid #5593d1;
              outline: 1px solid #5593d1;
              border-radius: 5px;
            }
          `}</style>
        </div>
      </form>
      <Tabs
        style={{ marginTop: "0.3em", color: 'grey' }}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        aria-label="scrollable auto tabs example"
        value={selectedType}
        onChange={handleSearchTypeChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab label="Lawyers" />
        <Tab label="Lawfirms" />
      </Tabs>
      <Tabs
        style={{ marginTop: "-0.5em", marginBottom: '-0.3em', color: 'grey' }}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        aria-label="scrollable auto tabs example"
        value={selectedField}
        onChange={handleFieldChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        {tabs}
      </Tabs>
      {cardArray}
    </div>
  );
};

export default Search;
