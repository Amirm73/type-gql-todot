import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Type } from "../enums/todoTypes";
@InputType()
export class UpdateTodoInput {
  @Field()
  todoId: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  type: Type;
}
