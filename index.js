require('dotenv').config()
const server = require('./api/server.js')

const PORT = process.env.PORT || 5000

console.log(process.env.FOO)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
