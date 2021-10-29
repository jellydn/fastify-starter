import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { queryType, stringArg, makeSchema } from "nexus";

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => ({
  authorization: req.headers.authorization,
});

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

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
    graphiql: true,
    allowBatchedQueries: true,
    context: buildContext,
  });

  mercuriusCodegen(app, {
    // Commonly relative to your root package.json
    targetPath: `${__dirname}/generated/graphql.ts`,
  }).catch(console.error);
}
