// // UserContext.jsx
// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Initialize user state

//   const login = (userData) => {
//     setUser(userData); // Update user state with full user data
//     localStorage.setItem("user", JSON.stringify(userData)); // Optional: Store in local storage
//   };

//   const logout = () => {
//     setUser(null); // Clear user state on logout
//     localStorage.removeItem("user"); // Optional: Remove from local storage
//   };
//   const userRole = user ? user.role : null; // Access user role from user state


//   return (
//     <UserContext.Provider value={{ user, login, logout, userRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// //custome hook to provide access to UserContext
// export const useUser = () => {
//   return useContext(UserContext);
// };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
//   const [token, setToken] = useState(() => localStorage.getItem("token") || null);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   // Set the token in Axios headers for future requests
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

//   const userRole = user ? user.role : null;

//   return (
//     <UserContext.Provider value={{ user, login, logout, userRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

//----------------------------------------------------------------------------------------------------------------------------


// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
//   const [token, setToken] = useState(() => localStorage.getItem("token") || null);
//   const [logoutTimer, setLogoutTimer] = useState(null);

//   // Function to decode token and get expiration time
//   const getTokenExpiration = (token) => {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.exp * 1000; // Convert to milliseconds
//   };

//   // Login function with token expiration handling
//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);

//     // Clear any existing logout timer
//     if (logoutTimer) clearTimeout(logoutTimer);

//     // Calculate time until token expiration
//     const expirationTime = getTokenExpiration(authToken) - Date.now();

//     // Set timeout to log out user when token expires
//     setLogoutTimer(
//       setTimeout(() => {
//         window.alert("Session expired. Please log in again.");
//         logout();
//       }, expirationTime)
//     );
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     if (logoutTimer) clearTimeout(logoutTimer); // Clear any active logout timer
//     setLogoutTimer(null);
//   };

//   // Set the token in Axios headers for future requests
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

//   const userRole = user ? user.role : null;

//   return (
//     <UserContext.Provider value={{ user, login, logout, userRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);



//Notification code--------------------------------------------------------------------


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  // Notification function
  const notify = (message, type = "info") => {
    toast[type](message); // 'type' could be 'info', 'success', 'error', 'warning'
  };

  // Function to decode token and get expiration time
  const getTokenExpiration = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  };

  // Login function with token expiration handling
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    // Clear any existing logout timer
    if (logoutTimer) clearTimeout(logoutTimer);

    // Calculate time until token expiration
    const expirationTime = getTokenExpiration(authToken) - Date.now();

    // Set timeout to log out user when token expires
    setLogoutTimer(
      setTimeout(() => {
        notify("Session expired. Please log in again.", "warning");
        logout();
      }, expirationTime)
    );

    notify("Login successful!", "success");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (logoutTimer) clearTimeout(logoutTimer);
    setLogoutTimer(null);

    notify("Logged out successfully.", "info");
  };

  // Set the token in Axios headers for future requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const userRole = user ? user.role : null;

  return (
    <UserContext.Provider value={{ user, login, logout, userRole, notify }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
