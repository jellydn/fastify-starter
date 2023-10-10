import { test } from "tap";
import { build } from "../helper";

void test("etag plugin", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
  });
  t.ok(res.headers.etag, "Etag header is present");
});

void test("etag plugin with weak option set to false", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
  });

  t.ok(
    res.headers.etag && !res.headers.etag.startsWith("W/"),
    "Etag is not weak",
  );
});
