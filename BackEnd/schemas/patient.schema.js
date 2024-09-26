// import { z } from 'zod'
const z = require('zod')

// Schema for Signup
module.exports.signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['Male', 'Female', 'Other'], 'Invalid gender value'), // Adjust if needed
  password: z.string().min(1, 'Password must be at least 1 characters long'),
})

// Schema for Login
module.exports.loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Schema for Delete Patient
module.exports.deletePatientSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be a valid number')
    .transform((val) => parseInt(val, 10)), // Converts the ID to an integer
})