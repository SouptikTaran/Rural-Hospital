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
    const { specialization, location } = req.body; // Expect location to be { latitude, longitude }

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

        // Calculate distance for each hospital and append it to the hospital object
        const doctorsWithDistance = doctors.map(doctor => {
            if (doctor.department && doctor.department.hospital) {
                const { latitude, longitude } = doctor.department.hospital; // Ensure latitude and longitude are present in the hospital data

                // Create points for haversine distance calculation
                const pointA = { latitude: location.latitude, longitude: location.longitude };
                const pointB = { latitude: latitude, longitude: longitude };
                console.log(pointA ,pointB)

                // Calculate distance using haversine
                const distance = haversine(pointA, pointB); // Distance in meters

                return {
                    ...doctor,
                    department: {
                        ...doctor.department,
                        hospital: {
                            ...doctor.department.hospital,
                            distance: distance / 1000 // Convert to kilometers
                        }
                    }
                };
            }
            return doctor; // Return doctor as is if hospital data is missing
        });

        res.status(200).json(doctorsWithDistance); // Return doctors with distances
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

router.get('/demo' , (req , res)=>{
    res.json("Server listening and active");
})


module.exports = router