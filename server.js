
import express, { response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies


app.post('/usuarios', async (request, response) => {
        await prisma.user.create({
             data:{
                email: request.body.email,
                name: request.body.name,
                age: request.body.age,
            }
        })

    response.status(201).json(request.body);
})

app.put('/usuarios/:id', async (request, response) => {
    await prisma.user.update({
        where:{
            id: request.params.id
        },
        data:{
            email: request.body.email,
            name: request.body.name,
            age: request.body.age,
        }
    })
    response.status(200).json(user);
})

app.delete('/usuarios/:id', async (request, response) => {
    await prisma.user.delete({
        where:{
            id: request.params.id
        }
    })
    response.status(204).send();
});

app.get('/usuarios', async (request, response) => {
     const users = await prisma.user.findMany();
    response.status(200).json(users);
})

app.get('/usuarios/:id', async (request, response) => {
     const users = await prisma.user.findUnique({
        where: {
            id: request.params.id
        }
    })
    response.status(200).json(users);
});

app.listen(3000)

