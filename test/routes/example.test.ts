import { test } from "tap";

import { build } from "../helper";

void test("example is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/example",
  });

  t.equal(res.payload, '{"hello":"world"}');
});
void test("route not found", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/not-found",
  });

  t.equal(res.statusCode, 404);
});
