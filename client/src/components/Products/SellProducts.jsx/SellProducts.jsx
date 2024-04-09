// SellProducts.jsx
import React from "react";
import { GET_USER_SELL_PRODUCT_QUERY } from "../../../graphql/queries/productQueries/productQueries";
import ProfileProduct from "../ProfileProduct/ProfileProduct";

const SellProducts = () => {
  return <ProfileProduct query={GET_USER_SELL_PRODUCT_QUERY} name="Sell" />;
};

export default SellProducts;
