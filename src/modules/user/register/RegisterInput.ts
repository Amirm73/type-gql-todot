import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { IsEmailAlreadyExist } from "./guards/isEmailAlreadyExist";
// import { PasswordInput } from "src/modules/shared/PasswordInput";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
// export class RegisterInput implements Partial<User> {
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "The email is already in use!" })
  email: string;
}
