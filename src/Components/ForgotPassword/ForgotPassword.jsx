import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { SubmitContainer } from "../Styled/SubmitContainer";

import "../LoginSignup/LoginSignup.css";
import "./ForgotPassword.css";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO pass email to "backend"
    // fetch(...)
    // On successful fetch
    setMessage(
      "If the email address is registered you will receive an email containing a reset link. If you do not receive an email, try sending the link again."
    );
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="forgot-header">Forgot Password</h2>
      <StyledForm onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input
              className="forgot-input"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <SubmitContainer>
          <Stack spacing={2} direction="row">
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained">Send Reset Link</Button>
          </Stack>
        </SubmitContainer>
      </StyledForm>

      <div className="message-container">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default ForgotPassword;
