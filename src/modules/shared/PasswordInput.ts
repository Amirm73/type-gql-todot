import { Field, InputType, ClassType } from "type-graphql";
import { Length } from "class-validator";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @Length(1, 255)
    password: string;
  }
  return PasswordInput;
};
