export const mutations = `#graphql

    userRegistration(name:String!, username: String, email: String!, password: String!, role: String): String
    userLogin(email: String!,password: String!):String
`;
