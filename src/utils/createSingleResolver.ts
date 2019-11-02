import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";
import { sendEmail } from "../test-utils/utils/sendEmail";
import { createConfirmationUrl } from "../test-utils/utils/createConfirmationUrl";

export function createSingleResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  confirmEmail?: boolean,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class SingleResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any) {
      const ent = await entity.create(data).save();
      console.log(ent);
      if (confirmEmail) {
        sendEmail(ent.email, await createConfirmationUrl(ent.id));
      }
      return ent;
    }
  }

  return SingleResolver;
}
