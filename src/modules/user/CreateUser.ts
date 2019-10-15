import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  UseMiddleware
} from "type-graphql";
import { User } from "../../entity/User";
import { Todo } from "../../entity/Todo";
import { RegisterInput } from "./register/RegisterInput";
import { Middleware } from "type-graphql/interfaces/Middleware";

function createBaseResolver<T extends ClassType, X extends ClassType>(
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

@InputType()
class TodoInput {
  @Field()
  name: string;

  @Field()
  status: string;
}

export const CreateUserResolver = createBaseResolver(
  "User",
  User,
  RegisterInput,
  User
);
export const CreateTodoResolver = createBaseResolver(
  "Todo",
  Todo,
  TodoInput,
  Todo
);

// @Resolver()
// export class CreateUserResolver extends BaseCreateUser {}

// @Resolver()
// export class CreateTodoResolver extends BaseCreateTodo {}
