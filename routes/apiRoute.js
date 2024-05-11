const router=require('express').Router()
const routeController=require('../controllers/routerController')

router.route("/login").post(routeController.adminLogin)
router.route("/player").post(routeController.createPlayer)