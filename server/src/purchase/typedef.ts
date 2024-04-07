export const typeDefs = `#graphql

scalar DateTime

type Product {
    id: ID
    name: String
    description: String
    price: Float
    categories: [Category]
    user: User
    createdAt: DateTime
  }

type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    products: [Product!]!
  }


  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

`;
