import { Router } from "express";
import prisma from "./../config/db.config.js";

const router = Router();

router.get("/get-users",async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const totalItems = await prisma.user.count()
    try {
        const users = await prisma.user.findMany({
            skip:(page-1)*limit,
            take:limit
        })
        res.status(200).json({
            users,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.ceil(totalItems/limit)
            }
        })
    } catch (error) {
        
    }
});

router.post("/create-user",async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/user/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/user/:id',async(req,res)=>{
    try {
        const {name,email,age,wight,hight} = req.body
        const {id} = req.params
        const user =await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{
               name,email,age,wight,hight
            }
        })
        res.status(200).json({
            message:"user update successful",
            user
        })
    } catch (error) {
        res.json(error.message)
    }
})

router.delete('/user/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const user = await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            message:"user delete successful",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:'inter server error'
        })
    }
})

router.get('/find/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id:Number(id)
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message:'inter server error'
        })
    }
})
router.get('/find',async(req,res)=>{
    try {
        
        const user = await prisma.user.findMany({
         orderBy:{
            name:'desc'
         }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message:'inter server error'
        })
    }
})
export default router;