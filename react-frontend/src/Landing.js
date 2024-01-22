import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  const { auth } = useAuth();

  useEffect(() => {
    async function handleLogin() {
      const cookie = document.cookie.split("=")[1];
      console.log(cookie);

      if (cookie) {
        try {
          const response = await axios.get("http://localhost:8000/users", {
            headers: { authorization: `Bearer ${cookie}` },
          });
          if (response.status === 200) console.log(response);

          return response;
        } catch (error) {
          if (error.response.status === 401) alert("Unauthorized access");
          return false;
        }
      }
    }
    handleLogin();
  });

  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {auth.token}</div>
    </>
  );
};
