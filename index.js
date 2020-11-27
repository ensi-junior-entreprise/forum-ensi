const express = require('express') 
const bodyParser = require('body-parser')
const mongoose = require("./db/config")
const fs = require('fs')
const cors = require('cors')
const multer = require('multer')
const config = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'./CV')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.nom + '-' + file.originalname);
  }  
  
})
const upload = multer({storage: config})
const User = require('./models/register')
const app = express()

app.use(cors())
app.get('/',(req,res)=>{
  res.status(200).send('hello world')
})
app.post('/add',upload.single('file'), (req, res) => {
  let data = req.body
  User.findOne({email: data.email})
    .then((mail_test)=>{
      if(!mail_test){
        let file_test=false
        if(req.file)
        {
          fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.accord + req.body.nom));
          file_test=true
        }
        let user = new User({
          nom: data.nom,
          email: data.email,
          num_tel: data.num_tel,
          institut: data.institut,
          accord: data.accord,
          cv:file_test
        })
        user.save()
        .then(() => {
          res.status(201).send({ error:false,sent:true,msg:false })    
        })
        .catch((error) => {
          res.status(400).send({ error:true,sent:false,msg:false })
        })
      }
      else{
        res.status(400).send({ error:true,sent:false,msg:true })
      }
    }) 
    .catch((error) => {
      res.status(400).send({ error:true,sent:false,msg:false })
    })

})
app.listen(199,()=>console.log("start"))
