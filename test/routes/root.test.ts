import { test } from "tap";

import { build } from "../helper";

void test("default root route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
  });
  t.same(JSON.parse(res.payload), { status: true });
});
void test("/health/check route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/health/check",
  });
  t.same(JSON.parse(res.payload), { status: true });
});
