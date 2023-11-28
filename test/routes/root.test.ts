import { test } from "tap";

import { build } from "../helper";

void test("default root route - GET", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/",
  });
  t.same(JSON.parse(res.payload), { status: true });
});

void test("default root route - POST", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/",
    payload: { data: "test" },
  });
  t.same(JSON.parse(res.payload), { status: true });
});

void test("default root route - invalid method", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "PUT",
    url: "/",
  });
  t.equal(res.statusCode, 405);
});
void test("default root route - missing required query parameter", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/?missingParam=value",
  });
  t.equal(res.statusCode, 400);
});

void test("default root route - invalid query parameter value", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/?param=invalidValue",
  });
  t.equal(res.statusCode, 400);
});

void test("default root route - middleware", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/",
    headers: {
      "X-Custom-Header": "invalid",
    },
  });
  t.equal(res.statusCode, 400);
});
