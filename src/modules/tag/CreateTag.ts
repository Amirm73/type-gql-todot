import { createSingleResolver } from "../../utils/createSingleResolver";
import { Tag } from "../../entity/Tag";
import { CreateTagInput } from "./input/CreateTagInput";

export const CreateTagResolver = createSingleResolver(
  "Tag",
  Tag,
  CreateTagInput,
  Tag
);
