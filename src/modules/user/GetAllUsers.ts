import { Resolver, Query, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class GetAllUsersResolver {
  @UseMiddleware(isAuth)
  @Query(() => [User], { nullable: true })
  async getAllUsers(): Promise<User[] | undefined | any> {
    const users = User.find();
    return users;
  }
}

// return await getRepository(User)
//   .createQueryBuilder()
//   .select(["user.id", "user.email"])
//   .getMany();

// const users = await getConnection()
// .getRepository(User)
// .createQueryBuilder()
// .select("user.Id", "id")
// .addSelect("user.password")
// .getMany();
// console.log(users);
// console.log(data["operation"]["selectionSet"]["selections"]);

// const d = data["operation"];
// const set = d.selectionSet["selections"];
// const set = data["operation"]["selectionSet"]["selections"]["selectionSet"];
// const sets = data["operation"]["selectionSet"]["selections"];
// console.log(sets);

// return users;
//  const posts = await connection.createQueryBuilder(Post, "post")
//             .select("post.id")
//             .addSelect("category.name")
//             .leftJoinAndSelect("post.category", "category")
//             .getMany();

// .addSelect("category.name")'
// is not easier use:
// .select([ "category.name", "post.id" ])
