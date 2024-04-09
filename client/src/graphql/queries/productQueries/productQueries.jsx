import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT_QUERY = gql`
  query GetAllProduct {
    getAllProduct {
      id
      name
      price
      description
    }
  }
`;
