import { FirebaseError } from "firebase/app";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { sigupUserCol } from "../services/firebase/firebase";

import "../css/LoginSignup.css";

const SignupPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const handleSignup = async (data) => {
    setIsSigningUp(true);
    try {
      const newUser = await signup(data.email, data.password);
      const docRef = doc(sigupUserCol);
      await setDoc(docRef, {
        name: data.name,
        email: data.email,
        uid: newUser.user.uid,
        _id: docRef.id,
      });
      alert("Account created! 🥳");
      navigate("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        alert(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("ERROR! We don't know what we did.... 🐵");
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline" />
      </div>
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="inputs">
          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input type="text" placeholder="Name" {...register("name", { required: "Name is required!" })} />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>

          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input type="email" placeholder="Email" {...register("email", { required: "Email is required!" })} />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                minLength: { value: 6, message: "Password must be at least 6 characters long" },
              })}
            />
            {errors.password && <span className="text-danger">{errors.password.message || "Invalid password"}</span>}
          </div>

          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input
              type="password"
              placeholder="Password"
              {...register("confirmPassword", {
                required: "Confirm the password",
                minLength: { value: 6, message: "Confirm the password" },
                validate: (value) => {
                  return value === passwordRef.current || "🛑 Password don't match! 🛑";
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message || "Not a valid password"}</p>
            )}{" "}
          </div>
        </div>

        <div className="submit-container">
          <Button type="submit" variant="contained" disabled={isSigningUp}>
            {isSigningUp ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </form>
      <div className="forgot-password">
        Already have an account?{" "}
        <Link className="link" to="/">
          Click here
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
