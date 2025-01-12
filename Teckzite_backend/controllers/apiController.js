const Player = require('../model/Players');
const Team = require('../model/Teams');
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
    try{
        const player=new Player(req.body)
        const result=await player.save()
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}

const createTeam = async(req,res)=>{
    try{
        console.log("create team function");
        const team=new Team(req.body)
        const teamSave=await team.save()
        res.status(200).send(teamSave)
    }
    catch(err){
        res.status(400).send(err)
    }
}

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

module.exports = {getplayers,playersToBuy,soldPlayers,getTeams,player,createTeam,bid};