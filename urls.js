const express = require("express");
const shortid = require("shortid");

const router = express.Router();

const {urls} = require("./urlData");

router.get('/',(req,res)=>{
    const urlList = [];
    Object.keys(urls).forEach((id)=>{
        urlList.push({id,longUrl:urls[id]});
    })
    res.status(200).send(urlList);
})

router.post("/",(req,res)=>{
    const id = shortid.generate();
    urls[id] = req.body.longUrl;
    res.status(201).send({id});
})

router.get("/:id",(req,res)=>{
    const id = req.params.id;
    const longUrl = urls[id];
    if(longUrl){
        res.status(200).send({id,longUrl});
    } else {
        res.status(404).send("Invalid short url id");
    }
})


module.exports = router;