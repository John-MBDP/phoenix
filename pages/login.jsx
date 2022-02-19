import { useState, useEffect } from "react";
import LoginCard from "../components/LoginCard";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "../lib/fetchJson";

const Login = ({ setHeader, setNavbar }) => {
  useEffect(() => {
    setHeader({ header: "", hidden: true });
    setNavbar({ navbar: "", hidden: true });
  }, []);
  const router = useRouter();

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (inputValues) => {
    if (!inputValues.email || !inputValues.password) {
      setErrorMsg("Please provide your email and password");
      return;
    }
    try {
      mutateUser(
        await fetchJson("api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputValues),
        })
      );
      return router.push("/");
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return <LoginCard setHeader={setHeader} errorMessage={errorMsg} handleSubmit={handleSubmit} />;
};

export default Login;
