import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`;
