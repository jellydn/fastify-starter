import { test } from "tap";
import { build } from "../helper";

void test("default rate limit settings", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
    method: "GET",
  });

  t.equal(res.statusCode, 200, "Status code is 200");

  for (let i = 0; i < 100; i++) {
    const res = await app.inject({
      url: "/",
      method: "GET",
    });

    if (i < 99) {
      t.equal(res.statusCode, 200, "Status code is 200");
    } else {
      t.equal(res.statusCode, 429, "Status code is 429");
    }
  }
});

void test("custom rate limit settings", async (t) => {
  const app = await build(t, {
    rateLimit: {
      max: 50,
      timeWindow: "1 minute",
    },
  });

  const res = await app.inject({
    url: "/",
    method: "GET",
  });

  t.equal(res.statusCode, 200, "Status code is 200");

  for (let i = 0; i < 50; i++) {
    const res = await app.inject({
      url: "/",
      method: "GET",
    });

    if (i < 49) {
      t.equal(res.statusCode, 200, "Status code is 200");
    } else {
      t.equal(res.statusCode, 429, "Status code is 429");
    }
  }
});
