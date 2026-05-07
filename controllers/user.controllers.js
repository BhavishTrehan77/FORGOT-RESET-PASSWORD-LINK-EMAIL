const serviceData=require('../services/user.services')

const getdata=async(req,resp)=>{
    const data=await serviceData.getingdata()
    resp.json(data)
}
const postdata=async(req,resp)=>{
    const data=await serviceData.postingdata(req.body)
    resp.json(data)
}
const patchdata=async(req,resp)=>{
    const data=await serviceData.patchingdata(req.params.id,req.body)
    resp.json(data)
}
const deletedata=async(req,resp)=>{
    const data=await serviceData.deletingdata(req.params.id)
    resp.json(data)
}
const Signup=async(req,resp)=>{
    const data=await serviceData.signup(req.body)
    resp.json(data)
}
const Login=async(req,resp)=>{
    const data=await serviceData.login(req.body.email,req.body.password)
    resp.cookie("token",data.token).json(data)
}
const Forgot=async(req,resp)=>{
    const data=await serviceData.forgot(req.body.email)
    resp.json(data)
}
const Reset=async(req,resp)=>{
    const data=await serviceData.resetToken(req)
    resp.json(data)
}
module.exports={
    getdata,
    postdata,
    patchdata,
    deletedata,
    Signup,
    Login,
    Forgot,Reset
}