// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { UserProvider } from './components/Global/UserContext';  // Import UserProvider
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import AdminDashboard from './components/Admin/AdminDashboard';
import PostStory from './components/User/PostStory';
import Contact from './components/Contact/Contact';
import ProtectedRoute from './components/Global/ProtectedRoute';
import UserDashboard from './components/User/UserDashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<SignUp/>} />
      <Route path="signin" element={<SignIn />} />
      <Route path="contact" element={<Contact />} />

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute role="User" />}>
        <Route path="user-dashboard" element={<UserDashboard />} />
        {/* <Route path="poststory" element={<PostStory />} /> */}
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute role="Admin" />}>
        <Route path="admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);


const App = () => {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
