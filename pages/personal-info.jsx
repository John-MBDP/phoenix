import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Button from "../components/Button";

const PersonalInfo = ({ setHeader }) => {
  useEffect(() => setHeader({ header: "", hidden: true }), []);
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    emailAdress: ""
  });

  const handleInput = (e) => {
    setFormInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <RoundedTopContainer
      image={"/images/articles/forest.jpeg"}
      alt={"forest"}
      height="600px"
    >
      <UserStatCard />
      <RoundedTopContainer.Header text="Personal Information" />

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          id="first-name"
          name="firstName"
          value={formInput.firstName}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formInput.lastName}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email Address"
          name="emailAdress"
          value={formInput.emailAdress}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formInput.phoneNumber}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formInput.address}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <Button type="submit" onClick={() => console.log("update")}>
          Update
        </Button>
      </form>
    </RoundedTopContainer>
  );
};

export default PersonalInfo;
