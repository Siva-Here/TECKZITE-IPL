require('dotenv').config();

const Player = require('../model/Players');
const Team = require('../model/Teams');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage });


const getplayers = async(req,res)=>{
  console.log("in get players");
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
    const { bidplace, set, direction } = req.query;
    console.log(bidplace, set, direction, req.body);

    // Parse bidplace and set to integers
    const bidPlaceValue = parseInt(bidplace, 10);
    const setValue = parseInt(set, 10);

    let sortOrder = 1;
    let query = { isSold: { $ne: true } };

    if (direction === "next") {
      query = {
        ...query,
        $or: [
          { set: { $gt: setValue } },
          { set: setValue, bidplace: { $gt: bidPlaceValue } },
        ],
      };
      sortOrder = 1; // Ascending order for "next"
    } else if (direction === "prev") {
      query = {
        ...query,
        $or: [
          { set: { $lt: setValue } },
          { set: setValue, bidplace: { $lt: bidPlaceValue } },
        ],
      };
      sortOrder = -1; // Descending order for "prev"
    }

    // Fetch the player based on the query
    let players = await Player.find(query)
      .sort({ set: sortOrder, bidplace: sortOrder })
      .limit(1);

    if (players.length > 0) {
      console.log("Player fetched:", players[0]);
      return res.status(200).send(players[0]); // Send the player data
    }

    // If no players are found, wrap around for cyclic behavior
    console.log("No players found. Wrapping around for cyclic behavior...");
    if (direction === "next") {
      query = {
        isSold: { $ne: true },
        $or: [
          { set: { $gte: 0 } }, // Start from the beginning
        ],
      };
      sortOrder = 1; // Ascending order for restart
    } else if (direction === "prev") {
      query = {
        isSold: { $ne: true },
        $or: [
          { set: { $lte: Number.MAX_VALUE } }, // Wrap to the end
        ],
      };
      sortOrder = -1; // Descending order for restart
    }

    players = await Player.find(query)
      .sort({ set: sortOrder, bidplace: sortOrder })
      .limit(1);

    if (players.length > 0) {
      console.log("Player fetched after wrapping:", players[0]);
      res.status(200).send(players[0]); // Send the player data
    } else {
      res.status(200).send("No available players to sell...");
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


const player = async (req, res) => {
  try {
    console.log("Player function:", req.body);

    const {
      name,
      nationality,
      age,
      role,
      runs,
      wickets,
      strikeRate,
      basePrice,
      isDebut,
      bidplace,
      set
    } = req.body;
    let image;
    if(req.file==undefined){
      image=req.body.image
    }
    else{ 
   image = req.file;  
  
    if (!image) {
      return res.status(400).send('No image file uploaded');
    }
    // Upload image to Cloudinary
    console.log("in uploadimg")
    const uploadImage = await import('../uploadimage.mjs');
    try {
      // const uploadedImage = await uploadImage.uploadImages(image);
      // console.log("Result after uploading:", uploadedImage);
      const uploadedImageUrl = await uploadImage.uploadImages(image);
      console.log("Uploaded Image URL:", uploadedImageUrl);
      
      // Once the image is uploaded, proceed with the rest of the logic
      image = uploadedImageUrl;
    }
    catch(err){
      console.log("error while uploading photo")
    }
  }
      const id = req.body._id; 
     if(id){
      const existingPlayer = await Player.findOne({_id:id });
       console.log(id);
       console.log(existingPlayer)
       
      if (existingPlayer) {
        console.log("in existingPlayer")
        // Update the existing player with new details
        existingPlayer.name = req.body.name;
        existingPlayer.nationality = req.body.nationality;
        existingPlayer.age = req.body.age;
        existingPlayer.role = req.body.role;
        existingPlayer.runs = req.body.runs;
        existingPlayer.wickets = req.body.wickets;
        existingPlayer.strikeRate = req.body.strikeRate;
        
        existingPlayer.image = image; 
        // Save Cloudinary URL
        existingPlayer.basePrice = req.body.basePrice;
        existingPlayer.isDebut=req.body.isDebut;
        existingPlayer.bidplace = req.body.bidplace;
        existingPlayer.set = req.body.set;

        const updatedPlayer = await existingPlayer.save();
        console.log("in updateplayer")
        return res.status(200).send({ message: 'Player updated successfully', player: updatedPlayer });
      }
     } else {
        // Create a new player with the uploaded image URL
        const newPlayer = new Player({
          name,
          nationality,
          age,
          role,
          runs,
          wickets,
          strikeRate,
          image, // Save Cloudinary URL
          basePrice,
          isDebut,
          bidplace,
          set,
        });

        const result = await newPlayer.save();
        console.log("in new player")
        return res.status(200).json({message:'added player successfully'});
      }
  
  }
  catch (error) {

    console.log('Error in player function:', error);
    return res.status(500).send('Error processing request');
  }
};

const createTeam = async (req, res) => {
    try {
      console.log("create team function");
  
      const { teamID, teamMembers, initialPurse } = req.body;
  
      // Check if a team with the same teamID already exists
      console.log(teamID)
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
      console.log(error)
      res.status(400).send({ message: "Error creating or updating team", error: err });
    }
  };
  

const bid = async (req, res) => {
  console.log("in bid fn")
    const { teamName, playerId, biddingAmount} = req.body;
    console.log(teamName,playerId,biddingAmount)
    const player=await Player.findById({_id:playerId})
    if(player.isSold){
        return res.status(200).send(`player  already sold...`)
    }
    try {
        const updatedTeam = await Team.handleBid(teamName, playerId, biddingAmount);
        console.log(updatedTeam)
        res.status(200).json({ message: 'Bid successful', team: updatedTeam });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deletePlayer = async (req,res) =>{ 
  const {id }= req.body
  console.log(req.body)
  console.log("id:",id);
  try{
      const team = await Player.findByIdAndDelete(id)
      if(!Player){
          return res.status(404).send({message: "Player not found"})
      }
      res.status(200).send({message: "Player deleted successfully"})
  }catch(err){
    console.log(err)
      res.status(400).send({message: "Error deleting player", error: err})
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





module.exports = {getplayers,playersToBuy,soldPlayers,getTeams,player,createTeam,bid,deleteTeam,deletePlayer};