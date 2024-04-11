import { default as RentService, getProductPayload } from "../services/rent";

const queries = {
  getUserRentProduct: async (_: any, parameters: any, context: any) => {
    if (!context || !context.user) {
      throw new Error("User not authenticated. Please login to add a product.");
    }

    const userId = context.user.id;

    const res = await RentService.userRentProduct(userId);

    return res;
  },
  // getSingleProduct: async (_: any, payload: getProductPayload) => {
  //   const res = await ProductService.getSingleProduct(payload);
  //   return res;
  // },
};

const mutations = {
  rentProduct: async (_: any, payload: getProductPayload, context: any) => {
    if (!context || !context.user) {
      throw new Error("User not authenticated. Please login to add a product.");
    }
    const userId = context.user.id;
    const res = await RentService.rentProduct({ ...payload, userId });

    return res.id;
  },
  // editProduct: async (_: any, payload: EditProductPayload) => {
  //   const res = await ProductService.editProduct(payload);
  //   return res;
  // },

  // deleteProduct: async (_: any, payload: getProductPayload) => {
  //   const res = await ProductService.deleteProduct(payload);
  //   return res;
  // },
};

export const resolvers = { queries, mutations };
