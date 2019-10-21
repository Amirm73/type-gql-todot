import { Resolver, Query, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";

@Resolver(Todo)
export class DeleteTodoResolver {
  @UseMiddleware(isAuth)
  @Query(() => Todo, { nullable: true })
  async deleteTodo(
    @Ctx() ctx: MyContext,
    @Arg("todoId") todoId: string
  ): Promise<void> {
    const userId = ctx.req.session!.userId;

    return await getConnection()
      .createQueryBuilder()
      .relation(User, "todos")
      .of(userId)
      .remove(todoId);
  }
}
