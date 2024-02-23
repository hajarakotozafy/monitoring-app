const { createServer } = require('node:http')
const { createYoga } = require('graphql-yoga')
const fakeData = require('./src/utils/fakeData')
const db = require("./src/models")
const { Schema } = require('./src/schema/schema.js')

db.sequelize.sync()
.then(() => {
  console.log("Database synced...")
}).catch((err) => {
  console.log("Failed to sync database: " + err.message)
})

const yoga = createYoga({
  cors:{
    credentials: true
  },
  schema: Schema, context: { ...fakeData, db }});

const app = createServer(yoga);

const PORT = 4000

app.listen(`${PORT || 4000}`, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})