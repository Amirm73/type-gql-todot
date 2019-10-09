import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  buildSchema,
  Resolver,
  Query,
  formatArgumentValidationError
} from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";

// import { TodoResolver } from "./modules/todo/TodoResolver";
import { RegisterResolver } from "./modules/user/Register";

@Resolver()
export class helloResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }
}
const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      //   TodoResolver
      RegisterResolver
      //   helloResolver
    ]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError as any,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      session: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 //7 years
      }
    } as any)
  );
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};
main();
