const User = require("../models/user.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const  transporter  = require("../config/mail")
const getingdata=async()=>{
    return await User.find({})
}
const postingdata=async(data)=>{
    return await User.create(data)
}
const patchingdata=async(id,data)=>{
    return await User.findByIdAndUpdate(id,data)
}
const deletingdata=async(id)=>{
    return await User.findByIdAndDelete(id)
}
const signup=async(data)=>{
    return await User.create(data)
}
const login=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("password diddnt match asap")
    }
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
    if(!token){
        throw new Error("token not found")
    }
   
    return{
        user,token
    }
}
const forgot=async(email)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }
    const resetToken=crypto.randomBytes(32).toString('hex')
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordToken=hashedToken
    user.resetPasswordExpire=Date.now()+1000*60*10
    await user.save()
    await transporter.sendMail({
        from:'bhavishtrehan777@gmail.com',
        to:user.email,
        subject:'Password Reset',
        html:`

            <h2>Password Reset</h2>

            <p>Click below link to reset password</p>

            <a href="${resetToken}">
                Reset Password
            </a>
            `
    })
    return{
        message:'reset link sent on email'
    }
}
const resetToken=async(req)=>{
    const{newPassword}=req.body
    const hashedtoken=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user=await User.findOne({
        resetPasswordToken:hashedtoken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        throw new Error("user not foundd")
    }
    user.password=newPassword
    user.resetPasswordToken=null
    user.resetPasswordExpire=null
    await user.save()
    return{message:"reset success"}
}
module.exports={
    getingdata,
    postingdata,
    patchingdata,
    deletingdata,
    signup,
    login,
    forgot,
    resetToken
}