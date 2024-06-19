import { VariablesOf, initGraphQLTada } from "gql.tada";
import type { introspection } from "@/graphql-env";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";

export const graphql = initGraphQLTada<{
  introspection: introspection;
}>();

const meQuery = graphql(`
  query Me {
    me {
      __typename
      ... on User {
        id
        givenName
        familyName
        email
        avatarUrl
      }
      ... on UserNotFound {
        message
        code
      }
    }
  }
`);

const userByIdQuery = graphql(`
  query UserByID($id: ID!) {
    userByID(id: $id) {
      __typename
      ... on User {
        id
        givenName
        familyName
        email
      }
      ... on UserNotFound {
        message
        code
      }
    }
  }
`);

const createUserMutation = graphql(`
  mutation CreateUser(
    $givenName: String!
    $familyName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      payload: {
        givenName: $givenName
        familyName: $familyName
        email: $email
        password: $password
      }
    ) {
      __typename
      ... on User {
        id
        givenName
        familyName
        email
      }
      ... on EmailUnavailable {
        message
        code
      }
    }
  }
`);

const authenticateWithPasswordMutation = graphql(`
  mutation AuthenticateWithPassword($email: String!, $password: String!) {
    authenticateWithPassword(email: $email, password: $password) {
      __typename
      ... on UserSession {
        token
        expiresAt
      }
      ... on UserNotFound {
        message
        code
      }
      ... on InvalidCredentials {
        message
        code
      }
    }
  }
`);

const authenticateWithGoogleCodeMutation = graphql(`
  mutation AuthWithGoogle($code: String!) {
    authenticateWithGoogleCode(code: $code) {
      __typename
      ... on UserSession {
        token
        expiresAt
      }
      ... on UserNotFound {
        message
        code
      }
      ... on InvalidCredentials {
        message
        code
      }
    }
  }
`);

const getMe = cache((client: GraphQLClient) => client.request(meQuery));

const getUserById = cache(
  (client: GraphQLClient, variables: VariablesOf<typeof userByIdQuery>) =>
    client.request(userByIdQuery, variables),
);

export class UserClient {
  private client: GraphQLClient;

  constructor(client: GraphQLClient) {
    this.client = client;
  }

  public getMe() {
    return getMe(this.client);
  }

  public getUserById(variables: VariablesOf<typeof userByIdQuery>) {
    return getUserById(this.client, variables);
  }

  public createUser(variables: VariablesOf<typeof createUserMutation>) {
    return this.client.request(createUserMutation, variables);
  }

  public authenticateWithPassword(
    variables: VariablesOf<typeof authenticateWithPasswordMutation>,
  ) {
    return this.client.request(authenticateWithPasswordMutation, variables);
  }

  public authenticateWithGoogleCode(
    variables: VariablesOf<typeof authenticateWithGoogleCodeMutation>,
  ) {
    return this.client.request(authenticateWithGoogleCodeMutation, variables);
  }
}
