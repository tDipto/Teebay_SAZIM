import { useQuery } from "@apollo/client";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import NavbarComponent from "../components/Navbar/Navbar";
import NotFound from "../components/NotFound/NotFound";
import ProductSellForm from "../components/Products/ProductSellForm/ProductSellForm";
import { GET_USER_QUERY } from "../graphql/queries/userQueries/userQueries";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import SingleProductPage from "../pages/SingleProductPage";
const AppRouter = () => {
  const { loading, error, data } = useQuery(GET_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  // if (error) {
  //   console.error("Error fetching user data:", error);
  //   return <p>Error fetching user data. Please try again later.</p>;
  // }

  const isAuthenticated = data?.getCurrentUser !== undefined;
  return (
    <>
      <Router>
        <NavbarComponent />
        {/* {console.log(data.getCurrentUser)} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/product"
            element={
              isAuthenticated ? <ProductSellForm /> : <Navigate to="/login" />
            }
          />
          {/* Routes accessible only when not logged in */}
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/registration"
            element={
              !isAuthenticated ? <RegistrationPage /> : <Navigate to="/" />
            }
          />
          {/* Public routes accessible to all */}
          <Route
            path="/product/:id"
            element={
              isAuthenticated ? <SingleProductPage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Fallback for unknown routes */}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
