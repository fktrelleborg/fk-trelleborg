import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import "../css/LoginSignup.css";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    setIsLoggingIn(true);

    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch (err) {
      console.log(err)
      if (err instanceof FirebaseError) {
        alert(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An error occurred while logging in!");
      }
    }

    setIsLoggingIn(false);
  };
  // Ta in användare ifall den redan är inloggad.
  // useEffect(() => {
  //   if(currentUser)
  // }
  // , []);

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline" />
      </div>
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="inputs">
          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input type="email" placeholder="Email" {...register("email", { required: "Email is required!" })} />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          <div className="input">
            {/* <img className="icon" src={keyIcon} alt="key-icon" /> */}
            <div className="img" />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && <span className="text-danger">{errors.password.message || "Invalid password"}</span>}
          </div>
          <div className="submit-container">
          <Button type="submit" variant="contained" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </div>
        </div>
      </form>
      <div className="forgot-password">
        Lost your password?{" "}
        <Link className="link" to="/forgot-password">
          Click here
        </Link>
      </div>

      <div className="forgot-password">
        <Link className="link" to="/signup">
          Or press here to sign up!{" "}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
