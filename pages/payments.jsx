import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatsCard from "../components/UserStatsCard";
import { useEffect } from "react";

import { Typography } from "@material-ui/core";
import { BsPaypal } from "react-icons/bs";
import Box from "@mui/material/Box";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { FaCcVisa, FaCcAmex, FaBtc } from "react-icons/fa";
import Button from "../components/Button";

import Widebutton from "../components/WideButton";

const Payments = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ heading: "", hidden: true });
    setNavbar({ navbar: "", hidden: false });
  }, []);
  return (
    <RoundedTopContainer image="/images/backgrounds/paint.jpeg" alt="paint" height="600px">
      <UserStatsCard />
      <RoundedTopContainer.Header text="Choose Payment Option" />
      <Widebutton color="black" outLineColor="#00589B" padding=" 1rem 0" outline strong>
        <Typography
          sx={{
            fontWeight: "800px",
          }}
        >
          {" "}
          <BsPaypal size={50} />
        </Typography>
      </Widebutton>
      <Widebutton color="black" outLineColor="#00589B" padding=" 1rem 0" outline strong>
        <Typography sx={{ fontWeight: "800px" }}>
          <FaCcVisa size={50} />
        </Typography>
      </Widebutton>
      <Widebutton color="black" outLineColor="#00589B" padding=" 1rem 0" outline strong>
        <Typography sx={{ fontWeight: "800px" }}>
          <FaCcAmex size={50} />
        </Typography>
      </Widebutton>
      <Widebutton color="black" outLineColor="#00589B" padding=" 1rem 0" outline strong>
        <Typography sx={{ fontWeight: "800px" }}>
          <FaBtc size={50} />
        </Typography>
      </Widebutton>
      {/* <Box
        sx={{
          width: "100%",
          height: "60px",
          border: "2px solid #00589B",
          borderRadius: "5px",
          padding: "1rem 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircleOutlinedIcon sx={{ mr: 2, color: "grey" }} />
        <BsPaypal />
        <FaCcPaypal sx={{ ml: 2 }} />
      </Box> */}
      {/* <Button></Button> */}
      {/* <Widebutton
        color="black"
        outLineColor="#1B4463"
        padding=" 0.3rem 0"
        outline
        strong
        ammount="$550"
      >
        <div>
          <Typography variant="button">
            <strong>ONE TIME SERVICE FEE</strong>
          </Typography>
          <Typography variant="caption">click to see more</Typography>
          <style jsx>{`
            display: flex;
            flex-direction: column;
          `}</style>
        </div>
      </Widebutton> */}
    </RoundedTopContainer>
  );
};

export default Payments;
