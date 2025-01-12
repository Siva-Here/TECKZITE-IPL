const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "nationality": {
        type: String,
        required: true
    },
    "age": {
        type: Number,
        required: true
    },
    "role": {
        type: String,
        required: true,
        enum:{
            values:["batsman","bowler","wicketkeeper","allrounder"],
            message:"The player must be either batsman or bowler or wicketkeeper or allrounder"
        }
    },
    "runs": {
        type: Number,
        required: false
    },
    "wickets": {
        type: Number,
        required: false
    },
    "isDebut": {
        type: Boolean,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "basePrice": {
        type: Number,
        default: 50000
    },
    "strikeRate": {
        type: String,
        required: false
    },
    "isSold":{
        type:Boolean,
        default:false
    },
    "soldTeam":{
        type:String,
        default:null
    },
    "soldAmount":{
        type:Number,
        default:function(){
            return this.basePrice
        }
    },
    "bidplace":{
        type:Number,
    }
});

playerSchema.pre('save', function(next) {
    if (this.role === 'batsman') {
        this.wickets = undefined;
        this.runs = this.runs || 0; 
    }
    this.soldAmount=this.basePrice
    next();
});


const Player = mongoose.model('Player', playerSchema);
module.exports =Player