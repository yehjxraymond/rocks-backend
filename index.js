const fastify = require("fastify")({ logger: true });
const axios = require("axios");
const loki = require("lokijs");

let db;
let rockDb;

const rocksCollectionName = "rocks";

// Initialise rockDb
const databaseInitialize = () => {
  rockDb = db.getCollection(rocksCollectionName);
  if (rockDb === null) {
    rockDb = db.addCollection(rocksCollectionName);
  }
};

// Create a new loki db
db = new loki("data.json", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

// List all rocks
fastify.get("/rock", async (_req, res) => {
  const rocks = rockDb.find();
  res.send(rocks);
});

// Query a rock
fastify.get("/rock/:id", async ({ params }, res) => {
  const rock = rockDb.get(i);
  res.send(rock);
});

// Create a rock
fastify.post("/rock", async ({ body }, res) => {
  const randomJoke = await axios({
    method: "get",
    headers: {
      Accept: "application/json"
    },
    url: "https://icanhazdadjoke.com/"
  });
  const rock = { ...body, engraving: randomJoke.data.joke };
  const insertedRock = rockDb.insert(rock);
  res.send(insertedRock);
});

fastify.get("/", async (_req, res) => {
  res.send("Hello World!");
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
