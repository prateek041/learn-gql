const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express()
const schema = require("./schema/schema") // importing the schema
require('dotenv').config()

const port = process.env.PORT || 5000

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development"
}))

app.listen(port, console.log(`Listening to port ${port}`))