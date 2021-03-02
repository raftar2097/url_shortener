const express = require("express");
const api = require("./api");
const app = express();
const port = process.env.PORT || 3000;
const {urls} = require("./urlData");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use("/api",api);

app.get("/:id",(req,res)=>{
    const response =  urls[req.params.id];
    if(response){
        res.redirect(response);
    }
    else{
        res.status(404).send("Invalid url");
    }
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})