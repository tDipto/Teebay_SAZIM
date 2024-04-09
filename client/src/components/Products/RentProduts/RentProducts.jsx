// BuyProducts.jsx
import React from "react";
import { GET_USER_RENT_PRODUCT_QUERY } from "../../../graphql/queries/productQueries/productQueries";
import ProfileProduct from "../ProfileProduct/ProfileProduct";

const RentProducts = () => {
  return <ProfileProduct query={GET_USER_RENT_PRODUCT_QUERY} name="Rent" />;
};

export default RentProducts;
