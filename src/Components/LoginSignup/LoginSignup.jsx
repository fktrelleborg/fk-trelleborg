import { useState } from "react";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { SubmitContainer } from "../Styled/SubmitContainer";

import "./LoginSignup.css";

const LoginSignup = () => {
  const SIGN_UP = "Sign up";
  const LOGIN = "Login";
  const [action, setAction] = useState(LOGIN);

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline" />
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <></>
        ) : (
          <div className="input">
            {/* TODO: insert icon? */}
            <div className="img" />
            <input type="text" placeholder="Name" />
          </div>
        )}
        <div className="input">
          {/* TODO: insert icon? */}
          <div className="img" />

          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          {/* TODO: insert icon? */}
          <div className="img" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {action === "Sign up" ? (
        <></>
      ) : (
        <div className="forgot-password">
          Lost your password{" "}
          <Link className="link" to="/forgot-password">
            click here
          </Link>
        </div>
      )}
      <SubmitContainer>
        <Stack spacing={2} direction="row">
          <Button
            type="button"
            variant="contained"
            onClick={() => setAction(SIGN_UP)}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => setAction(LOGIN)}
          >
            Login
          </Button>
        </Stack>
      </SubmitContainer>
    </div>
  );
};

export default LoginSignup;
