import { registerEnumType } from "type-graphql";

export enum Type {
  Todo = "Todo",
  Doing = "Doing",
  Done = "Done"
}

registerEnumType(Type, {
  name: "Type",
  description: "Type shows status of the todo"
});
