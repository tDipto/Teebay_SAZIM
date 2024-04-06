import { ApolloServer } from "@apollo/server";
import { User } from "../user";

async function createGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: `
    type Query {
       hello:String
        
    }
    type Mutation {
       ${User.mutations}
    }
  `,
    //    ${User.queries}
    //
    resolvers: {
      Query: {},
      Mutation: { ...User.resolvers.mutations },
    },
  });

  await gqlserver.start();

  return gqlserver;
}

export default createGraphqlServer;
