"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testConn_1 = require("../../../test-utils/testConn");
const gCall_1 = require("../../../utils/gCall");
const faker_1 = __importDefault(require("faker"));
let conn;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    conn = yield testConn_1.testConn(true);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield conn.close();
}));
const registerMutation = `
  mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    name
    email
    password
  }
}

`;
describe("Register", () => {
    it("createUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: faker_1.default.name.firstName(),
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password()
        };
        const response = yield gCall_1.gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        });
        expect(response).toMatchObject({
            data: {
                register: {
                    name: user.name,
                    email: user.email
                }
            }
        });
    }));
});
//# sourceMappingURL=Register.test.js.map