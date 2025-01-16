require('dotenv').config();

const Player = require('../model/Players');
const Team = require('../model/Teams');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;  // Import Cloudinary SDK

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const getplayers = async(req,res)=>{
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
}

const playersToBuy = async (req, res) => {
    console.log("In playersToBuy function");
    try {
      const { bidPlace } = req.query; // Get bidPlace from the query parameters
  
      let query = { isSold: { $ne: true } };
  
      if (bidPlace) {
        query = { ...query, bidplace: parseInt(bidPlace, 10) }; // Add bidPlace filter if provided
      }
  
      // Fetch the player based on the query
      const players = await Player.find(query)
        .sort({ bidplace: 1 }) // Sort by bidPlace in ascending order
        .limit(1); // Fetch only one player
  
      if (players.length > 0) {
        console.log("Player fetched:", players[0]);
        res.status(200).send(players[0]); // Send the player data
      } else {
        res.status(200).send(`No available players to sell...`);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
};

const soldPlayers = async(req,res)=>{
    try{
        const players=await Player.find({isSold:{$eq:true}})
        res.status(200).send(players)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

const getTeams = async(req,res)=>{
    try{
        const teams=await Team.find()
        res.status(200).send(teams)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

const player = async(req,res)=>{
  console.log("player function",req.body);
  res.status(200).json({message:"success"})
    // try{
    //     const player=new Player(req.body)
    //     const result=await player.save()
    //     res.status(200).json(result)
    // }
    // catch(err){
    //     res.status(400).send(err)
    //     console.log(err)
    // }
}






const createTeam = async (req, res) => {
    try {
      console.log("create team function");
  
      const { teamID, teamMembers, initialPurse } = req.body;
  
      // Check if a team with the same teamID already exists
      const existingTeam = await Team.findOne({ teamID });
  
      if (existingTeam) {
        // If the team exists, update its fields with the new data
        existingTeam.teamMembers = teamMembers;
        existingTeam.initialPurse = initialPurse;
  
        const updatedTeam = await existingTeam.save();
        return res.status(200).send({ message: "Team updated successfully", team: updatedTeam });
      } else {
        // If the team doesn't exist, create a new team
        const team = new Team(req.body);
        const teamSave = await team.save();
        return res.status(201).send({ message: "Team created successfully", team: teamSave });
      }
    } catch (err) {
      res.status(400).send({ message: "Error creating or updating team", error: err });
    }
  };
  

const bid = async (req, res) => {
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
}


const deleteTeam = async (req,res) =>{
    const {id} = req.body
    console.log("id:",id);
    try{
        const team = await Team.findByIdAndDelete(id)
        if(!team){
            return res.status(404).send({message: "Team not found"})
        }
        res.status(200).send({message: "Team deleted successfully"})
    }catch(err){
        res.status(400).send({message: "Error deleting team", error: err})
    }
}



module.exports = {getplayers,playersToBuy,soldPlayers,getTeams,player,createTeam,bid,deleteTeam,upload};