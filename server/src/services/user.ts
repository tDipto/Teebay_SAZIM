import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
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
}

export default UserService;
