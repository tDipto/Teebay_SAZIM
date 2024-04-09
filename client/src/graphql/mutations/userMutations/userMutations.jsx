import { gql } from "@apollo/client";

export const GET_USER_MUTATION = gql`
  mutation UserRegistration(
    $name: String!
    $email: String!
    $password: String!
  ) {
    userRegistration(name: $name, email: $email, password: $password)
  }
`;
