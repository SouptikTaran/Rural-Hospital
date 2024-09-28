const router = require('express').Router()
const patientController = require("../controllers/patient.controller")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/login', patientController.login)
router.post('/signup', patientController.signup)
router.post('/delete/:id', patientController.deletePatient)
router.post('/update' , patientController.patientDetails)
router.post('/predict' , patientController.predict)


router.post('/hospitals', async (req, res) => {
  const { name, location, latitude, longitude, departments } = req.body;
    console.log(req.body);
  try {
      const hospital = await prisma.hospital.create({
          data: {
              name,
              location,
              latitude,
              longitude,
              departments: {
                  create: departments.map(department => ({
                      name: department.name,
                      doctors: {
                          create: department.doctors.map(doctor => ({
                              name: doctor.name,
                              specialization: doctor.specialization,
                              phoneNumber: doctor.phoneNumber,
                              email: doctor.email,
                          })),
                      },
                  })),
              },
          },
      });

      return res.status(201).json(hospital);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});
    
module.exports = router