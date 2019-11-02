import { Resolver } from "type-graphql/decorators/Resolver";
import { FieldResolver, Root } from "type-graphql";
import { Todo } from "../../entity/Todo";
import { Tag } from "../../entity/Tag";
import { getRepository } from "typeorm";

@Resolver(Todo)
export class TodoTagResolver {
  @FieldResolver(() => [Tag], { nullable: true })
  async Tags(@Root() todo: Todo): Promise<Tag[] | undefined | any> {
    const result = await getRepository(Tag)
      .createQueryBuilder()
      .relation(Todo, "tags")
      .of(todo.id)
      .loadMany();
    console.log(result);
    return result;
  }
}
// let result = await getRepository(Tag).query(
//   `SELECT "tags"."id" AS "id", "tags"."desc" AS "desc"
//   FROM "tag" "tags"
//   INNER JOIN  "todo_tags_tag" "todo_tags_tag"
//   ON "todo_tags_tag"."todoId" IN ($1)`,
//   [todo.id]
// );
// console.log(result);
// result = <[Tag]>(<any>result); //[Tag{ id, desc}]
// return result;
