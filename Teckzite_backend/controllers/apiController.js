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
const accelerateplayers = async (req, res) => {
    console.log("In accelerate function");
    console.log(req.body)
    try {
      const {  set,bidplace, direction } = req.query;
  console.log(set)
     
      const bidPlaceValue = parseInt(bidplace, 10);
      const setValue = parseInt(set, 10);
  
      let sortOrder = 1;
      let query = { isSold: { $ne: true },inAuction:{$ne:false},inaccelerate:{$ne:true}};
  
      if (direction === "next") {
        query = {
          ...query,
           
            set:{$gte: setValue}, bidplace: { $gt: bidPlaceValue } ,
          
        };
  
        sortOrder = 1; 
  
      } else if (direction === "prev") {
        query = {
          ...query,
          
          set:{$lte: setValue}, bidplace: { $lt: bidPlaceValue } ,
          
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
           inAuction:{$ne:false},
           inaccelerate:{$ne:true},
           set: {$lte:setValue}, bidplace: { $lte: bidPlaceValue } 
        };
        sortOrder = 1; 
  
  
      } else if (direction === "prev") {
        query = {
          isSold: { $ne: true },
         inAuction:{$ne:false},
         inaccelerate:{$ne:true},
         set:{$gte: setValue}, bidplace: { $gte: bidPlaceValue } 
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
  const inaccelerate=req.body.inaccelerate
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }else{ 
  player.inAuction=true;
  if(inaccelerate){
    player.inaccelerate=true;
  }
  await player.save();
  return res.status(200).send({message:"unsold"})
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
      fiftybyhundred,
      economy,
      average,
      bidplace,
      set,
      setname
    } = req.body;

    let image;
    if (req.file == undefined) {
      image = req.body.image;
    } else {
      image = req.file;

      if (!image) {
        return res.status(400).send('No image file uploaded');
      }

      // Upload image to Cloudinary with 1:1 aspect ratio
      console.log("Uploading image...");
      const uploadImage = await import('../uploadimage.mjs');

      try {
        const uploadedImageUrl = await uploadImage.uploadImages(image, {
          transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "auto" } // Ensures 1:1 aspect ratio
          ]
        });

        console.log("Uploaded Image URL:", uploadedImageUrl);
        image = uploadedImageUrl;
      } catch (err) {
        console.log("Error while uploading photo");
        return res.status(500).send({ message: 'Error while uploading photo' });
      }
    }

    const id = req.body._id;
    if (id) {
      const existingPlayer = await Player.findOne({ _id: id });
      console.log(id);
      console.log(existingPlayer);

      if (existingPlayer) {
        console.log("Updating existing player...");
        existingPlayer.name = name;
        existingPlayer.nationality = nationality;
        existingPlayer.age = age;
        existingPlayer.role = role;
        existingPlayer.runs = runs;
        existingPlayer.wickets = wickets;
        existingPlayer.strikeRate = strikeRate;
        existingPlayer.image = image; // Save Cloudinary URL
        existingPlayer.basePrice = basePrice;
        existingPlayer.fiftybyhundred = fiftybyhundred;
        existingPlayer.economy = economy;
        existingPlayer.average = average;
        existingPlayer.bidplace = bidplace;
        existingPlayer.set = set;
        existingPlayer.setname = setname;

        const updatedPlayer = await existingPlayer.save();
        console.log("Player updated successfully");
        return res.status(200).send({ message: 'Player updated successfully', player: updatedPlayer });
      }
    } else {
      console.log("Adding new player...");
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
        fiftybyhundred,
        economy,
        average,
        bidplace,
        set,
        setname,
      });

      await newPlayer.save();
      return res.status(200).json({ message: 'Player added successfully' });
    }
  } catch (error) {
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
    console.log("in fetchsets");
    try {
      const setsWithPlayersAgg = await Player.aggregate([
        { $match: { isSold: false, inAuction: false } },
        { 
          $group: { 
            _id: "$set", 
            setname: { $first: "$setname" } 
          } 
        }
      ]);
      

      const setsWithoutPlayersAgg = await Player.aggregate([
        {
          $group: {
            _id: "$set",
            setname: { $first: "$setname" },
            totalPlayers: { $sum: 1 },
            matchingPlayers: {
              $sum: {
                $cond: [
                  {
                    $or: [
                      { $eq: ["$isSold", true] },  
                      { $and: [{ $eq: ["$isSold", false] }, { $eq: ["$inAuction", true] }] } 
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $match: {
            $expr: { $eq: ["$totalPlayers", "$matchingPlayers"] } // Only keep sets where all players match the condition
          }
        }
      ]);
      
     
    console.log(setsWithPlayersAgg,setsWithoutPlayersAgg)
      
      const setsWithPlayers = setsWithPlayersAgg.map(doc => ({
        set: doc._id,
        setname: doc.setname
      }));
      const setsWithoutPlayers = setsWithoutPlayersAgg.map(doc => ({
        set: doc._id,
        setname: doc.setname
      }));
  
      
      const teams = await Team.find({}, 'teamID');
      const teamnames = teams.map(team => team.teamID);
      res.status(200).json({
        // Arrays for sets that have unsold players.
        setname: setsWithPlayers.map(item => item.setname), // e.g. ["Set One", "Set Two"]
        set: setsWithPlayers.map(item => item.set),         // e.g. [1, 2]
  
        // Arrays for sets that do not have unsold players.
        setwithoutplayers_set: setsWithoutPlayers.map(item => item.set),         // e.g. [3, 4]
        setwithoutplayers_setname: setsWithoutPlayers.map(item => item.setname), // e.g. ["Set Three", "Set Four"]
  
        teamnames
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch sets" });
    }
  };

  

const deleteTeam = async (req, res) => {
  const { id } = req.body;
  console.log("id:", id);
  
  try {
      const team = await Team.findById(id);
      if (!team) {
          return res.status(404).send({ message: "Team not found" });
      }

      // Get all player IDs from the team's players array
      const playerIds = team.players;

      // Find all players associated with the team
      const players = await Player.find({ _id: { $in: playerIds } });

      // Update each player individually to reset their auction status
      for (const player of players) {
          player.isSold = false;
          player.inAuction = false;
          player.soldTeam = null;
          player.soldAmount = player.basePrice; // Reset soldAmount to basePrice
          await player.save();
      }

      // Delete the team
      await Team.findByIdAndDelete(id);

      res.status(200).send({ message: "Team deleted successfully, players updated." });
  } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Error deleting team", error: err });
  }
};


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
const deletePlayer = async (req, res) => { 
  const { id } = req.body;
  console.log(req.body);
  console.log("id:", id);

  try {
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }

    // If the player was sold, update the respective team's purse and remove the player from the team
    if (player.isSold) {
      const teamName = player.soldTeam;
      const soldAmount = player.soldAmount;
      const role = player.role;
      
      const team = await Team.findOne({ teamID: teamName });
      if (!team) {
        return res.status(404).send({ message: "Team not found" });
      }

      // Remove player _id from team's players array
      await Team.updateOne({ teamID: teamName }, { $pull: { players: id } });

      // Update team purse and player count based on role
      team.remainingPurse += soldAmount;
      if (role === "batsman") {
        console.log("batsman")
        team.batsmen -= 1;
      } else if (role === "bowler") {
        team.bowlers -= 1;
      } else if (role === "allrounder") {
        team.allrounder -= 1;
      } else if (role === "wicketkeeper") {
        team.wicketkeeper -= 1;
      }

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

const addset = async (req, res) => {
  try {
    console.log("add set function started");

    const { setname, setno } = req.body;
    console.log("Set Name:", setname);
    console.log("Set Number:", setno);

    if (!req.file || !req.file.buffer) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const players = [];
    const validRoles = ["batsman", "bowler", "wicketkeeper", "allrounder"];

    workbook.eachSheet((worksheet, sheetId) => {
      console.log(`Processing Sheet ${sheetId}: ${worksheet.name}`);

      let headers = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          headers = row.values.map((val) => val?.toString().trim().toLowerCase()); // Extract header row
          return;
        }

        const playerData = {};
        row.eachCell((cell, colNumber) => {
          const key = headers[colNumber]; 
          if (key) playerData[key] = cell.value;
          
        });
        
        
        // Convert & validate values
        playerData.age = parseInt(playerData.age, 10);
        playerData.runs = playerData.runs ? parseInt(playerData.runs, 10) : undefined;
        playerData.wickets = playerData.wickets ? parseInt(playerData.wickets, 10) : undefined;
        playerData.set = parseInt(setno, 10);
        playerData.isDebut = playerData.isdebut?.toString().trim().toUpperCase() === "TRUE";
        playerData.basePrice = playerData.baseprice ? parseInt(playerData.baseprice, 10) : 50000;
        playerData.bidplace = playerData.bidplace ? parseInt(playerData.bidplace, 10) : undefined;
        playerData.setname = setname;
        playerData.role = playerData.role ? String(playerData.role).toLowerCase() : "";
        playerData.strikeRate=playerData.strikerate?String(playerData.strikerate):"";
       console.log(playerData.name,playerData.nationality,playerData.age,playerData.role)
        // Validate required fields
        if (!playerData.name || !playerData.nationality || isNaN(playerData.age) || !playerData.role) {
          console.log(`Skipping row ${rowNumber} in sheet ${worksheet.name} due to missing data`);
          return;
        }

        if (!validRoles.includes(playerData.role)) {
          console.log(`Invalid role in row ${rowNumber}, sheet ${worksheet.name}: ${playerData.role}`);
          return;
        }
        console.log(playerData)
        players.push(playerData);
      });
    });

    console.log(`Total players parsed: ${players.length}`);

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

const playerinfo = async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();

    const totalSoldPlayers = await Player.countDocuments({ isSold: true });

    const totalUnsoldPlayers = await Player.countDocuments({ isSold: false, inAuction: true });

    res.status(200).json({
      totalPlayers,
      totalSoldPlayers,
      totalUnsoldPlayers
    });
  } catch (error) {
    console.error('Error fetching player info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTeaminfo = async (req, res) => {
  try {
    const { id } = req.params; // Extracting team ID from the request parameters

    const team = await Team.findById(id); // Finding the team by ID in the database

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team); // Sending the team data as a response
  } catch (error) {
    console.error("Error fetching team info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};











module.exports = {getplayers,playersToBuy,accelerateplayers,soldPlayers,getTeams,player,createTeam,bid,deleteTeam,deletePlayer,getteamplayers,addset,fetchsets,unsold,playerinfo,getTeaminfo};