import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "../../../entity/User";
import { IsEmailAlreadyExist } from "./guards/isEmailAlreadyExist";

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
  @IsEmailAlreadyExist({ message: "The email is already in use!" })
  email: string;
}
