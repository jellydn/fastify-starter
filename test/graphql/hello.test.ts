import { createMercuriusTestClient } from "mercurius-integration-testing";
import { test } from "tap";

import { app } from "../../src/server";

void test("hello query without name argument", async (t) => {
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

void test("hello query with name argument", async (t) => {
  t.plan(1);

  const client = createMercuriusTestClient(app);

  const response = await client.query(
    `query {
    hello(name: "Test")
   }`
  );

  t.same(response, {
    data: {
      hello: "Hello Test!",
    },
  });
});
