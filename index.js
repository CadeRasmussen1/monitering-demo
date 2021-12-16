// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5bb11a3b61f04080870117d95c4772d2',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const express = require('express')
const path = require('path')

let students = []

const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('./api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: 'cade', type: 'manual'})

    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`on port ${port}`))