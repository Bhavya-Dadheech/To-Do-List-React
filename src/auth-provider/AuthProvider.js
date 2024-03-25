import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      setUser(userDetails.username); // Set user state to the stored username
    }
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", data);
      if (response.data) {
        let userDetails = {
          username: response.data.username,
          user_id: response.data.user_id
        };
        setUser(response.data.username);
        setToken(response.data.jwtToken);
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("exp_date", response.data.exp_date);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/dashboard");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
