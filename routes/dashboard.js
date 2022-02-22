const router = require("express").Router()
const pool = require("../db")
const auth = require("../middleware/auth")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

//Don't remove this route

router.get("/", auth, async (req, res)=>{
    try {
        const adminUser = await prisma.users.findMany({
            where:{
                role: 'admin',
                user_id: req.user,
            },
            include: {
                intro: true,
            },
        });
        console.log(adminUser.length)
        if(adminUser.length === 1){
            const allUsers = await prisma.users.findMany({
                include: {
                    intro: true
                }
            });
            res.status(200).send(allUsers)
        }else{
        const user = await prisma.users.findUnique({
            where:{
                user_id: req.user
            },
            select:{
                user_name:true,
                role:true,
                intro: {
                    select:{
                        intro_id:true,
                        job:true,
                        hobbies:true
                    },
                },
            },
        });
        res.status(200).send(user)
    }
    } catch (e) {
        res.status(500).send(e.message)
        
    }
})

//Get all intros and name ONLY if you are an admin - it is working fine
// Unfortunately, I am running out of time so I will only make 1 admin route to save more time!
// router.get("/", auth, async(req,res)=>{
//     try {
//         const adminUser = await prisma.users.findMany({
//             where:{
//                 role: 'admin',
//                 user_id: req.user
//             }
//         })
//     //console.log(adminUser[0].role) //returns the role

//     if(adminUser[0].role === 'admin'){
//         const allUsers = await prisma.users.findMany();
//         console.log(allUsers)
//     }

//     } catch (e) {
//         res.status(500).send(e.message)
//     }
// })

// router.get("/intros", auth, async (req, res)=>{
//     try {
        
//     } catch (e) {
//         console.error(e.message)
        
//     }
// })

router.get("/intros/:id", auth, async(req, res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const adminUser = await prisma.users.findMany({
            where:{
                role: 'admin',
                user_id: req.user,
            },
            include: {
                intro: true,
            },
        });
        if(adminUser.length === 1){
            const oneIntro = await prisma.intro.findUnique({
                where:{
                    intro_id: Number(id)
                }
            });
            console.log(oneIntro)
            res.status(200).send(oneIntro)
        }else{
        const oneIntro = await prisma.intro.findMany({
            where:{
                user_id: req.user,
                intro_id: Number(id),
            },
        });
        console.log(oneIntro)
        res.status(200).send(oneIntro)
    }
    } catch (e) {
        console.error(e.message)        
    }
})


//Create a intros

router.post("/intro", auth, async (req,res)=>{
    try {
        // console.log(req.body)
        const {name, job, hobbies} = req.body;
        // let newIntro = await pool.query("INSERT INTO intro( user_id, name, job, hobbies) VALUES ($1, $2, $3, $4) RETURNING *",
        // [req.user, name, job, hobbies]   
        // );
        let newIntro = await prisma.intro.create({
            data:{
                user_id: req.user,
                name: name,
                job: job,
                hobbies: hobbies
            }
        })
        // res.status(201).send(newIntro.rows[0])
        res.status(201).send(newIntro)
    } catch (e) {
        console.error(e.message)
        
    }
})

//Update a intro 

router.put("/intros/:id", auth, async (req, res)=>{
    try {
        const {id} = req.params;
        const {name, job, hobbies} = req.body;
        // let updatedIntro = await pool.query("UPDATE intro SET name = $1, job = $2, hobbies = $3 WHERE intro_id = $4 AND user_id = $5 RETURNING *",
        // [name, job, hobbies, id, req.user]
        // );
        const updatedIntro = await prisma.intro.updateMany({
            where: {
                intro_id: Number(id),
                user_id: req.user,
                },
            data:{
                name: name,
                job: job,
                hobbies: hobbies,
            },
        });
    
        console.log(updatedIntro)
    //  if(updatedIntro.rows.length === 0){
    //      res.status(403).send("You can't change someone else's introduction for them")
    //  } 

    if(updatedIntro.count === 0){
        res.status(403).send("You can't change someone else's introduction for them")
    }
    
    res.status(200).send("Introduction updated!")
        
    } catch (e) {
        res.status(500).send(e.message)
        
    }
})



//Delete a intro 

router.delete("/intros/:id",auth, async(req,res)=>{
    try {
        const {id} = req.params;
        // const deleteIntro = await pool.query("DELETE FROM intro WHERE intro_id = $1 AND user_id = $2 RETURNING *",
        // [id, req.user]);

        // if(deleteIntro.rows.length === 0){
        //     res.status(403).send("You can't interrupt someone else's introduction, that's rude ")
        // }
        const deleteIntro = await prisma.intro.deleteMany({
            where: {
                intro_id: Number(id), 
                user_id: req.user
            }
        });
        if(!deleteIntro){
            res.status(403).send("You can't delete another person's intro")
        }

        if(deleteIntro.count === 0){
            res.status(404).send("intro does not exist")
        }

        res.status(200).send("Introduction deleted!")
    } catch (e) {
        res.status(500).send(e.message)
    } 
})



module.exports = router
