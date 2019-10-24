import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Tag } from "../../entity/Tag";
import { Todo } from "src/entity/Todo";
import { createQueryBuilder } from "typeorm";

@Resolver()
export class GetTodoTagsResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Tag], { nullable: true })
  async getTodoTags(@Arg("todoId") todoId: string): Promise<Tag[] | undefined> {
    return await createQueryBuilder()
      .relation(Todo, "tags")
      .of(todoId)
      .loadMany();
  }
}
