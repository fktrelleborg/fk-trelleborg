import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import useAuth from "../hooks/useAuth";
import { SubmitContainer } from "../Components/Styled/SubmitContainer";

import "../css/ForgotPassword.css";
import "../css/LoginSignup.css";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetPasswordSubmit, setResetPasswordSubmit] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const onResetPassword = async (data) => {
    setIsSubmitting(true);

    try {
      await resetPassword(data.email);

      setResetPasswordSubmit(true);
    } catch (err) {
      if (err instanceof FirebaseError) {
        alert(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }

    setIsSubmitting(false);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="forgot-header">Forgot Password</h2>

      {resetPasswordSubmit && <alert>Check your email for a link to reset your password.</alert>}

      <StyledForm onSubmit={handleSubmit(onResetPassword)}>
        <div className="inputs">
          <div className="input">
            <input
              className="forgot-input"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required." })}
            />
          </div>
          {errors.email && <p>{errors.email.message || "Try again"}</p>}
        </div>
        <SubmitContainer>
          <Stack spacing={2} direction="row">
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </Stack>
        </SubmitContainer>
      </StyledForm>
    </div>
  );
};

export default ForgotPasswordPage;
