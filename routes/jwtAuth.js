const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const getToken = require("../utils/jwt")
const auth = require("../middleware/auth")
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

router.post("/sign-up", async (req, res)=>{
    try{
const {name, email, password} = req.body;
// const user =  await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

const user = await prisma.users.findFirst({
    where: {
        user_email: {
            equals: email
        },
    },
});

// console.log(user, user.user_password) //if not found returns null

// if(user.rows.length!==0){
//     return res.status(401).send("User exists")
// }

if(user){
    return res.status(401).send("User exists")
}


const saltRound = 7;
const salt = await bcrypt.genSalt(saltRound);
const bcryptPass = await bcrypt.hash(password, salt)

// const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPass]);
// const token = getToken(newUser.rows[0].user_id)

const newUser = await prisma.users.create({
    data:{
        user_name: name,
        user_email: email,
        user_password: bcryptPass
    },
});

const token = getToken(newUser.user_id)

// console.log(newUser, newUser.user_id) returns the newUser obj and the users id

res.json({token})
    }catch(e){
        console.error(e.message)
    }
})
//This route is converted to Prisma


router.post("/login", async (req, res) =>{
    try {
        const {email, password} = req.body;

        // const user = await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
        const user = await prisma.users.findUnique({
            where: {
                user_email: email
            },
        })

        console.log(user)
        
        
        // if(user.rows.length === 0){
        //     res.status(401).send("Invalid Login Credentials - user doesn't exist")
        // }
        if(!user){
            res.status(401).send("Invalid Login Credentials")
        }
        // const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        const validPassword = await bcrypt.compare(password, user.user_password);        
        if(!validPassword){
            res.status(401).status("Invalid Login Credentials - password is invalid")
        }
        // const token = getToken(user.rows[0].user_id)
        const token = getToken(user.user_id)
        res.json({token, user})
    } catch (e) {
    res.status(500).send(e.message)        
    }
})
//This route is converted to Prisma


router.get("/verify",auth, async(req, res)=>{
    try {
        res.json(true)
    } catch (e) {
        res.status(500).send()        
    }
})

module.exports = router