import { test } from "tap";
import { build } from "../helper";

void test("example is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/example",
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), { hello: "world" });
});

void test("example route - invalid method", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "PUT",
    url: "/example",
  });

  t.equal(res.statusCode, 405);
});

void test("example route - missing required query parameter", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/example?missingParam=value",
  });

  t.equal(res.statusCode, 400);
});

void test("example route - invalid query parameter value", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/example?param=invalidValue",
  });

  t.equal(res.statusCode, 400);
});

void test("example route - middleware", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/example",
    headers: {
      "X-Custom-Header": "invalid",
    },
  });

  t.equal(res.statusCode, 400);
});
