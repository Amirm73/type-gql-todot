import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    name,
    password
  }: RegisterInput): Promise<User> {
    const user = User.create({
      email,
      name,
      password
    }).save();
    return user;
  }
}
