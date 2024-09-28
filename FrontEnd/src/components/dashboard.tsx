import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import { LogOutButton } from "./logout"
import { Bell, ChevronDown, Mic, Phone, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'react-toastify';
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useLocation } from "@/Contexts/LocationContext"

interface Data {
  id: string; // Unique identifier for the data
  disease: string; // Name of the disease
  cure: string; // Suggested cure
  doctor: string; // Name of the doctor
  probability: string; // Probability of the disease (string to match your existing code)
  risk_level: string; // Risk level (e.g., Low, Medium, High)
}
export function DashboardComponent() {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState([]);
  const { location, setLocation } = useLocation(); // Use context to get location and setLocation

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, [setLocation]);


  const navigate = useNavigate()
  const handleSymptomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post("http://localhost:8000/predict", {
          symptoms,
          location // Include location if needed
        }),
        {
          pending: 'Analyzing symptoms...',
          success: {
            render({ data }) {
              // Ensure data is accessible
              return 'Analysis successful! 🎉';
            }
          },
          error: {
            render({ data }) {
              console.error(data); // Log the error data for debugging
              return 'Analysis failed. 🤯';
            }
          }
        }
      );
      setResult(response.data)
      console.log(response.data);
      console.log(location);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleBookAppointment = (data: Data) => {
    navigate('/booking', { state: { selectedData: data } });  // Pass data using state
  };


  const handleChange = () => {
    navigate('/details')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <header className="mb-6 flex items-center justify-between fixed top-0 left-0 w-full bg-white shadow z-50 p-4">
        <h1 className="text-2xl font-bold text-[#44457d]">Rural Healthcare Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4 text-[#44457d]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-[#44457d]">
                English <ChevronDown className="ml-2 h-4 w-4" />
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

      {/* Main Content */}
      <main className="grid gap-6 md:grid-cols-3 pt-20 px-4">
        {/* Symptom Input & Diagnosis */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#44457d]">Symptom Input & Diagnosis</CardTitle>
          </CardHeader>
          <CardContent >
            <form onSubmit={handleSymptomSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Mic className="h-4 w-4 text-[#44457d]" />
                </Button>
              </div>
              <Button className="bg-[#5046e3]" type="submit">Analyze Symptoms</Button>
            </form>
            {/* {diagnosis && (
              <div className="mt-4 rounded-lg bg-blue-100 p-4 text-blue-800">
                <h3 className="font-semibold">AI Diagnosis:</h3>
                <p>{diagnosis}</p>
              </div>
            )} */}
            {result && result.map((data: Data) => (
              <div key={data.id} className="p-6 bg-white border rounded-lg shadow mb-4">
                <h5 className="text-2xl font-bold">{data.disease}</h5>
                <p><strong>Cure:</strong> {data.cure}</p>
                <p><strong>Doctor:</strong> {data.doctor}</p>
                <p><strong>Probability:</strong> {parseFloat(data.probability) * 100} %</p>
                <p><strong>Risk Level:</strong> {data.risk_level}</p>
                <Button onClick={() => handleBookAppointment(data)} className="bg-[#7750ed] text-white mt-4">
                  Book Appointment
                </Button>
              </div>
            ))}

          </CardContent>
        </Card>

        {/* Nearest Hospitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#44457d]">Nearest Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
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
            <ul className="space-y-2">
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
          <CardContent className="flex justify-between">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-4 w-4 " /> Call Emergency Services
            </Button>
            <Button variant="outline" size="lg" className="text-[#5046e3]">
              Chat with Health Worker
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#5046e3]">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2  text-[#44457d]">
              <li>Dr. Smith - General Checkup (Tomorrow, 10:00 AM)</li>
              <li>Vaccination Drive (Next Week, Wednesday)</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <Button variant="link" size="sm">
          <Settings className="mr-2 h-4 w-4" /> Accessibility Settings
        </Button>
      </footer>
    </div>
  )
}
