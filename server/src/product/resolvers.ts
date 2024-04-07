import ProductService, {
  AddProductPayload,
  EditProductPayload,
  getProductPayload,
} from "../services/product";

const queries = {
  getAllProduct: async (_: any, parameters: any) => {
    const res = await ProductService.getAllProduct();

    return res;
  },
  getSingleProduct: async (_: any, payload: getProductPayload) => {
    const res = await ProductService.getSingleProduct(payload);

    return res;
  },

  getUserProduct: async (_: any, parameters: any, context: any) => {
    if (!context || !context.user) {
      throw new Error("User not authenticated. Please login to add a product.");
    }
    const userId = context.user.id;
    const res = await ProductService.getUserProduct(userId);

    return res;
  },
};

const mutations = {
  addProduct: async (_: any, payload: AddProductPayload, context: any) => {
    if (!context || !context.user) {
      throw new Error("User not authenticated. Please login to add a product.");
    }
    const userId = context.user.id;
    const res = await ProductService.addProduct({ ...payload, userId });

    return res.id;
  },
  editProduct: async (_: any, payload: EditProductPayload) => {
    const res = await ProductService.editProduct(payload);
    return res;
  },

  deleteProduct: async (_: any, payload: getProductPayload) => {
    const res = await ProductService.deleteProduct(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
