const express = require("express")
const app = express()
const pool = require("./db")
const cors = require("cors")
const apiRoutes = require("./routes/index")
const path = require('path')
app.use(express.json())
app.use(cors())
app.use("/api", apiRoutes)


//Build Serving 

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

app.get("/api", (req,res)=>{
    res.send("Welcome to the introduction api")
})
//Create API Routes like we do normally in Node
//Mkae sure node connects to localhost @ 3000 while psql links to localhost via 5432
app.get("/introductions", async(req, res)=>{
    try {
    let allGreetings = await pool.query("SELECT * FROM intro")
    res.json(allGreetings.rows)
    } catch (e) {
    console.error(e.message)        
    }
})


app.post("/introduction", async(req, res)=>{
    try {
        const {name, job, hobbies} = req.body;
        const newIntro = await pool.query(
            "INSERT INTO intro (name, job, hobbies) VALUES ($1, $2, $3) RETURNING *",
            [name, job, hobbies]
            );
        res.json(newIntro.rows[0]);
    } catch (e) {
        console.error(e.message)
    }
});

app.put("/introduction/:id", async (req, res)=>{
try {
let {id} = req.params;
let {name, job, hobbies} = req.body;
let updatedIntro = await pool.query("UPDATE intro SET name = $1, job = $2, hobbies = $3 WHERE intro_id = $4",
[name, job, hobbies, id]
);
res.status(200).send("self-intro was updated!")
} catch (e) {
console.error(e.message)    
}
})

app.delete("/introduction/:id", async(req, res)=>{
    try {
        let {id} = req.params;
        let deletedIntro = await pool.query("DELETE FROM intro WHERE intro_id = $1",[id]);
        res.json("Your intro has been deleted")
    } catch (e) {
        console.error(e.message)        
    }
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`listening at http://localhost:${PORT}`)
})