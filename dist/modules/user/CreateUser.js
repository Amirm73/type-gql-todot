"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const RegisterUserInput_1 = require("./register/RegisterUserInput");
const createBaseResolver_1 = require("../../utils/createBaseResolver");
exports.CreateUserResolver = createBaseResolver_1.createBaseResolver("User", User_1.User, RegisterUserInput_1.RegisterUserInput, User_1.User);
//# sourceMappingURL=CreateUser.js.map