import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/MyContext";

@Resolver(Todo)
export class GetAllTodosResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Todo], { nullable: true })
  async getAllTodos(@Ctx() ctx: MyContext): Promise<Todo[] | undefined> {
    const userId = ctx.req.session!.userId;
    const todos = await Todo.find({ where: { user: userId } });
    console.log(userId);
    return todos;
  }
}
