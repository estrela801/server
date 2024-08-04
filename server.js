import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()


app.use(express.json())
app.get('/usuarios', async (req, res) =>{
   const user =  await prisma.user.findMany()

    res.status(200).json(user)
})

let users = []
app.post('/usuarios',async (req,res)=>{
    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send('deu bom')
})

app.put('/usuarios/:var', async (req,res)=>{

    console.log(req);
    


    await prisma.user.update({
        where:{
           id: req.params.var
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.send('deu bom')
})

app.delete('/usuario/:id', async (req,res) =>{
    console.log(req);
    
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200)
})
app.listen(3000)