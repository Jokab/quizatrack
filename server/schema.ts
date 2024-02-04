import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "./prisma/pothos-types";

// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    // filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    // onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});
// defaults to false, uses /// comments from prisma schema as descriptions
// for object types, relations and exposed fields.
// descriptions can be omitted by setting description to false
//exposeDescriptions: boolean | { models: boolean, fields: boolean },

builder.prismaObject("team", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});

// builder.queryType({});
// builder.mutationType({});

builder.queryType({
  fields: (t) => ({
    // Define a field that issues an optimized prisma query
    team: t.prismaField({
      type: "team",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, root, args) =>
        prisma.team.findUnique({
          ...query,
          where: { id: Number.parseInt(String(args.id), 10) },
        }),
    }),
  }),
});

export const schema = builder.toSchema();
