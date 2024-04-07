export const mutations = `#graphql
    addProduct(name: String!,
    description: String!,
    price: Int!,
    categories: [String!]!
    ): String

    editProduct(id: String!, name: String
    description: String
    price: Float
    categories: [String]): Product


    deleteProduct(id: String!): String
`;
