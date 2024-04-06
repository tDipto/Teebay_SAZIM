import UserService, { UserRegistrationPayload } from "../services/user";

const queries = {};

const mutations = {
  userRegistration: async (_: any, payload: UserRegistrationPayload) => {
    const res = await UserService.userRegistration(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
