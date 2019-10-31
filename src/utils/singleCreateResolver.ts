import { ClassType, Resolver, Mutation, Arg } from "type-graphql";
import { RegisterUserInput } from "../modules/user/register/RegisterUserInput";
import { User } from "../entity/User";

function singleCreateResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class singleResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }
  return singleResolver;
}

export const CreateUser = singleCreateResolver(
  "User",
  User,
  RegisterUserInput,
  User
);
