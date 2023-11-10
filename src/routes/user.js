const express = require("express")

const router = express.Router();


const {registration, login, logout, edit} = require("../controllers/userController")

router.post("/registration", registration);
router.post("/login",login);
router.post("/logout",logout);
router.post("/edit",edit)

module.exports= router;