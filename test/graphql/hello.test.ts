import { createMercuriusTestClient } from "mercurius-integration-testing";
import { test } from "tap";

import { app } from "../../src/server";

void test("hello query", async (t) => {
  t.plan(1);

  const client = createMercuriusTestClient(app);

  const response = await client.query(
    `query {
    hello
   }`,
  );

  t.same(response, {
    data: {
      hello: "Hello World!",
    },
  });
});
void test("user query", async (t) => {
  t.plan(4);

  const client = createMercuriusTestClient(app);

  // Simulate fetching a user by ID from a data source
  const response = await client.query(
    `query {
    user(id: "1") {
      id
      name
    }
   }`,
  );

  t.same(response, {
    data: {
      user: {
        id: "1",
        name: "John Doe",
      },
    },
  });

  // Test for invalid ID
  const invalidIdResponse = await client.query(
    `query {
    user(id: "invalid") {
      id
      name
    }
   }`,
  );

  t.same(invalidIdResponse, {
    errors: [
      {
        message: "Invalid ID",
      },
    ],
  });

  // Test for nonexistent ID
  const nonexistentIdResponse = await client.query(
    `query {
    user(id: "nonexistent") {
      id
      name
    }
   }`,
  );

  t.same(nonexistentIdResponse, {
    data: {
      user: null,
    },
  });
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
   }`,
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

  // Test for missing required input fields
  const missingFieldsResponse = await client.mutate(
    `mutation {
    createUser(input: {}) {
      id
      name
    }
   }`,
  );

  t.same(missingFieldsResponse, {
    errors: [
      {
        message: "Missing required input fields",
      },
    ],
  });

  // Test for invalid input fields
  const invalidFieldsResponse = await client.mutate(
    `mutation {
    createUser(input: {name: 123}) {
      id
      name
    }
   }`,
  );

  t.same(invalidFieldsResponse, {
    errors: [
      {
        message: "Invalid input fields",
      },
    ],
  });
});
