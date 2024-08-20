const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const express = require('express');
const cors = require('cors')
const { ErrorOutline } = require("@mui/icons-material");
mongoose.set('strictQuery',false)
dbConfig=require('./database/db')



mongoose.promise=global.Promise;
mongoose.connect(dbConfig.db,{
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(()=>{
    console.log('database successfully connected')
},
  error=>{
    console.log('database should not be connected'+ error)
  })


  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(cors())
  app.use(express.static(__dirname))


  const port = process.env.PORT || 4004
  const server = app.listen(port, ()=>{
    console.log('connected to port' + port )
  })

//   app.use((req,res,next)=>{
//     setImmediate(()=>{
//         next(new Error('something went wrong'))
//     })
//   })

  app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
  })


  const user = require("./routes/userRoute")
  app.use('/',user)