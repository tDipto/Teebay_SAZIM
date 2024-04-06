import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import createGraphqlServer from "./graphql";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 7000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "server" });
  });

  app.use("/graphql", expressMiddleware(await createGraphqlServer()));

  app.listen(PORT, () => console.log(`Server ${PORT}`));
}

init();
