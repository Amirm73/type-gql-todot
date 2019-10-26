import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Type } from "../enums/todoTypes";

@InputType()
export class CreateTodoInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field(() => Type)
  type: Type;
}
