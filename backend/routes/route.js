require("dotenv").config()
const express=require("express")
const router = express.Router()
const {getClient} = require('../database/dbConnection')
const { ObjectId } = require('mongodb')
const getCollection=()=>{
    let client = getClient()
    const collection = client.db('redux_tool_kit').collection('query')
    return collection;
}

//Trigger-Reminder

const triggerReminder = require('../utils/trigger_reminder');
router.get('/todos/trigger', triggerReminder);

//GET /todo
router.get('/todos',async (req,res)=>{
    try{
        const collection = getCollection()
        const todos = await collection.find().toArray()
        res.json(todos)
    }catch (error){
        console.error(error.message);
        res.json({error:'Internal Server Error'})        
    }
})

//POST /todo
router.post('/todos',async (req,res)=>{
    try{
        const collection = getCollection();
        await collection.insertOne(req.body);
        res.json(req.body);
    }catch (error){
        console.error(error.message);
        res.json({error:'Internal Server Error'})        
    }
})

//PUT /todo/:id
router.put('/todos/:id', async (req,res)=>{
    try{
        const collection = getCollection();
        const {_id,...updatedFields } = req.body;
        const result = await collection.updateOne({_id:new ObjectId(req.params.id)},{$set:updatedFields});
        res.json(result);
    }catch (error){
        console.error(error.message);
        res.json({error:'Internal Server Error'})        
    }
})

//DELETE /todo/:id
router.delete('/todos/:id',async (req,res) =>{
    try{
        const collection = getCollection();       
        await collection.deleteOne({_id:new ObjectId(req.params.id)})
        res.json("ho gaya kaam")
    }catch (error){
        console.error(error.message);
        res.json({error:'Internal Server Error'})        
    }
})

module.exports=router