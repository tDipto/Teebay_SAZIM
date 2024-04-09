import { gql } from "@apollo/client";

export const GET_REG_MUTATION = gql`
  mutation UserRegistration(
    $name: String!
    $email: String!
    $password: String!
  ) {
    userRegistration(name: $name, email: $email, password: $password)
  }
`;
export const GET_LOGIN_MUTATION = gql`
  mutation UserLogin($email: String!, $password: String!) {
    token: userLogin(email: $email, password: $password)
  }
`;
