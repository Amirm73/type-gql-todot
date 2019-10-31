import { Resolver, Query, UseMiddleware, Ctx, Arg } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/MyContext";
import { getRepository } from "typeorm";

@Resolver(Todo)
export class GetTodoResolver {
  @UseMiddleware(isAuth)
  @Query(() => Todo, { nullable: true })
  async getTodo(
    @Ctx() ctx: MyContext,
    @Arg("todoId") todoId: string
  ): Promise<Todo | undefined> {
    const userId = ctx.req.session!.userId;

    const todo = await getRepository(Todo)
      .createQueryBuilder("todo")
      .where("todo.user = :userId AND todo.id = :todoId", { userId, todoId })
      .getOne();
    return todo;
  }
}
