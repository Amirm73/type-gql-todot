import { Connection } from "typeorm";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../utils/gCall";
import faker from "faker";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
  mutation {
  register(
    data: {
      name: "ddodooood"
      password: "afbdcsdgfdg"
      email: "amir8@amir.com"
    }
  ) {
    name
    email
    password
  }
}

`;

describe("Register", () => {
  it("createUser", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          user
        }
      }
    });

    await expect(response).toMatchObject({
      data: {
        register: {
          name: user.name,
          email: user.email
        }
      }
    });
  });
});
