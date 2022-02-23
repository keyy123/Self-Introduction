const router = require("express").Router()
const pool = require("../db")
const auth = require("../middleware/auth")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

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
                user_id:true,
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

router.get("/user/:id", auth, async (req, res)=>{
    try {
        let {id} = req.params
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
            const getUser = await prisma.users.findMany({
                where: {
                    role: 'user',
                    user_id: id
                }
            }) //Only return the user ids
            res.status(200).send(getUser)
        } else {
               return res.status(403).status("You are not authorized to do this operation")
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
    })

router.delete("/user/:id", auth, async (req, res)=>{
try {
    let {id} = req.params
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
        const deletedUser = await prisma.users.deleteMany({
            where: {
                role: 'user',
                user_id: id
            }
        }) //Only return the user ids
        res.status(200).send(deletedUser)
    } else {
        if(id !== req.user){
           return res.status(403).status("You are not authorized to do this operation")
        }
        const deletedUser = await prisma.users.deleteMany({
            where: {
                role: 'user',
                user_id: req.user
            }    
        })
        res.status(200).send(deletedUser)
    }
} catch (e) {
    res.status(500).send(e.message)
}
})

router.put("/user/:id", auth, async (req, res)=>{
    try {
        let {id} = req.params
        const {name, email, password} = req.body 
        const saltRound = 7;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPass = await bcrypt.hash(password, salt)
        
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
            // Do Admin Operation
            const updatedUser = await prisma.users.updateMany({
                where:{
                    role: 'user',
                    user_id: id
                },
                data:{
                    user_name: name,
                    user_email: email,
                    user_password: bcryptPass
                }
            });
            res.status(200).send(updatedUser)
        }else{
            if(id !== req.user){
                return res.status(403).send("You are not authorized to do this operation")
            }
            const updatedUser = await prisma.users.updateMany({
                where:{
                    role: 'user',
                    user_id: req.user
                },
                data: {
                    user_name: name,
                    user_email: email,
                    user_password: bcryptPass
                }
            });
            res.status(200).send(updatedUser)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})


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
                    intro_id: Number(id),
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
        const updatedIntro = await prisma.intro.updateMany({
            where: {
                intro_id: Number(id),
                },
            data:{
                name: name,
                job: job,
                hobbies: hobbies,
            },
        });
        res.status(200).send(updatedIntro)
    } else{  
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
}
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
            const deleteIntro = await prisma.intro.deleteMany({
                where: {
                    intro_id: Number(id), 
                }
            });
            res.status(200).status("Introduction deleted!")
        }else{
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
    }
    } catch (e) {
        res.status(500).send(e.message)
    } 
})



module.exports = router
