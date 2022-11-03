import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", (_req, reply) => {
    void reply.sendFile("index.html"); // Serving path.join(__dirname, 'public', 'myHtml.html') directly
  });

  fastify.get("/status", async (_request, _reply) => ({ status: true }));
  fastify.get("/health/check", async (_request, _reply) => ({ status: true }));
};

export default root;
