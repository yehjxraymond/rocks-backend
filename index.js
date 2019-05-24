const fastify = require("fastify")({ logger: true });

// Hello world
fastify.get("/", async (_req, res) => {
  res.send("Hello World!");
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
