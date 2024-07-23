import React, { useState } from "react";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state will hold the user data including ID

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
