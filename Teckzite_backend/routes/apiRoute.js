const router=require('express').Router()
const apiController=require('../controllers/apiController')
const authenticateAdmin = require('../middleware/auth');

router.get('/players',apiController.getplayers);
router.get('/playersToBuy',apiController.playersToBuy);
router.get('/soldPlayers',apiController.soldPlayers);
router.get('/getTeams',apiController.getTeams);

router.post('/player',authenticateAdmin,apiController.upload.single('image'),apiController.player);
router.post("/createTeam",authenticateAdmin,apiController.createTeam);
router.post('/bid',authenticateAdmin,apiController.bid);
router.delete('/deleteTeam',authenticateAdmin,apiController.deleteTeam);

module.exports = router;
