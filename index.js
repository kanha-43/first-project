const express=require("express")
const app=express()

/* const Master=require('./models/master');
const Action=require('./models/actions');
const Conditions_all=require('./models/conditions_all');
const Conditions_any=require('./models/conditions_any'); */
app.use(express.json())
const allRoutes=require("./routes/master.routes")

require('./models')

app.use('/api',allRoutes)


//Master.sync({force:true})

app.listen(4000,()=>{
    console.log("server is listening to port:4000")
})