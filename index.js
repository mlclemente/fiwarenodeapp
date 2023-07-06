const express = require('express')
const app = express()
const subscriptionsRouter = require('./routes/subscriptions')
const personeRouter = require('./routes/persone')
const prodottiRouter = require('./routes/prodotti')
const airqualityRouter = require('./routes/airquality')
const bodyParser = require('body-parser')



app.use(express.json())


// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/*+json'}));


// if urlencoded has extended set to false, 
// "nested object" are not allowed
//app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({extended:true}))
// form method="post" action="/api/persone"*/
app.use('/api/subscriptions',subscriptionsRouter)
app.use('/api/persone',personeRouter)
app.use('/api/prodotti',prodottiRouter)
app.use('/api/airquality',airqualityRouter)



app.listen(3300)
