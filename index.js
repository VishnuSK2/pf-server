// load env file contents into process.env by  default
require('dotenv').config()

const express =require('express')
const cors =require('cors')
const router=require('./Router/router')


const pfServer =express()
require('./DB/connection')

pfServer.use(cors())
pfServer.use(express.json())

pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT= 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer started running at ${PORT}`);
    
})

pfServer.get('/',(req, res)=>{
    res.send(
        '<h3>Project applicaction start running and waiting for the client request...</h3>'
    )
})