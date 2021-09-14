const mongoose=require('mongoose');
const cors=require('cors');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const usserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
    
    }
    ,

    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})





// hashing the password

usserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        // console.log("hit inside");
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword= await bcrypt.hash(this.cpassword,12)
    }
    next();
});
// generating jwt 
usserSchema.methods .generateAuthToken=async function(){
    try{
        let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch (err){
        console.log(err);
    }
}


const User=mongoose.model('USER',usserSchema);
module.exports=User 