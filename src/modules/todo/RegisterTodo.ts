import { TodoInput } from "./input/TodoInput";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { Todo } from "../../entity/Todo";
import { getConnection } from "typeorm";

@Resolver(Todo)
export class RegisterTodoResolver {
  @Mutation(() => Todo)
  async createTodo(
    @Ctx() ctx: MyContext,
    @Arg("data") { type, name }: TodoInput
  ): Promise<Todo> {
    const userId = ctx.req.session!.userId;
    const todo = await Todo.create({
      type,
      name
    }).save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "todos")
      .of(userId) // you can use just post id as well
      .add(todo); // you can use just category id as well

    return todo;
  }
}

// import { createBaseResolver } from "src/utils/createBaseResolver";

// export const CreateUserResolver = createBaseResolver(
//   "Todo",
//   Todo,
//   TodoInput,
//   Todo
// );

// @Resolver()
// export class CreateUserResolver extends BaseCreateTodo {}
