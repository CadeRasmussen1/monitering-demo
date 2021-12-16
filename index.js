// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5bb11a3b61f04080870117d95c4772d2',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`on port ${port}`))