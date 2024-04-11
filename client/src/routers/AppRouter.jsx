import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NavbarComponent from "../components/Navbar/Navbar";
import NotFound from "../components/NotFound/NotFound";
import ProductSellForm from "../components/Products/ProductSellForm/ProductSellForm";
import Protected from "../components/Protected/Protected";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import SingleProductPage from "../pages/SingleProductPage";
const AppRouter = () => {
  return (
    <>
      <Router>
        <NavbarComponent />
        {/* {console.log(data?.getCurrentUser)} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={<Protected Component={ProfilePage} />}
          />
          <Route
            path="/product"
            element={<Protected Component={ProductSellForm} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/product/:id"
            element={<Protected Component={SingleProductPage} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Route path="/" element={<HomePage />} />
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
          <Route
            path="/product/:id"
            element={
              isAuthenticated ? <SingleProductPage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes> */}
      </Router>
    </>
  );
};

export default AppRouter;
