
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/nodejsweb",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log("connected successfully");
}).catch((error)=>{
    console.log(error);
})
