const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.listen(PORT,()=>console.log(`listening to port ${PORT}`));

mongoose.connect("mongodb+srv://user:13841384@cluster0.zmxjift.mongodb.net/db2").then(()=>console.log("connected to DB"));

const dataSchema = new mongoose.Schema({
    id:{type:Number,default:1},
    data : {type:String,default:'0'.repeat(10000)}
})
const database = mongoose.model("checkbox",dataSchema);


//add(number)
app.get("/add/:id",async(req,res)=>{
    const number = Number(req.params.id);
    const data = await database.findOne({"id":1});
    let d = data.data.split('');
    d[number]=='0'?d[number]='1':d[number]='0';
    data.data= d.join('');
    await data.save();
    res.send("ok");
})

app.get('/get',async(req,res)=>{
    const data = await database.findOne({"id":1});
    res.send(data.data);
})

