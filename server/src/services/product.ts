import { prismaClient } from "../lib/db";

// export interface AddProductPayload {
//   name: string;
//   description: string;
//   price: number;
//   categories: string[];
//   userId: string;
// }

// export interface EditProductPayload {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   categories: [];
// }

export interface AddProductPayload {
  name: string;
  description: string;
  price: number;
  categories: string[];
  userId?: string;
}

export interface EditProductPayload extends AddProductPayload {
  id: string;
}

export interface getProductPayload {
  id: string;
}

class ProductService {
  public static async addProduct(payload: AddProductPayload) {
    const { name, description, price, categories, userId } = payload;
    try {
      const product = await prismaClient.product.create({
        data: {
          name,
          description,
          price,
          categories: {
            connect: categories.map((categoryId) => ({ id: categoryId })),
          },
          user: { connect: { id: userId } },
        },
      });

      return product;
    } catch (error) {
      throw new Error(`Failed to add product: ${error}`);
    }
  }

  public static async getAllProduct() {
    try {
      const products = await prismaClient.product.findMany({
        include: { categories: true, user: true },
      });
      0;
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error}`);
    }
  }

  public static async getSingleProduct(payload: getProductPayload) {
    const { id } = payload;
    try {
      const products = await prismaClient.product.findUnique({
        where: { id },
        include: { categories: true, user: true },
      });
      0;
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error}`);
    }
  }

  public static async editProduct(payload: EditProductPayload) {
    const { id, name, description, price, categories } = payload;

    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categories: {
          set: categories
            ? categories.map((categoryId) => ({ id: categoryId }))
            : undefined,
        },
      },
    });

    return updatedProduct;
  }

  public static async deleteProduct(payload: getProductPayload) {
    const { id } = payload;

    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    await prismaClient.product.delete({
      where: { id },
    });

    return id;
  }
}

export default ProductService;
