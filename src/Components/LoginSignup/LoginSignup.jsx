import { useState } from "react";
import { Link } from 'react-router-dom'
import "./LoginSignup.css";

const LoginSignup = () => {
  //shallow login component with some basic toggling and temp styling
  // TODO: Clean it up a bit, check with UX, start adding login/registry logic with BE etc...

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
          Lost your password <Link className="link" to="/forgot-password">click here</Link>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === LOGIN ? "submit gray" : "submit"}
          onClick={() => setAction(SIGN_UP)}
        >
          Sign Up
        </div>
        <div
          className={action === SIGN_UP ? "submit gray" : "submit"}
          onClick={() => setAction(LOGIN)}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
