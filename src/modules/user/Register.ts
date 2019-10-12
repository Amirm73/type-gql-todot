import {
  Resolver,
  Mutation,
  Arg,
  Query,
  // Authorized,
  UseMiddleware
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { sendEmail } from "../utils/sendEmail";

@Resolver(User)
export class RegisterResolver {
  // @Authorized() -->   we created @isAuth to return a custum err
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async access() {
    return "Hello from there";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    name,
    password
  }: RegisterInput): Promise<User> {
    const user = await User.create({
      email,
      name,
      password
    }).save();

    sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
