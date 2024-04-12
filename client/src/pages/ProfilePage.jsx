import React, { useState } from "react";
import BuyProducts from "../components/Products/BuyProducts.jsx/BuyProducts";
import RentProducts from "../components/Products/RentProduts/RentProducts";
import SellProducts from "../components/Products/SellProducts.jsx/SellProducts";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  const [activeOption, setActiveOption] = useState("sell");

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/5 m-4">
        <Profile />
      </div>
      <div className="md:flex-1 mx-5">
        <nav className="mb-4">
          <ul className="flex">
            <li
              className={`mr-4 cursor-pointer ${
                activeOption === "sell" ? "font-bold" : ""
              }`}
              onClick={() => setActiveOption("sell")}
            >
              Sell
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                activeOption === "buy" ? "font-bold" : ""
              }`}
              onClick={() => setActiveOption("buy")}
            >
              Buy
            </li>
            <li
              className={`cursor-pointer ${
                activeOption === "rent" ? "font-bold" : ""
              }`}
              onClick={() => setActiveOption("rent")}
            >
              Rent
            </li>
          </ul>
        </nav>
        {activeOption === "sell" && <SellProducts />}
        {activeOption === "buy" && <BuyProducts />}
        {activeOption === "rent" && <RentProducts />}
      </div>
    </div>
  );
};

export default ProfilePage;
