const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    loginSchema,
    signupSchema,
    deletePatientSchema,
} = require('../schemas/patient.schema.js');
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
const signup = async (req, res) => {
    const { firstName, lastName, email, gender, password } = req.body;
    // console.log(req.body)
    // Validate the request data
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        // console.error("Validation Error:", validation.error.errors); 
        return res.status(400).json({
            error: 'Invalid Data Input',
            errors: validation.error.errors,
        });
    }

    try {
        // Check if the patient already exists
        const existingPatient = await prisma.patient.findUnique({ where: { email } });
        if (existingPatient) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient in the database
        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email,
                gender,
                password: hashedPassword,
            },
        });

        // Generate a JWT token for the newly created patient
        const token = jwt.sign(
            { email: patient.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Patient created successfully',
            patient,
            token,
        });
    } catch (error) {
        console.error("Error Creating Patient:", error.message);
        res.status(500).json({
            error: 'Error creating patient',
            message: error.message,
        });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate the login data
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        console.error("Validation Error:", validation.error.errors);
        return res.status(400).json({
            error: 'Invalid Data Input',
            errors: validation.error.errors,
        });
    }

    try {
        // Check if the patient exists
        const patient = await prisma.patient.findUnique({ where: { email } });
        if (!patient) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({
            error: 'Error logging in',
            message: error.message,
        });
    }
};

// Delete Patient Controller
const deletePatient = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    const validation = deletePatientSchema.safeParse(req.params);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid Data Input' });
    }

    try {
        // Check if the patient exists
        const patient = await prisma.patient.findUnique({ where: { id: parseInt(id) } });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Delete the patient
        await prisma.patient.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: 'Patient deleted successfully', patient });
    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({
            error: 'Error deleting patient',
            message: error.message,
        });
    }
};

// Update Patient Profile Controller
const patientDetails = async (req, res) => {
    const { address, age, phoneNumber, email } = req.body;

    try {
        // Find the patient by email
        const patient = await prisma.patient.findUnique({ where: { email } });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Update the patient details
        const updatedPatient = await prisma.patient.update({
            where: { email },
            data: { address, age, phoneNumber },
        });

        res.status(200).json({
            message: 'Patient details updated successfully',
            patient: updatedPatient,
        });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({
            error: 'Error updating patient details',
            message: error.message,
        });
    }
};

const predict = async (req, res) => {
    const { selectedSymptoms } = req.body;
    console.log(selectedSymptoms)
    // Convert symptoms string to a single string, not an array
    const symptomsString = selectedSymptoms
        // .split(',')
        .map(symptom => symptom.trim())
        .filter(symptom => symptom !== '')
        .join(', '); // Join back into a single string

    try {
        // const response = await fetch('http://python-ml:5000/predict', {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms: symptomsString }), // Send as a single string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Send the response back to the original request
        res.json(data);
    } catch (error) {
        console.error('Error calling predict endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Exporting the controllers
module.exports = {
    signup,
    login,
    deletePatient,
    patientDetails,
    predict
}