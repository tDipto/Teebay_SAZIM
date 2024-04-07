import { ApolloServer } from "@apollo/server";
import { Product } from "../product";
import { Purchase } from "../purchase";
import { Rent } from "../rent";
import { User } from "../user";

async function createGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
        ${Product.typeDefs}
        ${Purchase.typeDefs}
        
        
    type Query {
       ${User.queries}
       ${Product.queries}
       ${Purchase.queries}
       ${Rent.queries}
        
    }
    type Mutation {
       ${User.mutations}
       ${Product.mutations}
       ${Purchase.mutations}
       ${Rent.mutations}
       
    }
  `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Product.resolvers.queries,
        ...Purchase.resolvers.queries,
        ...Rent.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Product.resolvers.mutations,
        ...Purchase.resolvers.mutations,
        ...Rent.resolvers.mutations,
      },
    },
  });

  await gqlserver.start();
  return gqlserver;
}

export default createGraphqlServer;
