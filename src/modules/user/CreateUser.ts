import { User } from "../../entity/User";
import { RegisterUserInput } from "./register/RegisterUserInput";
import { createBaseResolver } from "../../utils/createBaseResolver";

export const CreateUserResolver = createBaseResolver(
  "User",
  User,
  RegisterUserInput,
  User
);
// @Resolver()
// export class CreateUserResolver extends BaseCreateUser {
//     sendEmail(email, await createConfirmationUrl(user.id));
// }
