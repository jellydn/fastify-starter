import AltairFastify from "altair-fastify-plugin";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { makeSchema, queryType, stringArg, objectType, idArg, inputObjectType, mutationType } from "nexus";

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => ({
  authorization: req.headers.authorization,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
  },
});

const userInput = inputObjectType({
  name: "UserInput",
  definition(t) {
    t.nonNull.string("name");
  },
});

const query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg() },
      resolve: (_parent, { name }) => `Hello ${name ?? "World"}!`,
    });

    t.field("user", {
      type: "User",
      args: { id: idArg() },
      resolve: (_parent, { id }) => {
        // TODO: Implement user fetching logic
        return null;
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: { input: "UserInput" },
      resolve: (_parent, { input }) => {
        // TODO: Implement user creation logic
        return null;
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, User, UserInput],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/typings.ts`,
  },
});

export async function initGraphql(app: FastifyInstance) {
  try {
    await app.register(mercurius, {
      schema,
      graphiql: false,
      ide: false,
      path: "/graphql",
      allowBatchedQueries: true,
      context: buildContext,
    });

    await app.register(AltairFastify, {
      path: "/altair",
      baseUrl: "/altair/",
      // 'endpointUrl' should be the same as the mercurius 'path'
      endpointUrl: "/graphql",
    });

    await mercuriusCodegen(app, {
      // Commonly relative to your root package.json
      targetPath: `${__dirname}/generated/graphql.ts`,
    });
  } catch (err: unknown) {
    app.log.error(err);
  }
}
