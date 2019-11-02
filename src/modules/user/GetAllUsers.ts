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
