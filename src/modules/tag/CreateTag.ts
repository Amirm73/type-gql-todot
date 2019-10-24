import { createSingleResolver } from "../../utils/createSingleResolver";
import { Tag } from "../../entity/Tag";
import { CreateTagInput } from "./input/CreateTagInput";

export const CreateTagResolver = createSingleResolver(
  "Tag",
  Tag,
  CreateTagInput,
  Tag
);

// import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
// import { Tag } from "../../entity/Tag";
// import { isAuth } from "../middleware/isAuth";
// import { TagInput } from "./input/CreateTagInput";
//
// @Resolver(() => Tag)
// export class CreateTagResolver {
// @UseMiddleware(isAuth)
// @Mutation(() => Tag)
// async createTag(@Arg("data") { desc }: TagInput): Promise<Tag> {
// return await Tag.create({
// desc
// }).save();
// }
// }
