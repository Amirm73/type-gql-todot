import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class CreateTagInput {
  @Field()
  @Length(1, 255)
  desc: string;
}
