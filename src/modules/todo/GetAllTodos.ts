import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";

@Resolver(Todo)
export class GetAllTodosResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Todo], { nullable: true })
  async getAllTodos(@Ctx() ctx: MyContext): Promise<Todo[] | undefined> {
    const userId = ctx.req.session!.userId;
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "todos")
      .of(userId)
      .loadMany();
  }
}
