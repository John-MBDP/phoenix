import { Typography } from "@material-ui/core";
import Image from "next/image";
import styles from "./index.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "../Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const RoundedTopContainer = ({ children, image, alt, height, padBottom }) => {
  const router = useRouter();

  return (
    <>
      <Card
        className={styles.image}
        sx={{ boxShadow: "none", borderRadius: "0" }}
      >
        <div style={{ backgroundColor: "black" }}>
          <Image width={500} height={550} src={image} alt={alt} />
        </div>
      </Card>
      <div className={styles.pane}>
        <Stack
          direction="row"
          sx={{ position: "fixed", top: "1rem", left: "1rem", zIndex: "11" }}
        >
          <Button
            back={true}
            hidden={
              router.pathname === "/" ||
              router.pathname === "/getstarted" ||
              router.pathname === "/typeofuser" ||
              router.pathname === "/signup" ||
              router.pathname === "/login" ||
              router.pathname === "/smsverification" ||
              router.pathname === "/confirmation" ||
              router.pathname === "/login" ||
              router.pathname === "/logout"
            }
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Stack>
        <div
          className={styles.card}
          style={{ height: height ? `${height}` : null }}
        >
          <div
            className={styles.scrollSnap}
            style={{ paddingBottom: `${padBottom && "3rem"}` }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

RoundedTopContainer.Header = ({ text }) => {
  return (
    <div style={{ paddingTop: "16px" }}>
      <Typography component="h1" variant="h6">
        {text}
      </Typography>
    </div>
  );
};

export default RoundedTopContainer;
