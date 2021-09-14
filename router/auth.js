const express = require("express");
const cors=require('cors');
const jwt =require('jsonwebtoken');

const router = express.Router();

const bcrypt=require('bcryptjs');

require("../db/connect");

const User = require("../models/usserSchema");
const Authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  console.log('Cookies: ', req.cookies)
  res.send("hello world form server router js");
});





//=========using await async function ====================


router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  

  if (!name || !email || !phone || !work || !password || !cpassword ) {
    return res.status(422).json({ error: "plz fill the filled property" });
  }

  try {
    const userExist =await User.findOne({ email: email });

    if (userExist) {
        return res.status(422).json({ error: "Email already registared" });
      }
      else if(password !== cpassword){
          return res.status(422).json({error:"password are not matching!!!!!!"});
      }else{

        const user = new User({ name, email, phone, work, password, cpassword });

        await user.save();

        res.status(201).json({ messege: "User Registared Successfully" });

      }
        
  } catch (err) {
    console.log(err);
  }


});


//==================signin==================== 


router.post('/signin', async (req,res) => {

    try{
      let token;
        const {email,password}=req.body;
        if(!email ||!password){
            return res.status(400).json({error:"please Fill the data"})
        }

        const userLogin= await User.findOne({email:email});
        // console.log(userLogin);


     if(userLogin){
        const isMatch =await bcrypt.compare(password,userLogin.password);
      // console.log(isMatch);
        token=await userLogin.generateAuthToken();
        //console.log('token:', token);


      res.cookie("jwtoken",token,{
        expires: new Date(Date.now()+25892000000),
        httpOnly:true,
 
      });


        if(!isMatch){

            res.status(400).json({error:"Password is Worng"});

        }else{

            res.json({messege:"user login successfully"});
        }
     }
     
     else{
        res.status(400).json({error:"Please Register First"});
     }
        

    }catch (err){
        console.log(err);
    }


})


//about us page 

router.get('/about',Authenticate, (req, res) => {
  // console.log("hello my about");
  res.send(req.rootUser);
}); 

module.exports = router;









