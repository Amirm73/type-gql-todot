import { Resolver, Arg, Mutation } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { createQueryBuilder } from "typeorm";

@Resolver()
export class BulkAssignTagsResolver {
  @Mutation(() => Todo)
  async bulkAssignTodoTag(
    @Arg("tagIds", () => [String]) tagIds: string[],
    @Arg("todoId") todoId: string
  ): Promise<Todo | undefined> {
    await createQueryBuilder("todo")
      .relation(Todo, "tags")
      .of(todoId)
      .add(tagIds);

    return Todo.findOne(todoId, { relations: ["tags"] });
  }
}
