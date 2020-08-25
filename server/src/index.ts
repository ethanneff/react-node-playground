// libraries
import "reflect-metadata";
import "dotenv/config";
import express from "express"; // server
import compression from "compression"; // compresses requests
import bodyParser from "body-parser"; // read json
import helmet from "helmet"; // security headers
import lusca from "lusca"; // crsf tokens
import cors from "cors"; // cors
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Constants } from "./constants";
import { HelloResolver } from "./resolvers/hello";

// controllers
import { Auth, Posts } from "./controllers";

const main = async () => {
  // server
  const app = express();

  // configuration
  app.set("trust proxy", 1);
  app.use(compression());
  app.use(express.json());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
  if (Constants.prod) app.use(helmet());

  // routes
  app.get("/", (_, res) => res.json({ key: "value" }));
  app.post("/login", Auth.login);
  app.post("/refresh", Auth.refresh);
  app.delete("/logout", Auth.logout);
  app.get("/posts", Auth.secure, Posts.getPosts);

  // apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HelloResolver], validate: false }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });

  // serve
  app.listen(process.env.PORT);
};

main().catch((err) => {
  throw new Error(err.message);
});
