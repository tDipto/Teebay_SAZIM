import UserService, {
  UserLoginPayload,
  UserRegistrationPayload,
} from "../services/user";

const queries = {
  getCurrentUser: async (_: any, parameters: any, context: any) => {
    if (!context || !context.user) {
      throw new Error("User not authenticated. Please login");
    }
    const id = context.user.id;
    const user = await UserService.getUserByID(id);
    return user;
  },
};

const mutations = {
  userRegistration: async (_: any, payload: UserRegistrationPayload) => {
    const res = await UserService.userRegistration(payload);
    return res;
  },
  userLogin: async (_: any, payload: UserLoginPayload) => {
    const token = await UserService.userLogin(payload);
    return token;
  },
};

export const resolvers = { queries, mutations };
