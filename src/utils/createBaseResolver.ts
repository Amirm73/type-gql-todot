import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";

export function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any) {
      return entity.cerate(data).save();
    }
  }

  return BaseResolver;
}
