import { gql } from "@apollo/client";

export const GET_ADD_PRODUCT_MUTATION = gql`
  mutation Mutation(
    $name: String!
    $description: String!
    $price: Int!
    $categories: [String!]!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      categories: $categories
    )
  }
`;

export const GET_BUY_MUTATION = gql`
  mutation Mutation($productId: String!) {
    buyProduct(productId: $productId)
  }
`;
