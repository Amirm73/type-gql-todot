import { createDependentResolver } from "../../utils/createDependentResolver";
import { Todo } from "../../entity/Todo";
import { CreateTodoInput } from "./input/CreateTodoInput";
import { User } from "../../entity/User";
export const CreateTodoResolver = createDependentResolver(
  "Todo",
  Todo,
  CreateTodoInput,
  Todo,
  User,
  "todos",
  undefined,
  "userId"
);
