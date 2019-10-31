import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";

export function createSingleResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver({ isAbstract: true })
  abstract class SingleResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any) {
      entity.create(data).save();
      return entity;
    }
  }

  return SingleResolver;
}

// if (functions) functions.forEach(func => func());
// functions: (email: string, url: string)=> Promise<void>,
