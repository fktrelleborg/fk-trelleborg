import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logOutUser = async () => {
      await logout();
      navigate("/");
    };
    logOutUser();
  }, [logout, navigate]);

  return (
    <div className="container">
      <p>You are now logged out... </p>
      <a href="/login">Log in again here</a>
    </div>
  );
};

export default LogOutPage;
