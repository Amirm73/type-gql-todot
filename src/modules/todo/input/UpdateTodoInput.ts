import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateTodoInput {
  @Field()
  todoId: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  type: string;
}
