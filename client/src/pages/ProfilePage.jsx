import React from "react";
import BuyProducts from "../components/Products/BuyProducts.jsx/BuyProducts";
import RentProducts from "../components/Products/RentProduts/RentProducts";
import SellProducts from "../components/Products/SellProducts.jsx/SellProducts";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mx-4">
      <div className="col-span-1">
        <Profile />
      </div>
      <div className="col-span-2">
        <SellProducts />
      </div>
      <div className="col-span-2">
        <BuyProducts />
        <RentProducts />
      </div>
    </div>
  );
};

export default ProfilePage;
