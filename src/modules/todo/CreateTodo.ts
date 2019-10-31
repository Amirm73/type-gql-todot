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

// @Resolver()
// export class CreateTodoResolver extends BaseCreateTodo {}
//--------------------
// import { CreateTodoInput } from "./input/CreateTodoInput";
// import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
// import { User } from "../../entity/User";
// import { MyContext } from "../../types/MyContext";
// import { Todo } from "../../entity/Todo";
// import { createQueryBuilder } from "typeorm";
// import { isAuth } from "../middleware/isAuth";

// @Resolver(Todo)
// export class CreateTodoResolver {
//   @UseMiddleware(isAuth)
//   @Mutation(() => Todo)
//   async createTodo(
//     @Ctx() ctx: MyContext,
//     @Arg("data") { type, name }: CreateTodoInput
//   ): Promise<Todo> {
//     const userId = ctx.req.session!.userId;
//     const todo = await Todo.create({
//       type,
//       name
//     }).save();

//     await createQueryBuilder()
//       .relation(User, "todos")
//       .of(userId)
//       .add(todo);

//     return todo;
//   }
// }
