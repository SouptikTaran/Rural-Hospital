const router = require('express').Router()
const patientController = require("../controllers/patient.controller")


router.post('/login', patientController.login)
router.post('/signup', patientController.signup)
router.post('/delete/:id', patientController.deletePatient)
router.post('/update' , patientController.patientDetails)

module.exports = router