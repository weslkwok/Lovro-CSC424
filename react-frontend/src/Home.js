import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

export const Home = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "bj" && password === "pass424") {
      value.onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

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
