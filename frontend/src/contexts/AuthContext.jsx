import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { apiStart } from "../../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userObj, setUserObj] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  async function checkTokenValidity() {
    const token = localStorage.getItem("loginToken");

    if (!token) {
      setIsAuthenticated(false);
      setIsVerified(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${apiStart}/api/user/my`, {
        headers: { Authorization: token },
      });
      console.log(response.data);
      if (response.data.success) {
        setIsAuthenticated(true);
        setUserObj(response.data.data);
        console.log(userObj);
        setIsVerified(response.data.data.isverified);
      } else {
        setIsAuthenticated(false);
        setIsVerified(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsAuthenticated,
        userObj,
        isVerified,
        checkTokenValidity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
