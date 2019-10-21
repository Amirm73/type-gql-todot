import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateTagInput {
  @Field()
  @Length(1, 255)
  desc: string;

  @Field()
  tagId: string;
}
