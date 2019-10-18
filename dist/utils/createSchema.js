"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const ChangePassword_1 = require("../modules/user/ChangePassword");
const Me_1 = require("../modules/user/Me");
const ConfirmUser_1 = require("../modules/user/ConfirmUser");
const ForgotPassword_1 = require("../modules/user/ForgotPassword");
const Login_1 = require("../modules/user/Login");
const Logout_1 = require("../modules/user/Logout");
const RegisterUser_1 = require("../modules/user/RegisterUser");
const CreateUser_1 = require("../modules/user/CreateUser");
const ProfilePicture_1 = require("../modules/user/ProfilePicture");
const GetTodo_1 = require("../modules/todo/GetTodo");
const GetAllTodos_1 = require("../modules/todo/GetAllTodos");
const UpdateTodo_1 = require("../modules/todo/UpdateTodo");
exports.createSchema = () => type_graphql_1.buildSchema({
    resolvers: [
        ChangePassword_1.ChangePasswordResolver,
        ConfirmUser_1.ConfirmUserResolver,
        Me_1.MeResolver,
        ForgotPassword_1.ForgotPasswordResolver,
        Login_1.LoginResolver,
        Logout_1.LogoutResolver,
        RegisterUser_1.RegisterUserResolver,
        CreateUser_1.CreateUserResolver,
        ProfilePicture_1.PictrureUoloadResolver,
        GetTodo_1.GetTodoResolver,
        GetAllTodos_1.GetAllTodosResolver,
        UpdateTodo_1.UpdateTodoResolver
    ],
    authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
    }
});
//# sourceMappingURL=createSchema.js.map