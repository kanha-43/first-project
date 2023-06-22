const express=require("express")
const app=express()
const cors=require("cors");
/* const Master=require('./models/master');
const Action=require('./models/actions');
const Conditions_all=require('./models/conditions_all');
const Conditions_any=require('./models/conditions_any'); */
app.use(express.urlencoded({limit: '10mb'}))
app.use(express.json({limit: '10mb'}))
app.use(cors())

const allRoutes=require("./routes/master.routes")


require('./models')

app.use('/api',allRoutes)

//Master.sync({force:true})
const port=4000
app.listen(port,()=>{
    console.log("server is listening to port:",port)
})