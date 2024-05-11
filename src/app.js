const express=require('express')
const app=express()
const PORT=process.env.PORT||8000
require('../db/conn')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const Player=require('../model/Players')
const Team=require('../model/Teams')
const authenticateAdmin=require('../middleware/auth')
app.use(express.json())

app.post("/api/login", (req, res) => {
    try {
        const adminID = req.body.userid;
        const adminPD = req.body.password;
        if (adminID === process.env.userid && adminPD === process.env.password) {
            console.log('Admin LoggedIn')
            const token = jwt.sign(adminID, process.env.SECRET_KEY)
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch(err) {
        res.status(400).json({ message: "Internal service error" });
    }
})

app.get("/api/players",async(req,res)=>{
    try{
        const players=await Player.find({})
        if(players.length>0){

            res.status(200).send(players)
        }
        else{
            res.status(200).send(`No players are available to show...`)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

app.get("/api/playersToBuy",async(req,res)=>{
    try{
        const players=await Player.find({isSold:{$ne:true}})
        if(players.length>0){
            
            res.status(200).send(players)
        }
        else
        {
            res.status(200).send(`No available players to sell...`)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
app.get("/api/soldPlayers",async(req,res)=>{
    try{
        const players=await Player.find({isSold:{$eq:true}})
        res.status(200).send(players)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
app.get("/api/getTeams",async(req,res)=>{
    try{
        const teams=await Team.find()
        res.status(200).send(teams)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
app.post("/api/player",authenticateAdmin,async(req,res)=>{
    try{
        const player=new Player(req.body)
        const result=await player.save()
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
})

app.post("/api/createTeam",authenticateAdmin,async(req,res)=>{
    try{
        const team=new Team(req.body)
        const teamSave=await team.save()
        res.status(200).send(teamSave)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.post('/api/bid',authenticateAdmin,async (req, res) => {
    const { teamName, playerId, biddingAmount} = req.body;
    const player=await Player.findById({_id:playerId})
    if(player.isSold){
        return res.status(200).send(`player is already sold...`)
    }
    try {
        const updatedTeam = await Team.handleBid(teamName, playerId, biddingAmount);
        console.log(updatedTeam)
        res.status(200).json({ message: 'Bid successful', team: updatedTeam });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const start=async()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`Sever Running successfully on ${PORT}`)
        }) 
    }
    catch(err){
        console.log(err)
    }
}
start()

// I am a hacke my hacking id is  s1v4h3r3s
