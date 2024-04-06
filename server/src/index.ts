import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import createGraphqlServer from "./graphql";
import UserService from "./services/user";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 7000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "server" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["authorization"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (err) {
          return { err };
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server ${PORT}`));
}

init();
