// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "client",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

// export const lawyerSessionOptions = {
//   password: process.env.SECRET_COOKIE_PASSWORD,
//   cookieName: "lawyer",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };

// export const lawfirmSessionOptions = {
//   password: process.env.SECRET_COOKIE_PASSWORD,
//   cookieName: "lawfirm",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };
