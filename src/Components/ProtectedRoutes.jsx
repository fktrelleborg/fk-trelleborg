import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ redirect = "/" }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert("You need to be logged in");
      navigate(redirect);
    }
  }, [currentUser, navigate, redirect]);

  return currentUser ? <Outlet /> : <Navigate to={redirect} />;
};
ProtectedRoutes.propTypes = {
  redirect: PropTypes.string
};

export default ProtectedRoutes;
