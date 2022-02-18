import sessionOptions from "../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

const userRoute = async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
