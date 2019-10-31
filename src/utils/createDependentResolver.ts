import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  UseMiddleware,
  Ctx
} from "type-graphql";
import { Middleware } from "type-graphql/interfaces/Middleware";
import { createQueryBuilder } from "typeorm";
import { MyContext } from "../types/MyContext";

export function createDependentResolver<
  T extends ClassType,
  X extends ClassType,
  D extends ClassType
>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  depType: D,
  depField: string,
  depId?: string,
  ctxId?: string,
  middleware?: Middleware<any>[]
) {
  @Resolver({ isAbstract: true })
  abstract class DependentBaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(
      @Ctx() ctx: MyContext,
      @Arg("data", () => inputType) data: any
    ) {
      if (!depId && ctxId) depId = ctx.req.session![ctxId];
      entity.create(data).save();
      await createQueryBuilder()
        .relation(depType, depField)
        .of(depId)
        .add(entity);

      return entity;
    }
  }

  return DependentBaseResolver;
}
