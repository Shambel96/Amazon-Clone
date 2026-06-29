import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const{ state, dispatch} = useContext(DataContext);
  const {user} = state;
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
};

export default ProtectedRoute;
