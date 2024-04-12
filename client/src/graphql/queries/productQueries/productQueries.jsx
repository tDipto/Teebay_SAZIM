import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT_QUERY = gql`
  query GetAllProduct {
    getAllProduct {
      id
      name
      price
      description
      available
      createdAt
      categories {
        name
        id
      }
    }
  }
`;
export const GET_USER_SELL_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: getUserSellProduct {
      id
      name
      price
      description
      available
      categories {
        name
        id
      }
    }
  }
`;

export const GET_USER_BOUGHT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: getUserBuyProduct {
      id
      name
      price
      description
      available
      categories {
        name
        id
      }
    }
  }
`;

export const GET_USER_RENT_PRODUCT_QUERY = gql`
  query GetUserProduct {
    product: getUserRentProduct {
      id
      name
      price
      description
      available
      categories {
        name
        id
      }
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
      createdAt
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
