import type { FastifyStaticOptions } from "@fastify/static";
import fastifyStatic from "@fastify/static";
import fp from "fastify-plugin";
import path from "path";

const opts = {
  root: path.join(__dirname, "../../public"),
  prefix: "/public/", // Optional: default '/'
};

/**
 * @fastify/static serving static file as fast as possible
 *
 * @see https://github.com/fastify/fastify-static
 */
export default fp<FastifyStaticOptions>(
  async (fastify) => {
    void fastify.register(fastifyStatic, {
      ...opts,
    });
  },
);
