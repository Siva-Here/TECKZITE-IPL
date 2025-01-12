import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify the token with the backend
  const verifyToken = async () => {
    const token = localStorage.getItem("Token"); // Retrieve the token from localStorage
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (response.ok) {
        setIsAuthenticated(true); // Token is valid
      } else {
        setIsAuthenticated(false); // Token is invalid
        localStorage.removeItem("Token"); // Remove invalid token
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("Token"); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
    toast.success("Logout Successfull!");
  };

  // Verify the token when the app starts or refreshes
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,logout,verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
