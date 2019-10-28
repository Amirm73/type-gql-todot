import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";

@Resolver(Todo)
export class GetTodoResolver {
  @UseMiddleware(isAuth)
  @Query(() => Todo, { nullable: true })
  async getTodo(@Arg("todoId") todoId: string): Promise<Todo | undefined> {
    return Todo.findOne(todoId);
  }
}
