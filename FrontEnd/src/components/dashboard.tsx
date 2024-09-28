import { useState } from "react"
import { LogOutButton } from "./logout"
import { Bell, ChevronDown, Mic, Phone, Settings, Menu, X } from "lucide-react"
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
import { useNavigate } from "react-router-dom"

export function DashboardComponent() {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)  // State to toggle the menu
  const navigate = useNavigate()

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDiagnosis("Based on your symptoms, you may have a common cold. Please consult a doctor for confirmation.")
  }

  const handleChange = () => {
    navigate('/details')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen) // Toggle menu state
  }

  return (
    <div className="flex flex-col max-w-full gap-[20px] overflow-x-hidden bg-gray-100">
      {/* Fixed Navbar */}
      <header className="flex items-center justify-around md:justify-between fixed top-0 left-0 w-full bg-white shadow z-50 p-4">
        <h1 className="md:text-2xl font-bold text-[#44457d] text-md">Empowering Rural Healthcare Dashboard</h1>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <Button variant="outline" onClick={toggleMenu}>
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center w-[45%] md:w-[20%] justify-evenly">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4 text-[#44457d]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-[#44457d]">
                English <ChevronDown className=" h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#44457d]">
              <DropdownMenuItem className="text-[#44457d]">English</DropdownMenuItem>
              <DropdownMenuItem className="text-[#44457d]">हिन्दी (Hindi)</DropdownMenuItem>
              <DropdownMenuItem className="text-[#44457d]">বাংলা (Bengali)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="text-[#44457d]">U</AvatarFallback>
          </Avatar>
          <LogOutButton />
        </div>
      </header>

      {/* Full-screen overlay menu when open */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 right-0 bg-white w-64 h-full shadow-lg p-4">
            <Button variant="ghost" onClick={toggleMenu} className="absolute top-4 right-4">
              <X className="h-6 w-6 text-[#44457d] " />
            </Button>
            <nav className="mt-[50px] flex flex-col gap-5 ">
                  <Button variant="outline" size="icon" className="flex gap-5 items-center border w-[100%]">
                    <Bell className="h-4 w-4 text-[#44457d]" />
                    <div className="text-[#44457d]">Notification</div>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="text-[#44457d]">
                            English <ChevronDown className=" h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-[#44457d]">
                      <DropdownMenuItem className="text-[#44457d]">English</DropdownMenuItem>
                      <DropdownMenuItem className="text-[#44457d]">हिन्दी (Hindi)</DropdownMenuItem>
                      <DropdownMenuItem className="text-[#44457d]">বাংলা (Bengali)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="w-full rounded-md border flex items-center justify-center gap-6 p-1">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="text-[#44457d]">U</AvatarFallback>
                  </Avatar>
                  <div className="text-[#44457d] text-sm">Profile</div>
                </div>
                <div className="w-full rounded-md border flex items-center justify-center gap-6 p-1">
                    <LogOutButton />
                    <div className="text-[#44457d] text-sm">Logout</div>
                </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="grid md:grid-cols-3 grid-cols-1 pt-20 px-4 max-w-full gap-[20px]">
        {/* Symptom Input & Diagnosis */}
        <Card className="md:col-span-2 mt-6">
          <CardHeader>
            <CardTitle className="text-[#44457d]">Symptom Input & Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSymptomSubmit} className="flex flex-col gap-5 ">
              <div className="flex justify-between">
                <Input
                  className="w-[95%]"
                  placeholder="Enter your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Mic className="h-4 w-4 text-[#44457d]" />
                </Button>
              </div>
              <Button className="bg-[#5046e3] w-[45%] md:w-[20%] " type="submit">Analyze Symptoms</Button>
            </form>
            {diagnosis && (
              <div className="mt-4 rounded-lg bg-blue-100 p-4 text-blue-800">
                <h3 className="font-semibold">AI Diagnosis:</h3>
                <p>{diagnosis}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nearest Hospitals */}
        <Card className="md:mt-6 ">
          <CardHeader>
            <CardTitle className="text-[#44457d] ">Nearest Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-[20px] ">
              {["City Hospital", "Rural Health Center", "Community Clinic"].map((hospital) => (
                <li key={hospital} className="rounded-lg border p-4">
                  <h3 className="font-semibold text-[#7750ed]">{hospital}</h3>
                  <p className="text-sm text-gray-500">5 km away • 15 min travel time</p>
                  <p className="mt-2 text-sm text-[#44457d]">Available treatments: General Medicine, Pediatrics</p>
                  <Button className="mt-2 bg-[#5046e3]" size="sm">
                    Book Appointment
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Health Profile & History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#44457d]">Health Profile & History</CardTitle>
          </CardHeader>
          <CardContent className="text-[#6e6da9]">
            <ul className="gap-[20px]">
              <li>Last checkup: 3 months ago</li>
              <li>Allergies: None</li>
              <li>Chronic conditions: None</li>
            </ul>
            <Button className="mt-4 text-[#7750ed]" variant="outline" onClick={handleChange}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Health Tips & Alerts */}
        <Card>
          <CardHeader >
            <CardTitle className="text-[#44457d]">Health Tips & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4 bg-[#5046e3]">Malaria Season Alert</Badge>
            <p className="text-sm text-[#6e6da9]">
              Protect yourself from mosquito bites by using insect repellent and sleeping under a mosquito net.
            </p>
          </CardContent>
        </Card>

        {/* Emergency & Ambulance Services */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#5046e3]">Emergency & Ambulance Services</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between flex-col gap-[10px] md:flex-row ">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 gap-3">
              <Phone className=" h-4 w-4 " /> Call Emergency Services
            </Button>
            <Button variant="outline" size="lg" className="text-[#5046e3]">
              Chat with Health Worker
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="max-w-full">
          <CardHeader>
            <CardTitle className="text-[#5046e3]">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className=" text-[#44457d]">
              <li>Dr. Smith - General Checkup (Tomorrow, 10:00 AM)</li>
              <li>Vaccination Drive (Next Week, Wednesday)</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className=" max-w-full text-center text-sm text-gray-500">
        <Button variant="link" size="sm">
          <Settings className="mr-2 h-4 w-4" /> Accessibility Settings
        </Button>
      </footer>
    </div>
  )
}
