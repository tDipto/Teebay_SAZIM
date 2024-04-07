import { prismaClient } from "../lib/db";

export interface getProductPayload {
  productId: string;
  userId: string;
}

class PurchaseService {
  public static async buyProduct(payload: getProductPayload) {
    const { productId, userId } = payload;
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    if (!product.available) {
      throw new Error(`Product with ID ${productId} is not available`);
    }

    const transaction = await prismaClient.$transaction([
      prismaClient.purchase.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: userId } },
        },
      }),

      prismaClient.product.update({
        where: { id: productId },
        data: { available: false },
      }),
    ]);

    return transaction[0];
  }

  public static async userBoughtProduct(userId: string) {
    const userPurchases = await prismaClient.purchase.findMany({
      where: { userId },
      include: { product: true },
    });

    const userProducts = userPurchases.map((purchase) => purchase.product);

    return userProducts;
  }
}

export default PurchaseService;
