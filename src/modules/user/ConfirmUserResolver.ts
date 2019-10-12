import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";

@Resolver(User)
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<Boolean> {
    const userId = await redis.get(token);
    if (!userId) return false;

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
