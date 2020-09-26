import { Resolvers, User } from "../generated/graphql";

import { AuthenticationError } from "apollo-server-express";

const USER_UPDATED = "USER_UPDATED";

const resolver: Resolvers = {
  User: {},
};

export default resolver;
