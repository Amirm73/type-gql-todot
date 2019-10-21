import { Resolver, Arg, Mutation } from "type-graphql";
import { createQueryBuilder } from "typeorm";
import { Todo } from "../../entity/Todo";

@Resolver(() => Todo)
export class AssignTodoTagResolver {
  @Mutation(() => Todo)
  async assignTodoTag(
    @Arg("tagId") tagId: string,
    @Arg("todoId") todoId: string
  ): Promise<Todo | undefined> {
    await createQueryBuilder("todo")
      .relation(Todo, "tags")
      .of(todoId)
      .add(tagId);

    return Todo.findOne(todoId, { relations: ["tags"] });
  }
}
