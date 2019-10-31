import { Resolver } from "type-graphql/decorators/Resolver";
import { FieldResolver, Root } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { Tag } from "../../entity/Tag";
import { createQueryBuilder } from "typeorm";

@Resolver(Todo)
export class TodoTagResolver {
  @FieldResolver(() => [Tag], { nullable: true })
  async Tags(@Root() todo: Todo): Promise<Tag[] | undefined> {
    return await createQueryBuilder(Tag)
      .select("tag")
      .from(Tag, "tag")
      .innerJoinAndSelect("todo_tags_tag", "tags", "tags.todoId=:todoId", {
        todoId: todo.id
      })
      .getMany();
  }
}

// .select("tag")
// .from(Tag, "tag")
// .innerJoinAndSelect("todo_tags_tag", "tags"
// .where("tags.todoId=:todoId", { todoId: todo.id })

// .leftJoinAndSelect("tag_todos_todo", "tags", "tags.todoId=:todoId", {
//   todoId: todo.id
// })

// return Tag.find({ relations: ["todos"] });
// return await getRepository(Tag)
//   .createQueryBuilder()

// .innerJoinAndSelect("tag.todos", "todo")
