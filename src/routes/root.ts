import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, _reply) => ({ status: true }));
  fastify.get("/health/check", async (_request, _reply) => ({ status: true }));
};

export default root;
