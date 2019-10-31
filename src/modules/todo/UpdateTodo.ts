import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";

import { TodoInput } from "./input/TodoInput";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";
import { getConnection } from "typeorm";

@Resolver(Todo)
export class UpdateTodoResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Todo, { nullable: true })
  async updateTodo(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { type }: TodoInput
  ): Promise<Todo | null> {
    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) return null;
    const todo = await Todo.findOne();
    if (!todo) return null;

    todo.type = type;
    await todo.save();

    const conn = getConnection().manager;
    conn.save(user);
    conn.save(todo);

    return todo;
  }
}
