const express = require("express");
const router = require("./src/routers/router");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
require("./src/db/mongoDb");
const schema = require("./src/graphql/schema");
const app = express();
app.use(cors());
var PORT = 4000;
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use(express.json());
app.use(router);
//run project on the server
app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
