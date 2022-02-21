import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatCard from "../components/UserStatsCard";
import { Typography, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { prisma } from "../lib/prisma";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  const client = await prisma.clients.findUnique({
    where: { id: user.id }
  });
  return {
    props: {
      client
    }
  };
}, sessionOptions);

const PersonalInfo = ({ setHeader, setNavbar, client }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  const [formInput, setFormInput] = useState({
    id: client.id,
    firstName: client.first_name || "",
    lastName: client.last_name || "",
    address: client.address || "",
    phoneNumber: client.phone_number || "",
    emailAddress: client.email || ""
  });
  const [updated, setUpdated] = useState(false);

  const updateClient = async (clientInfo) => {
    const client = {
      id: clientInfo.id,
      first_name: clientInfo.firstName,
      last_name: clientInfo.lastName,
      email: clientInfo.emailAddress,
      phone_number: clientInfo.phoneNumber,
      address: clientInfo.address
    };
    const response = await fetch("/api/clients/update", {
      method: "POST",
      body: JSON.stringify(client)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const handleInput = (e) => {
    setFormInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (formInput) => {
    try {
      const updatedClient = await updateClient(formInput);
      setFormInput({ ...formInput, updatedClient });
      console.log("client info updated!");
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RoundedTopContainer
      image={"/images/backgrounds/forest.jpeg"}
      alt={"forest"}
      height="600px"
    >
      <UserStatCard />
      <RoundedTopContainer.Header text="Personal Information" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!updated) {
            handleSubmit(formInput);
          }
        }}
      >
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
          name="emailAddress"
          value={formInput.emailAddress}
          onChange={(e) => handleInput(e)}
          margin="normal"
          type="email"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formInput.phoneNumber}
          onChange={(e) => handleInput(e)}
          margin="normal"
          type="tel"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formInput.address}
          onChange={(e) => handleInput(e)}
          margin="normal"
        />
        <Button type="submit" background={(updated && "grey") || null}>
          {(updated && "Updated!") || "Update"}
        </Button>
      </form>
    </RoundedTopContainer>
  );
};

export default PersonalInfo;
