import { prismaClient } from "../lib/db";

export interface getProductPayload {
  productId: string;
  startTime: Date;
  endTime: Date;
  userId: string;
}

export class RentService {
  public static async rentProduct(payload: getProductPayload) {
    const { productId, startTime, endTime, userId } = payload;

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
      prismaClient.rent.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: userId } },
          startTime,
          endTime,
        },
      }),

      prismaClient.product.update({
        where: { id: productId },
        data: { available: false },
      }),
    ]);

    return transaction[0];
  }

  public static async userRentProduct(userId: string) {
    const userRents = await prismaClient.rent.findMany({
      where: { userId },
      include: { product: true },
    });

    const userProducts = userRents.map((rent) => rent.product);

    return userProducts;
  }
}

export default RentService;
