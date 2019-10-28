import { Resolver, Query, UseMiddleware, Ctx, Info } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import graphqlFields = require("graphql-fields");

@Resolver(Todo)
export class GetAllTodosResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Todo], { nullable: true })
  async getAllTodos(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Todo[] | undefined> {
    const userId = ctx.req.session!.userId;
    // const todos = await Todo.find({ where: { user: userId } });      //brief, non performant
    const fields = graphqlFields(info);
    const selection = Object.keys(fields).map(field => "todo." + field);
    console.log(selection);
    const todos = await getRepository(Todo)
      .createQueryBuilder()
      // .select(["todo.id", "todo.name"])
      .select(selection)
      .from(Todo, "todo")
      .where("todo.user=:userId", { userId })
      .getMany();
    return todos;
  }
}

// @FieldResolver()
// async name(@Root() parent: Todo) {
//   return parent.name;
// }
