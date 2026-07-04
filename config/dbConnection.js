const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        const connect=await mongoose.connect('mongodb+srv://sahil:sahil123@sahilcluster.ifvftdf.mongodb.net/mycontacts-backend?appName=sahilcluster')
        console.log("DATBASE CONNECTED")

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports=connectDb