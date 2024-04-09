import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar/Navbar";
import ProductSellForm from "../components/Products/ProductSellForm/ProductSellForm";
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product" element={<ProductSellForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
