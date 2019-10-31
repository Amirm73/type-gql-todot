import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/MyContext";
// import { getRepository } from "typeorm";
// import { GraphQLResolveInfo } from "graphql";
// import graphqlFields = require("graphql-fields");

@Resolver(Todo)
export class GetAllTodosResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Todo], { nullable: true })
  async getAllTodos(
    @Ctx() ctx: MyContext
    // @Info() info: GraphQLResolveInfo
  ): Promise<Todo[] | undefined> {
    const userId = ctx.req.session!.userId;
    const todos = await Todo.find({ where: { user: userId } }); //brief, non performant
    return todos;
  }
}
// const fields = graphqlFields(info);
// const selection = Object.keys(fields).map(field => "todo." + field);

// const todos = await getRepository(Todo)
//   .createQueryBuilder()
//   // .select(["todo.id", "todo.name"])
//   .select(selection)
//   .from(Todo, "todo")
//   .where("todo.user=:userId", { userId })
//   .getMany();

// @FieldResolver()
// async name(@Root() parent: Todo) {
//   return parent.name;
// }
