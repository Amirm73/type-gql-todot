import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { MyContext } from "src/types/MyContext";
import { createQueryBuilder } from "typeorm";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await createQueryBuilder()
      .select("user")
      .addSelect("user.password")
      .from(User, "user")
      .where({ email })
      .getOne();

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    if (!user.confirmed) return null;

    ctx.req.session!.userId = user.id;
    return user;
  }
}
