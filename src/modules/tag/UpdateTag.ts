import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Tag } from "../../entity/Tag";
import { UpdateTagInput } from "./input/UpdateTagInput";

@Resolver(Tag)
export class UpdateTagResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Tag, { nullable: true })
  async updateTag(@Arg("data")
  {
    desc,
    tagId
  }: UpdateTagInput): Promise<Tag | undefined> {
    await getConnection()
      .createQueryBuilder()
      .update(Tag)
      .set({ desc })
      .where("id = :tagId", { tagId })
      .execute();

    return Tag.findOne(tagId);
  }
}
