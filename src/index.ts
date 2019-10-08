// tslint:disable-next-line: no-duplicate-imports
import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";

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

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};
main();
