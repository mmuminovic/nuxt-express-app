const express = require('express')
const cors = require('cors')
const app = express()

const cookieParser = require('cookie-parser')
const userRotues = require('./routes/users')
const itemRoutes = require('./routes/items')
const sequelize = require('./database')

app.use(cookieParser())

sequelize.sync()

app.use(cors({ origin: '*' }))

app.use(express.json())

app.use('/items', itemRoutes)
app.use(userRotues)

app.use((req, res) => {
  return res.status(404).json({ message: 'Not Found' })
})

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
