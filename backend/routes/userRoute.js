let express = require('express')
let router = express.Router()
let user = require("../models/users")




router.get("/user-details",async(req,res,next)=>{
   try{
        const data = await user.find({})
        // console.log(data)
        res.status(201).send({
            success:true,
            message:"Data fetch Successculy",
            
            data,
        })
   }catch(error){
    console.log(error)
    // res.status(500).send({
    //     success:false,
    //     message:"Data not Found",
    //     error,
    // })
   }
})

router.post("/user-details", async(req,res,next)=>{
    console.log(req.body)
    try{
        const data = await new user({
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            age:req.body.l_name,
            gender:req.body.l_name,
            qli:req.body.l_name,
            email:req.body.l_name,
            state:req.body.l_name,
            mob:req.body.l_name,
            pass:req.body.l_name,
        }).save();
        res.status(201).send({
            sucess:true,
            message:"user added succesfully",
            data
        })
    }catch(error){
        console.log(error)
    }
})

router.delete("/user-details/:id", async(req,res,next)=>{
    try{
        const response = await user.findOneAndDelete({"_id":req.params.id})
        if(response)
        {
            return res.status(201).send({
                success:true,
                message:"data deleted succesfully",
                response
            })
            }
            else{
                return res.status(201).send({
                    success:false,
                    message:"user not delted sucessfully"

                })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports=router