import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const handleLogin = async (token) => {
    document.cookie = `token=${token}`;
    setToken(token);
    navigate("/landing");
  };

  const handleLogout = () => {
    document.cookie = `token=${null}`;
    setToken(null);
  };

  const auth = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
