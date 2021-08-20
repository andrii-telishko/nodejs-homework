const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const api = require('./routes/api/contacts')

const app = express()

app.use(cors())
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use('/api/contacts', api.router)

app.listen(4000)
