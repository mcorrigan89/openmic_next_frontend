import { GraphQLClient } from "graphql-request";
import { UserClient } from "./user-queries";

export class GQLClient {
  private client: GraphQLClient;
  private userClient: UserClient;
  constructor(url: string) {
    this.client = new GraphQLClient(url + "/graphql");
    this.userClient = new UserClient(this.client);
  }

  public setToken(token: string) {
    this.client.setHeader("x-session-token", token);
  }

  public get user() {
    return this.userClient;
  }
}
