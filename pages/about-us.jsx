import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import RoundedTopContainer from "../components/RoundedTopContainer";
import UserStatsCard from "../components/UserStatsCard";

const AboutUs = ({ setHeader }) => {
  useEffect(() => setHeader({ heading: "", hidden: true }), []);

  return (
    <RoundedTopContainer image="/images/book3.jpeg" alt="books" height="600px">
      <UserStatsCard />
      <RoundedTopContainer.Header text="How Does Phoenix Work?" />
      <br />
      <div>
        <Typography variant="body1" component="h3">
          <strong>Benefits</strong>
        </Typography>
        <Typography variant="body1" gutterBottom component="h3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          saepe fuga at omnis! Consequuntur necessitatibus iusto cum non totam
          reiciendis soluta iste dolorem ipsum, animi cumque rem quaerat.
          Consequuntur, excepturi.
        </Typography>
      </div>
      <br />
      <div>
        <Typography variant="body1" component="body1">
          <strong>Why Join Our Platform?</strong>
        </Typography>
        <Typography variant="body1" component="h3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          saepe fuga at omnis! Consequuntur necessitatibus iusto cum non totam
          reiciendis soluta iste dolorem ipsum, animi cumque rem quaerat.
          Consequuntur, excepturi.
        </Typography>
      </div>
    </RoundedTopContainer>
  );
};

export default AboutUs;
