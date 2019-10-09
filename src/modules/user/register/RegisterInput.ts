import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "../../../entity/User";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(1, 255)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
