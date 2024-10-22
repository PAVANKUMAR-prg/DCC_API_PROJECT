// UserContext.jsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  const login = (userData) => {
    setUser(userData); // Update user state with full user data
    localStorage.setItem("user", JSON.stringify(userData)); // Optional: Store in local storage
  };

  const logout = () => {
    setUser(null); // Clear user state on logout
    localStorage.removeItem("user"); // Optional: Remove from local storage
  };
  const userRole = user ? user.role : null; // Access user role from user state


  return (
    <UserContext.Provider value={{ user, login, logout, userRole }}>
      {children}
    </UserContext.Provider>
  );
};
//custome hook to provide access to UserContext
export const useUser = () => {
  return useContext(UserContext);
};
