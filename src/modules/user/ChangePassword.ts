import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import * as bcrypt from "bcryptjs";
import { redis } from "../../redis";
// import bcrypt from "bcryptjs";

import { forgotPasswordPrefix } from "../constants/redisPrefixies";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;
    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    ctx.req.session!.userId = user.id; //login user again with new pass

    return user;
  }
}
