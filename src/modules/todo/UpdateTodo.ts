import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getConnection, UpdateResult } from "typeorm";
import { UpdateTodoInput } from "./input/UpdateTodoInput";

@Resolver(Todo)
export class UpdateTodoResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Todo, { nullable: true })
  async updateTodo(@Arg("data")
  {
    type,
    todoId
  }: UpdateTodoInput): Promise<UpdateResult> {
    return await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({ type })
      .where("id = :todoId", { todoId })
      .execute();
  }
}
