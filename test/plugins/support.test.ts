import Fastify from "fastify";
import { test } from "tap";

import Support from "../../src/plugins/support";

void test("support works standalone", async (t) => {
  // eslint-disable-next-line new-cap
  const fastify = Fastify();
  void fastify.register(Support);
  await fastify.ready();

  t.equal(fastify.someSupport(), "hugs");
});
