import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

export interface UserRegistrationPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }

  public static userRegistration(payload: UserRegistrationPayload) {
    const { name, username, email, password, role } = payload;
    const salt = randomBytes(32).toString("hex");

    return prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: UserService.generateHash(salt, password),
        salt,
        role,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async userLogin(payload: UserLoginPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User not Found");

    const userHashPassword = UserService.generateHash(user.salt, password);

    if (userHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}

export default UserService;
