import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { UpdateTodoInput } from "./input/UpdateTodoInput";

@Resolver(Todo)
export class UpdateTodoResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Todo, { nullable: true })
  async updateTodo(@Arg("data")
  {
    todoId,
    name,
    type
  }: UpdateTodoInput): Promise<Todo | null | undefined> {
    if (!todoId) return null;
    await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({ type, name })
      .where("id = :todoId", { todoId })
      .execute();
    return Todo.findOne(todoId);
  }
}
