import AltairFastify from "altair-fastify-plugin";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { makeSchema, queryType, stringArg } from "nexus";

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => ({
  authorization: req.headers.authorization,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg() },
      resolve: (_parent, { name }) => `Hello ${name ?? "World"}!`,
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/typings.ts`,
  },
});

export function initGraphql(app: FastifyInstance) {
  void app.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: "/graphql",
    allowBatchedQueries: true,
    context: buildContext,
  });

  void app.register(AltairFastify, {
    path: "/altair",
    baseURL: "/altair/",
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: "/graphql",
  });

  mercuriusCodegen(app, {
    // Commonly relative to your root package.json
    targetPath: `${__dirname}/generated/graphql.ts`,
  }).catch(console.error);
}
