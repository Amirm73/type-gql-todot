import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Tag } from "../../entity/Tag";

@Resolver(Tag)
export class DeleteTagResolver {
  @UseMiddleware(isAuth)
  @Query(() => Tag, { nullable: true })
  async deleteTag(
    @Arg("tagId") tagId: string,
    @Arg("todoId") todoId: string
  ): Promise<void> {
    return await getConnection()
      .createQueryBuilder()
      .relation(Todo, "tags")
      .of(todoId)
      .remove(tagId);
  }
}
