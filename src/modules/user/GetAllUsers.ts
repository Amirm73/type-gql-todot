import { Resolver, Query, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { getRepository } from "typeorm";

@Resolver(User)
export class GetAllUsersResolver {
  @UseMiddleware(isAuth)
  @Query(() => [User], { nullable: true })
  async getAllUsers(): Promise<User[] | undefined> {
    // console.log("log");
    // const users = User.find();
    // console.log(users);
    // return users;

    return await getRepository(User)
      .createQueryBuilder()
      .select(["user.id", "user.email"])
      .getMany();
  }
}

//  const posts = await connection.createQueryBuilder(Post, "post")
//             .select("post.id")
//             .addSelect("category.name")
//             .leftJoinAndSelect("post.category", "category")
//             .getMany();

// .addSelect("category.name")'
// is not easier use:
// .select([ "category.name", "post.id" ])
