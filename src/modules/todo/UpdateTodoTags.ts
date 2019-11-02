import { Resolver, Arg, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { Todo } from "../../entity/Todo";
import { Tag } from "../../entity/Tag";

@Resolver(() => Todo)
export class UpdateTodoTagResolver {
  @Mutation(() => Todo)
  async updateTodoTags(
    @Arg("tagIds", () => [String]) tagIds: string[],
    @Arg("todoId") todoId: string
  ): Promise<Todo | undefined> {
    const tags = await Tag.findByIds(tagIds);
    await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({ tags })
      .where("id = :id", { id: 1 })
      .execute();
    return Todo.findOne(todoId);
  }
}
