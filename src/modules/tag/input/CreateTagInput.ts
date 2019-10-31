import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class TagInput {
  @Field()
  @Length(1, 255)
  desc: string;
}
