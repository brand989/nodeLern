import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import MessageRouter from './src/routes/messages.mjs'
import AuthRouter from './src/routes/auth.mjs'
import { verifyToken } from './src/middlewares/tokenVerify.mjs'


import "dotenv/config"

let port = process.env.PORT || 5000
const URI = process.env.MONGODB_URI

mongoose.connect(URI).then(() => {
    console.log('ok mongo')
  }).catch(error => console.log(error));


const app = express() 

app.use(bodyParser.json())



app.get('/status', (req, res) => res.send('OK'))

app.get("/profile", verifyToken, (req, res) => {
  res.send('Im secured')
});


app.listen(port, () => console.log(`Server has been started to http://localhost:${port}`))


app.use('/messages', MessageRouter)
app.use("/", AuthRouter);