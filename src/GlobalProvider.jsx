import { useEffect } from "react";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
// import { BASE_URL } from "./constants"; // Import your constants from a separate file

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const BASE_URL = "http://localhost:3000";

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", role: "" });
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onRefresh = async () => {
      setLoading(true);
      const userData = await loadUserAfterRefresh();
      setLoading(false);
      if (!userData) {
        setIsLogged(false);
      }
    };
    onRefresh();
  }, []);

  const loadUserAfterRefresh = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        const userData = await getLoggedUser(storedToken);
        if (userData) {
          setIsLogged(true);
          setUser(userData);
          setToken(storedToken);
          return userData;
        }
        return null;
      } else {
        console.log("Invalid token");
        return null;
      }
    } catch (err) {
      console.log("Failed to load user: ", err.message);
      return null;
    }
  };

  const getLoggedUser = async (accessToken) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user/getUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setUser(response.data);
        setIsLogged(true);
      }
    } catch (err) {
      console.log("Error fetching user: ", err);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (body) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, body);
      if (response.status >= 200 && response.status < 300) {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
        await getLoggedUser(accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
        getLoggedUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Define prop-types for the component
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
