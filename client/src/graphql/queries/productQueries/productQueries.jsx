import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT_QUERY = gql`
  query GetAllProduct {
    getAllProduct {
      id
      name
      price
      description
      available
    }
  }
`;
export const GET_USER_SELL_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: getUserProduct {
      id
      description
      name
      price
    }
  }
`;

export const GET_USER_BOUGHT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: userBoughtProduct {
      id
      description
      name
      price
    }
  }
`;

export const GET_USER_RENT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: userRentProduct {
      id
      description
      name
      price
    }
  }
`;

export const GET_SINGLE_PRODUCT_QUERY = gql`
  query GetUserProduct($getSingleProductId: String!) {
    product: getSingleProduct(id: $getSingleProductId) {
      id
      description
      name
      price
      available
      user {
        id
      }
      categories {
        name
        id
      }
    }
  }
`;
