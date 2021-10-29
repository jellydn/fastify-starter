import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, reply) => {
    void reply.send({ hello: "world" });
  });
};

export default example;
