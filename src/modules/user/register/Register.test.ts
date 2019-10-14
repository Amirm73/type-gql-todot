import { Connection } from "typeorm";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../utils/gCall";

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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            name: "amir",
            email: "amiro@amir.com",
            password: "amiro"
          }
        }
      })
    );
  });
});
