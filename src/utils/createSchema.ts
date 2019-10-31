import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { MeResolver } from "../modules/user/Me";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { RegisterUserResolver } from "../modules/user/RegisterUser";
import { CreateUserResolver } from "../modules/user/CreateUser";
import { PictrureUoloadResolver } from "../modules/user/ProfilePicture";
import { GetAllTodosResolver } from "../modules/todo/GetAllTodos";
import { UpdateTodoResolver } from "../modules/todo/UpdateTodo";
import { RegisterTodoResolver } from "../modules/todo/RegisterTodo";
import { GetTodoResolver } from "../modules/todo/GetTodo";
import { DeleteTodoResolver } from "../modules/todo/DeleteTodo";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      MeResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      RegisterUserResolver,
      CreateUserResolver,
      PictrureUoloadResolver,
      GetAllTodosResolver,
      UpdateTodoResolver,
      RegisterTodoResolver,
      UpdateTodoResolver,
      GetAllTodosResolver,
      GetTodoResolver,
      DeleteTodoResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
