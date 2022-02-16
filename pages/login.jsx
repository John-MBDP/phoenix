import { useState } from "react";
import LoginCard from "../components/LoginCard";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

const Login = ({ setHeader }) => {
  const router = useRouter();

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async inputValues => {
    if (!inputValues.email || !inputValues.password) {
      setErrorMsg("Please provide your email and password");
      return;
    }
    try {
      mutateUser(
        await fetch("api/auth/login", {
          method: "POST",
          body: JSON.stringify(inputValues),
        })
      );
      router.push("/");
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  };

  return (
    <LoginCard
      setHeader={setHeader}
      errorMessage={errorMsg}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
