import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../LoginSignup/LoginSignup.css"
import "./ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO pass email to "backend"
    // fetch(...)
    // On successful fetch
    setMessage('If the email address is registered you will receive an email containing a reset link. If you do not receive an email, try sending the link again.');
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="container">
      <h2 className="forgot-header">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="forgot-submit-container">
          <button type="button" className="submit gray" onClick={handleBack}>Back</button>
          <button type="submit" className="submit">Send Reset Link</button>
        </div>
      </form>

      <div className="message-container">
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword;