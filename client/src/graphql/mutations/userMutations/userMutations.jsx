import { gql } from "@apollo/client";

export const GET_USER_MUTATION = gql`
  query userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`;
