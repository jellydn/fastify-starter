import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";

import LoginBody from "../../schemas/login_body.json";
import type { LoginBodySchema } from "../../types/login_body";

const UserToken = Type.Object({
  token: Type.String(),
});
type UserTokenType = Static<typeof UserToken>;

const user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  // Refer https://swagger.io/docs/specification/describing-request-body/
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management and login
   */

  /**
   * @swagger
   * /user/login:
   *   post:
   *     tags: [Users]
   *     requestBody:
   *        description: Login to the application
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              username:
   *               type: string
   *              password:
   *               type: string
   *             required:
   *             - username
   *             - password
   *     responses:
   *       200:
   *         description: login success with token
   */
  fastify.post<{
    Body: LoginBodySchema;
    Reply: UserTokenType;
  }>(
    "/login",
    {
      schema: {
        body: LoginBody,
      },
    },
    async (request, reply) => {
      if (
        request.body.username === "admin" &&
        request.body.password === "admin"
      ) {
        void reply.send({
          token: "jwt-token",
        });
      } else {
        // Throw error
        throw new Error("Invalid credentials");
      }
    }
  );
};

export default user;
