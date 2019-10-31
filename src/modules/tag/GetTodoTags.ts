import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { getRepository } from "typeorm";
import { Tag } from "../../entity/Tag";

@Resolver(Tag)
export class GetTodoTagsResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Tag], { nullable: true })
  async getTodoTags(@Arg("todoId") todoId: string): Promise<Tag[] | undefined> {
    return await getRepository(Tag)
      .createQueryBuilder("tag")
      .innerJoinAndSelect("tag.todos", "todo", "todo.id = :todoId", { todoId })
      .getMany();
  }
}
