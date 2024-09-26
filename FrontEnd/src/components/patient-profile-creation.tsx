import { useState } from "react"
import { Mail, Phone, Home, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import toast from "react-hot-toast";
import Cookies from 'js-cookie';

import axios from 'axios';
import { useNavigate } from "react-router-dom"
axios.defaults.withCredentials = true;


const errorNoti = (msg) => {
  toast.error(msg, {
    style: {
      border: '1px solid #FF0000',
      padding: '16px',
      color: '#FFFFFF',
      backgroundColor: '#FF0000',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#FFFFFF',
      secondary: '#FF0000',
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successNoti = (msg: any) => {
  toast.success(msg, {
    style: {
      border: '1px solid #00FF00',
      padding: '16px',
      color: '#FFFFFF',
      backgroundColor: '#00FF00',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#FFFFFF',
      secondary: '#00FF00',
    },
  });
}



export function PatientProfileCreationComponent() {
  const [address, setAddress] = useState("")
  const [age, setAge] = useState()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [notification, setNotification] = useState({ message: "", type: "" })

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile creation logic
    console.log("Profile Creation:", { address, age, phoneNumber, email })
    try {
      const response = await axios.post('http://localhost:8000/update', {
        address, age, phoneNumber, email
      })

      console.log(response)

      if (response.status === 200) {
        successNoti(response.data.message);
        navigate("/dashboard");
      }
      else {
        errorNoti("Error occurred during submitting details");
      }


    } catch (error) {
      console.log(error.response.data.error)
      errorNoti(error.response.data.error)

    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Your Patient Profile</CardTitle>
          <CardDescription className="text-center">Please provide your personal information to complete your profile</CardDescription>
        </CardHeader>
        <CardContent>
          {notification.message && (
            <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {notification.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="pl-10 min-h-[100px]"
                />
                <Home className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="relative">
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="0"
                  max="120"
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="pl-10"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <Button type="submit" className="w-full">Create Profile</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By creating a profile, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}