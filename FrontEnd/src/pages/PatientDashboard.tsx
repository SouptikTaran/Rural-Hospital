"use client"

import { useState } from "react"
import { Bell, ChevronDown, Mic, Phone, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate AI diagnosis (replace with actual AI integration)
    setDiagnosis("Based on your symptoms, you may have a common cold. Please consult a doctor for confirmation.")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rural Healthcare Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                English <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिन्दी (Hindi)</DropdownMenuItem>
              <DropdownMenuItem>বাংলা (Bengali)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Symptom Input & Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSymptomSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit">Analyze Symptoms</Button>
            </form>
            {diagnosis && (
              <div className="mt-4 rounded-lg bg-blue-100 p-4 text-blue-800">
                <h3 className="font-semibold">AI Diagnosis:</h3>
                <p>{diagnosis}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nearest Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["City Hospital", "Rural Health Center", "Community Clinic"].map((hospital) => (
                <li key={hospital} className="rounded-lg border p-4">
                  <h3 className="font-semibold">{hospital}</h3>
                  <p className="text-sm text-gray-500">5 km away • 15 min travel time</p>
                  <p className="mt-2 text-sm">Available treatments: General Medicine, Pediatrics</p>
                  <Button className="mt-2" size="sm">
                    Book Appointment
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Profile & History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Last checkup: 3 months ago</li>
              <li>Allergies: None</li>
              <li>Chronic conditions: None</li>
            </ul>
            <Button className="mt-4" variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Tips & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Malaria Season Alert</Badge>
            <p className="text-sm">
              Protect yourself from mosquito bites by using insect repellent and sleeping under a mosquito net.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Emergency & Ambulance Services</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-4 w-4" /> Call Emergency Services
            </Button>
            <Button variant="outline" size="lg">
              Chat with Health Worker
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Dr. Smith - General Checkup (Tomorrow, 10:00 AM)</li>
              <li>Vaccination Drive (Next Week, Wednesday)</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <Button variant="link" size="sm">
          <Settings className="mr-2 h-4 w-4" /> Accessibility Settings
        </Button>
      </footer>
    </div>
  )
}