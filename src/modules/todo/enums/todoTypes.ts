import { registerEnumType } from "type-graphql";

export enum Type {
  Todo,
  Doing,
  Done
}

registerEnumType(Type, {
  name: "Type",
  description: "Type shows status of the todo"
});
