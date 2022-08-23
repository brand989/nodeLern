import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import MessageRouter from './routes/messages.mjs'




let port = process.env.PORT || 5000
const URI = 'mongodb://localhost:27017/testbase'

mongoose.connect(URI).then(() => {
    console.log('ok mongo')
  }).catch(error => console.log(error));


const app = express() 

app.use(bodyParser.json())



app.get('/status', (req, res) => res.send('OK'))


app.listen(port, () => console.log(`Server has been started to http://localhost:${port}`))


app.use('/messages', MessageRouter)