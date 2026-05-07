const express=require('express')
const { getdata, postdata, patchdata, deletedata, Signup, Login, Forgot, Reset } = require('../controllers/user.controllers')
const { authentification } = require('../middleware/Authentification')
const checkRole = require('../middleware/rbac')


const router=express.Router()



router.get("/",getdata)
router.post("/",postdata)
router.patch("/:id",patchdata)
router.delete("/:id",authentification,checkRole,deletedata)
router.post("/signup",Signup)
router.post("/login",Login)
router.post("/forgot",Forgot)
router.post("/reset/:token",Reset)


module.exports=router