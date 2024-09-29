const router = require('express').Router()
const patientController = require("../controllers/patient.controller")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const haversine = require('haversine-distance');

router.post('/login', patientController.login)
router.post('/signup', patientController.signup)
router.post('/delete/:id', patientController.deletePatient)
router.post('/update', patientController.patientDetails)
router.post('/predict', patientController.predict)


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



router.post("/getdata", async (req, res) => {
    const { specialization } = req.body;

    try {
        const doctors = await prisma.doctor.findMany({
            where: {
                specialization: specialization, // Filter doctors by specialization
            },
            include: {
                department: {
                    include: {
                        hospital: true, // Include the hospital associated with the doctor's department
                    },
                },
            },
        });

        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors and hospitals:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});



router.post('/gethospitals', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Fetch all hospitals from the database with required fields
        const hospitals = await prisma.hospital.findMany({
            select: {
                id: true,
                name: true,
                location: true,
                latitude: true,
                longitude: true,
            },
        });

        const userLocation = { latitude, longitude };

        // Calculate distances for each hospital
        const hospitalsWithDistance = hospitals.map((hospital) => {
            const hospitalLocation = {
                latitude: hospital.latitude,
                longitude: hospital.longitude,
            };

            // Calculate distance in meters
            const distanceInMeters = haversine(userLocation, hospitalLocation);

            // Convert distance to kilometers
            const distanceInKilometers = distanceInMeters / 1000;

            // Return hospital details along with distance in kilometers
            return { ...hospital, distanceInKilometers };
        });

        // Optionally filter hospitals within a specific range (e.g., 50 km)
        const nearbyHospitals = hospitalsWithDistance
            .filter((hospital) => hospital.distanceInKilometers <= 1000) // 50 km
            .sort((a, b) => a.distanceInKilometers - b.distanceInKilometers); // Sort by nearest

        // Send response with nearby hospitals
        res.json({ hospitals: nearbyHospitals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve hospitals' });
    }
});


module.exports = router