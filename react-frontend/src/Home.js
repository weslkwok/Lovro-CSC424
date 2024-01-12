import axios from "axios";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

export const Home = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const user = { userid: username, password: password };
      const response = await axios.post(
        "http://localhost:8000/account/login",
        user
      );
      value.onLogin();
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <>
      <h2>Home (Public)</h2>
      <label>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </label>
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </label>
      <button type="button" onClick={handleLogin}>
        Sign In
      </button>
    </>
  );
};
