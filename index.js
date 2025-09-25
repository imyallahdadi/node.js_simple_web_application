const express = require('express')
const sequelize = require('./database/sequelize-connect')
const user = require('./models/user.model')
const authroute = require('./routes/auth.route')
const userroute = require('./routes/user.route')
const path = require('path')
const cookieParser = require('cookie-parser')


const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
  res.send({"message": "Welcome"});
})

app.use('/auth', authroute)
app.use('/user', userroute)


app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Example app listening on port ${port}`)
})

