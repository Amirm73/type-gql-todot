import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { Resolver, Query, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { createSchema } from "./utils/createSchema";
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator
} from "graphql-query-complexity";
import { separateOperations } from "graphql";

@Resolver()
export class helloResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }
}
const main = async () => {
  await createConnection();
  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError as any,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              query: request.operationName
                ? separateOperations(document)[request.operationName]
                : document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 })
              ]
            });
            if (complexity >= 20) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
              );
            }
            console.log("Used query complexity points:", complexity);
          }
        })
      }
    ]
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
      secret: process.env.SESSION_SECRET,
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
