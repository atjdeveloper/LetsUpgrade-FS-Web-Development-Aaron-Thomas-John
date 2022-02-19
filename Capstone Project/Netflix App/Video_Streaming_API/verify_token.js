const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
   if(req.headers.authorization!==undefined){
       let token = req.headers.authorization.split(" ")[1];
       jwt.verify(token,"secretcode",(err,userCreds)=>{
           if(err==null){
               next();
           }else{
               res.status(401).send({message:"Incorrect token"})
           }
       })
   }else{
       res.status(403).send({message:"Invalid token"})
   }
}


module.exports = verifyToken;