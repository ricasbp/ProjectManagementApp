var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;

router.get('/', async function(req, res){
    try{
        await db.dropDatabase()
        res.status(200).json({message: "Database dropped"})
    }catch(err){
        res.status(400).json({message: err.message})
    }


    db.collection("users").insertOne({
        name: "admin", 
        senha: "admin", 
        admin: true});
});



module.exports = router;