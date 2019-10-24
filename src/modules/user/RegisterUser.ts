import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterUserInput } from "./register/RegisterUserInput";
import { sendEmail } from "../../test-utils/utils/sendEmail";
import { createConfirmationUrl } from "../../test-utils/utils/createConfirmationUrl";

@Resolver(User)
export class RegisterUserResolver {
  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    name,
    password
  }: RegisterUserInput): Promise<User> {
    const user = await User.create({
      email,
      name,
      password
    }).save();

    sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
