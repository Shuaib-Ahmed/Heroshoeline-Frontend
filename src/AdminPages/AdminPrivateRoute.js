import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BaseUrl } from "../Static/Data/data";
import { errorMessage } from "../Static/Function/tostify";
import axios from "axios";

const AdminPrivateRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));

  const [showChild, setSetChild] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const url = `${BaseUrl}/adminRoute`;
    try {
      const { data } = await axios.post(
        url,
        {},
        { headers: { authorization: `Bearer ${authData.token}` } }
      );

      const {
        error,
        message,
        responseData: { isAdmin },
      } = data;

      if (error) {
        errorMessage(message);
        navigate("/login");
      }

      if (!error && !isAdmin) {
        errorMessage("Cannot Access This Route");
        navigate("/");
      }

      if (!error && isAdmin) {
        setSetChild(true);
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong");
      navigate("/login");
    }
  }, []);

  return showChild && children;
};

export default AdminPrivateRoute;
