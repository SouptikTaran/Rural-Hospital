const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    loginSchema,
    signupSchema,
    deletePatientSchema,
} = require('../schemas/patient.schema.js');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
const signup = async (req, res) => {
    const { firstName, lastName, email, gender, password } = req.body;
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors });

    try {
        // Check if the patient already exists
        const existingPatient = await prisma.patient.findUnique({
            where: { email },
        });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient
        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email,
                gender,
                password: hashedPassword,
            },
        });

        // Assuming sendMailQueue is defined elsewhere
        // sendMailQueue(email, firstName + lastName);

        res.status(201).json({ message: 'Patient created successfully', patient });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Error creating patient', error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors });

    try {
        // Find the patient by email
        const patient = await prisma.patient.findUnique({ where: { email } });
        if (!patient) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Delete Patient Controller
const deletePatient = async (req, res) => {
    const { id } = req.params;
    const validation = deletePatientSchema.safeParse(req.params);
    if (!validation.success)
        return res.status(400).json({ message: 'Invalid Data Input' });

    try {
        // Check if the patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(id) },
        });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Delete the patient
        await prisma.patient.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: 'Patient deleted successfully', patient });
    } catch (error) {
        res
            .status(500)
            .json({ message: 'Error deleting patient', error: error.message });
    }
};


// Profile Creation
const patientDetails = async (req, res) => {
    const { address, age, phoneNumber, email } = req.body; // Ensure to receive email for patient identification

    try {
        // Find the patient by email
        const patient = await prisma.patient.findUnique({
            where: { email },
        });

        // If patient does not exist, respond with a 404 error
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update patient details
        const updatedPatient = await prisma.patient.update({
            where: { email },
            data: {
                address,
                age,
                phoneNumber,
            },
        });

        res.status(200).json({ message: 'Patient details updated successfully', patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient details', error: error.message });
    }
};

// Export the controllers
module.exports = {
    signup,
    login,
    deletePatient,
    patientDetails
};
