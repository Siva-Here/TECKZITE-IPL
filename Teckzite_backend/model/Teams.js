const mongoose = require("mongoose");
const Player = require("../model/Players");
const teamSchema = new mongoose.Schema({
  teamMembers: {
    type: [
      {
        type: String,
        required: true,
      },  
    ],
    validate: [ 
      {
        validator: function (arr) {
          return arr.length >= 3; // Minimum length validation
        },
        message: "At least three team member is required",
      },
      {
        validator: function (arr) {
          return arr.length <= 5; // Maximum length validation (for example, 5 members maximum)
        },
        message: "Maximum team size exceeded",
      },
    ],
  },
  initialPurse: {
    type: Number,
    default: 500000,
  },
  teamID: {
    type: String,
    unique: true,
  },
  bowlers: {
    type: Number,
    default: 0,
  },
  batsmen: {
    type: Number,
    default: 0,
  },
  allrounder: {
    type: Number,
    default: 0,
  },
  wicketkeeper: {
    type: Number,
    default: 0,
  },
  remainingPurse: {
    type: Number,
    default: function () {
      return this.initialPurse;
    },
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

teamSchema.statics.handleBid = async function (
  teamName,
  playerId,
  biddingAmount
) {
  const team = await this.findOne({ teamID: teamName });
  console.log("team",teamName,"biddingAmount",biddingAmount);
  if (!team) {
    throw new Error("Team not found.");
  }
  const players=await this.findOne({teamID:teamName})
  console.log(players)
  const playingMembers=players.players
  if(playingMembers.includes(playerId)){
    return new Error(`Player already present in the team...`)
  }
  const playerRole = await Player.findOne({ _id: playerId })
  const role=playerRole.role
  console.log("ROLE",role);
 
  // Update team's data
  team.remainingPurse -= biddingAmount;
  if (team.remainingPurse > 0) {
    console.log("checkpoint");
    team.players.push(playerId);
    if (role === "batsman") {
      team.batsmen = team.batsmen + 1;
    } else if (role === "bowler") {
      team.bowlers = team.bowlers + 1;
    } else if (role === "allrounder") {
      team.allrounder = team.allrounder + 1;
    } else if (role === "wicketkeeper") {
      team.wicketkeeper = team.wicketkeeper + 1;
    }
    const player = await Player.findOne({ _id: playerId }); // Use findOne to find a single document by ID
    // Use findById to find a single document by ID
    console.log("checkpoint2");
    console.log(player);
    if (!player) {
      throw new Error("Player not found.");
    }
    player.soldAmount = biddingAmount;
    player.isSold = true;
    player.soldTeam=teamName;
    await player.save();
    await team.save();
    return team;
  }
  else
  {
    throw new Error("Insufficient Balance to buy a player...")
  }
};

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;