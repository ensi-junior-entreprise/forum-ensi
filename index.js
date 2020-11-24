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
  fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.accord + req.body.nom));
  let data = req.body
  let user = new User({
    nom: data.nom,
    email: data.email,
    num_tel: data.num_tel,
    institut: data.institut,
    accord: data.accord,
  })
  user.save()
  .then(() => {
    code.sent=true
    code.save() 
    res.status(201).send({ error:false,sent:true,nom:req.body.nom })    
  })
  .catch((error) => {
    res.status(400).send({ error:true,sent:false })
  })

})
app.listen(process.env.PORT,()=>console.log(process.env.PORT))