import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({
  schema,
  logging: "debug",
});

const server = createServer(yoga);

const port = 3001;

server.listen(port);
