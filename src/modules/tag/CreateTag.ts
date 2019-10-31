import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { Tag } from "../../entity/Tag";
import { isAuth } from "../middleware/isAuth";
import { TagInput } from "./input/CreateTagInput";

@Resolver(() => Tag)
export class CreateTagResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Tag)
  async createTag(@Arg("data") { desc }: TagInput): Promise<Tag> {
    return await Tag.create({
      desc
    }).save();
  }
}
