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
export const GET_USER_SELL_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: getUserProduct {
      description
      name
      price
    }
  }
`;

export const GET_USER_BOUGHT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: userBoughtProduct {
      description
      name
      price
    }
  }
`;

export const GET_USER_RENT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: userRentProduct {
      description
      name
      price
    }
  }
`;
