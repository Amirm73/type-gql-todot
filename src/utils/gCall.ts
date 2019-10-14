import { createSchema } from "./createSchema";
import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

interface Option {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Option) => {
  if (!schema) schema = await createSchema();

  return graphql({
    schema,
    source,
    variableValues
  });
};
