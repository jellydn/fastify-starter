import { createMercuriusTestClient } from "mercurius-integration-testing";
import { test } from "tap";

import { app } from "../../src/server";

void test("hello query", async (t) => {
  t.plan(1);

  const client = createMercuriusTestClient(app);

  const response = await client.query(
    `query {
    hello
   }`
  );

  t.same(response, {
    data: {
      hello: "Hello World!",
    },
  });
});
void test("user query", async (t) => {
  t.plan(2);

  const client = createMercuriusTestClient(app);

  const response = await client.query(
    `query {
    user(id: "1") {
      id
      name
    }
   }`
  );

  t.same(response, {
    data: {
      user: {
        id: "1",
        name: "John Doe",
      },
    },
  });

  const errorResponse = await client.query(
    `query {
    user(id: "nonexistent") {
      id
      name
    }
   }`
  );

  t.ok(errorResponse.errors);
});

void test("createUser mutation", async (t) => {
  t.plan(1);

  const client = createMercuriusTestClient(app);

  const response = await client.mutate(
    `mutation {
    createUser(input: {name: "Jane Doe"}) {
      id
      name
    }
   }`
  );

  t.same(response, {
    data: {
      createUser: {
        id: "2",
        name: "Jane Doe",
      },
    },
  });
});
