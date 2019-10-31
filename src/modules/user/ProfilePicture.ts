import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Uplaod } from "../../types/Upload";
import { createWriteStream } from "fs";

@Resolver()
export class PictrureUoloadResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg("picture", () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: Uplaod): Promise<boolean> {
    return new Promise((resolve, rejects) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `../../../images/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => rejects(false))
    );
  }
}
