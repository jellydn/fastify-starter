import { test } from "tap";
import { createMercuriusTestClient } from "mercurius-integration-testing";

import { build } from "../../helper";

void test("user login - success", async (t) => {
  const app = await build(t);

  const client = createMercuriusTestClient(app);

  const response = await client.mutate(
    `mutation {
      login(username: "admin", password: "admin") {
        token
      }
    }`
  );

  t.same(response, {
    data: {
      login: {
        token: "jwt-token",
      },
    },
  });
});

void test("user login - failure", async (t) => {
  const app = await build(t);

  const client = createMercuriusTestClient(app);

  const response = await client.mutate(
    `mutation {
      login(username: "wrong", password: "wrong") {
        token
      }
    }`
  );

  t.same(response.errors[0].message, "Invalid credentials");
});
