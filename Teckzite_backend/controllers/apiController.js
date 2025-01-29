require('dotenv').config();
const ExcelJS = require("exceljs");

const { trusted } = require('mongoose');
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
            res.status(200).send({message:"No players found"})
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
    const {  set,bidplace, direction } = req.query;
console.log(set)
   
    const bidPlaceValue = parseInt(bidplace, 10);
    const setValue = parseInt(set, 10);

    let sortOrder = 1;
    let query = { isSold: { $ne: true },inAuction:{$ne:true},set:setValue};

    if (direction === "next") {
      query = {
        ...query,
         
          set: setValue, bidplace: { $gt: bidPlaceValue } ,
        
      };

      sortOrder = 1; 

    } else if (direction === "prev") {
      query = {
        ...query,
        
        set: setValue, bidplace: { $lt: bidPlaceValue } ,
        
      };
      sortOrder = -1; // Descending order for "prev"
    }

    
    let players = await Player.find(query)
      .sort({  bidplace: sortOrder })
      .limit(1);

    if (players.length > 0) {
      console.log("Player fetched:", players[0]);
      return res.status(200).send(players[0]); 
    }

    // If no players are found, wrap around for cyclic behavior
    console.log("No players found. Wrapping around for cyclic behavior...");
    if (direction === "next") {
      query = {
        isSold: { $ne: true },
         inAuction:{$ne:true},
         
         set: setValue, bidplace: { $lte: bidPlaceValue } 
      };
      sortOrder = 1; 


    } else if (direction === "prev") {
      query = {
        isSold: { $ne: true },
       inAuction:{$ne:true},
       set: setValue, bidplace: { $gte: bidPlaceValue } 
      };
      sortOrder = -1; 
    }

    players = await Player.find(query)
      .sort({  bidplace: sortOrder })
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
const unsold=async(req,res)=>{
  console.log("unsold")
  const id=req.body.id;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }else{ 
  player.inAuction=true;
  await player.save();
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
      
      const uploadedImageUrl = await uploadImage.uploadImages(image);
      console.log("Uploaded Image URL:", uploadedImageUrl);
      image = uploadedImageUrl;
    }
    catch(err){
      console.log("error while uploading photo")
      return res.status(500).send({ message: 'error while uploaidng photo'});
    }
  }
      const id = req.body._id; 
     if(id){
      const existingPlayer = await Player.findOne({_id:id });
       console.log(id);
       console.log(existingPlayer)
       
      if (existingPlayer) {
        console.log("in existingPlayer")
        existingPlayer.name = name;
        existingPlayer.nationality = nationality;
        existingPlayer.age = age;
        existingPlayer.role = role;
        existingPlayer.runs = runs;
        existingPlayer.wickets = wickets;
        existingPlayer.strikeRate = strikeRate;
        
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
  console.log("in bid fn");
  const { teamName, playerId, biddingAmount } = req.body;
  console.log(teamName, playerId, biddingAmount);
  
  try {
    const player = await Player.findById({ _id: playerId });
    if (player.isSold) {
      return res.status(400).json({ error: "Player already sold." });
    }
    const updatedTeam = await Team.handleBid(teamName, playerId, biddingAmount);
    console.log(updatedTeam);
    res.status(200).json({ message: "Bid successful", team: updatedTeam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  const fetchsets = async (req, res) => {
    console.log("in fetchsets")
    try {
      // const sets = await Player.aggregate([
      //   { $group: { _id: null, setname: { $addToSet: "$setname" }, set: { $addToSet: "$set" } } }
      // ]);
      const sets = await Player.aggregate([
        { $match: { isSold: false } }, // Filter players who are NOT sold
        { 
          $group: { 
            _id: null, 
            setname: { $addToSet: "$setname" }, 
            set: { $addToSet: "$set" } 
          } 
        }
      ]);
      
      // Extract unique setnames and setnos from the result
      const setname = sets[0]?.setname || [];
      const set = sets[0]?.set || [];
      
      res.status(200).json({
        setname,
        set
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch sets" });
    }
  };
  


const deletePlayer = async (req, res) => { 
  const { id } = req.body;
  console.log(req.body);
  console.log("id:", id);

  try {
   
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }

    // If the player was sold, update the respective team's purse
    if (player.isSold) {
      const teamName = player.soldTeam;
      const soldAmount = player.soldAmount;

      const team = await Team.findOne({ teamID: teamName });
      if (!team) {
        return res.status(404).send({ message: "Team not found" });
      }

      // Add the player's sold amount back to the team's purse
      team.remainingPurse += soldAmount;
      await team.save();
      console.log(`Updated team purse for ${teamName}, added back ${soldAmount}`);
    }

    console.log("Deleted player details", player);
    res.status(200).send({ message: "Player deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error deleting player", error: err });
  }
};

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

const getteamplayers = async (req, res) => {
  try {
    console.log("getteamplayers function: Team ID:", req.params.id);

    // Step 1: Find the Team document by its ID and retrieve the players array (IDs of players)
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const playerIds = team.players; // Extract the array of player IDs from the team document

    // Step 2: Find the player documents using the array of player IDs
    const players = await Player.find({ _id: { $in: playerIds } });

    // Step 3: Send the players as a JSON response
    res.json(players);
  } catch (err) {
    // Handle any errors
    console.error("Error in getteamplayers function:", err);
    res.status(400).json({ error: err.message });
  }
};


const addset = async (req, res) => {
  try {
    console.log("add set function;");

    const { setname, setno } = req.body;
    console.log(req.body);
    console.log("Set Name:", setname);
    console.log("Set Number:", setno);
 
    // if (!req.file) {
    //   console.log("No file uploaded");
    //   return res.status(400).json({ message: "No file uploaded" });
    // }

    // if (!req.file.mimetype.toLowerCase().includes('excel')) {
    //   return res.status(400).json({ message: "Uploaded file is not an Excel file" });
    // }
    

    // console.log("path:", req.file.path);
console.log("file",req.file.buffer)
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer); 
     console.log("processing");// Use buffer if you're using memoryStorage
    const worksheet = workbook.worksheets[0];
    const players = [];

    worksheet.eachRow((row, rowNumber) => {
      console.log("in map")
      if (rowNumber === 1) return; // Skip the header row

      const playerData = {
        name: row.getCell(1).value,
        nationality: row.getCell(2).value,
        age: parseInt(row.getCell(3).value, 10),
        role: row.getCell(4).value ? row.getCell(4).value.toLowerCase() : "",
        runs: row.getCell(5).value ? parseInt(row.getCell(5).value, 10) : undefined,
        wickets: row.getCell(6).value ? parseInt(row.getCell(6).value, 10) : undefined,
        set: parseInt(setno, 10), // Using set number from the request
        isDebut: row.getCell(7).value?.toString().trim().toUpperCase() === "TRUE",
        basePrice: row.getCell(8).value ? parseInt(row.getCell(8).value, 10) : 50000,
        strikeRate: row.getCell(9).value ? row.getCell(9).value.toString() : undefined,
        bidplace: row.getCell(10).value ? parseInt(row.getCell(10).value, 10) : undefined,
        setname:setname,
      };
   
      // Validate that required fields are present
      if (!playerData.name || !playerData.nationality || isNaN(playerData.age) || !playerData.role) {
        console.log(`Skipping row ${rowNumber} due to missing critical data`);
        return; // Skip this row if any required field is missing
      }

      // Validate the role field
      const validRoles = ["batsman", "bowler", "wicketkeeper", "allrounder"];
      if (!validRoles.includes(playerData.role)) {
        console.log(`Invalid role for row ${rowNumber}:`, playerData.role);
        return; // Skip this row if role is invalid
      }

      players.push(playerData);
    });
     console.log("out from map",players)
    if (players.length > 0) {
      await Player.insertMany(players);
      console.log(`${players.length} players inserted into the database.`);
    }

    res.status(200).json({
      message: "Data received successfully and inserted into the database",
      data: {
        setname,
        setno,
        file: req.file.originalname,
      },
    });
  } catch (error) {
    console.error("Error in add set function:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};









module.exports = {getplayers,playersToBuy,soldPlayers,getTeams,player,createTeam,bid,deleteTeam,deletePlayer,getteamplayers,addset,fetchsets,unsold};
