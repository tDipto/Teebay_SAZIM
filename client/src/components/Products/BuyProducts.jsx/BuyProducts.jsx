// BuyProducts.jsx
import React from "react";
import { GET_USER_BOUGHT_PRODUCT_QUERY } from "../../../graphql/queries/productQueries/productQueries";
import ProfileProduct from "../ProfileProduct/ProfileProduct";

const BuyProducts = () => {
  return <ProfileProduct query={GET_USER_BOUGHT_PRODUCT_QUERY} name="Bought" />;
};

export default BuyProducts;
