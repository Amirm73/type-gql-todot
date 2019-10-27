import { Resolver, Query, UseMiddleware } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getRepository } from "typeorm";
// import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";

@Resolver(Todo)
export class GetAllTodosResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Todo], { nullable: true })
  async getAllTodos(): Promise<Todo[] | undefined | any> {
    const todos = await getRepository(User)
      .createQueryBuilder()
      .select("user.id", "id")
      .addSelect("user.password")
      .getMany();
    return todos;
  }
}
// @Ctx() ctx: MyContext
// @Arg("data", () => [String]) data: string[]
// const userId = ctx.req.session!.userId;
// const todos = await getConnection()
//   .createQueryBuilder()
//   .relation(User, "todos")
//   .of(userId)
//   .select(data)
//   .getMany();
// console.log(todos);
// return todos;

// @FieldResolver()
// async name(@Root() parent: Todo) {
//   return parent.name;
// }
