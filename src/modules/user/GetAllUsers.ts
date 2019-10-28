import { Resolver, Query, UseMiddleware, Info } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { getRepository } from "typeorm";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";

@Resolver(User)
export class GetAllUsersResolver {
  @UseMiddleware(isAuth)
  @Query(() => [User], { nullable: true })
  async getAllUsers(
    @Info() info: GraphQLResolveInfo
  ): Promise<User[] | undefined> {
    const fields = graphqlFields(info);
    const selection = Object.keys(fields).map(field => "user." + field);
    console.log(selection);
    const users = await getRepository(User)
      .createQueryBuilder("user")
      .select(selection)
      .getMany();
    return users;
  }
}

// return await getRepository(User)
//   .createQueryBuilder()
//   .select(["user.id", "user.email"])
//   .getMany();

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
