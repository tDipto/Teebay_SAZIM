import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query Query {
    getCurrentUser {
      id
      name
      email
    }
  }
`;
