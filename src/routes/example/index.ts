import type { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * tags:
   *   name: Example
   *   description: Hello world end point
   */

  /**
   * @swagger
   * /example:
   *   get:
   *     tags: [Example]
   *     description: Returns the hello world
   *     responses:
   *       200:
   *         description: hello world
   */
  fastify.get("/", async (_request, reply) => {
    void reply.send({ hello: "world" });
  });
};

export default example;
