import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Star, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for Leaflet's default icon path issues with webpack
// delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  image: string
  availableDays: string[]
}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  position: [number, number]
  doctors: Doctor[]
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Main St, Cityville, State 12345",
    phone: "(123) 456-7890",
    position: [40.7128, -74.0060],
    doctors: [
      {
        id: 101,
        name: "Dr. John Smith",
        specialty: "Cardiology",
        rating: 4.8,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Monday", "Wednesday", "Friday"]
      },
      {
        id: 102,
        name: "Dr. Emily Johnson",
        specialty: "Pediatrics",
        rating: 4.9,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Tuesday", "Thursday", "Saturday"]
      }
    ]
  },
  {
    id: 2,
    name: "Rural Health Center",
    address: "456 Country Rd, Ruraltown, State 67890",
    phone: "(987) 654-3210",
    position: [41.8781, -87.6298],
    doctors: [
      {
        id: 201,
        name: "Dr. Michael Brown",
        specialty: "Family Medicine",
        rating: 4.7,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Monday", "Tuesday", "Wednesday"]
      },
      {
        id: 202,
        name: "Dr. Sarah Davis",
        specialty: "Obstetrics",
        rating: 4.9,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Thursday", "Friday", "Saturday"]
      }
    ]
  },
  {
    id: 3,
    name: "Suburban Medical Institute",
    address: "789 Suburb Ave, Suburbville, State 13579",
    phone: "(456) 789-0123",
    position: [34.0522, -118.2437],
    doctors: [
      {
        id: 301,
        name: "Dr. Robert Wilson",
        specialty: "Orthopedics",
        rating: 4.6,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Monday", "Wednesday", "Friday"]
      },
      {
        id: 302,
        name: "Dr. Lisa Taylor",
        specialty: "Neurology",
        rating: 4.8,
        image: "/placeholder.svg?height=100&width=100",
        availableDays: ["Tuesday", "Thursday", "Saturday"]
      }
    ]
  }
]

const HospitalCard = ({ hospital, onSelect }: { hospital: Hospital; onSelect: () => void }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        {isClient && (
          <div className="w-full h-48">
            <MapContainer center={hospital.position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={hospital.position}>
                <Popup>{hospital.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle>{hospital.name}</CardTitle>
        <CardDescription className="mt-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{hospital.address}</span>
          </div>
          <div className="flex items-center mt-1">
            <Phone className="w-4 h-4 mr-2" />
            <span>{hospital.phone}</span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full">Select Hospital</Button>
      </CardFooter>
    </Card>
  )
}

const DoctorCard = ({ doctor, hospitalName }: { doctor: Doctor; hospitalName: string }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{doctor.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Available: {doctor.availableDays.join(', ')}</span>
        </div>
        <Badge variant="outline" className="mt-2">{hospitalName}</Badge>
      </CardContent>
      <CardFooter>
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Book Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
              <DialogDescription>
                Fill out the form below to book your appointment. We'll confirm your booking via email.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                  Reason
                </Label>
                <Input
                  id="reason"
                  placeholder="Reason for visit"
                  className="col-span-3"
                />
              </div>
            </form>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsBookingOpen(false)}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export function HospitalDoctorSelectionComponent() {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {selectedHospital ? (
          <>
            <div className="flex items-center mb-8">
              <Button
                variant="outline"
                onClick={() => setSelectedHospital(null)}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Hospitals
              </Button>
              <h1 className="text-3xl font-bold">Select a Doctor at {selectedHospital.name}</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selectedHospital.doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} hospitalName={selectedHospital.name} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-10">Select a Hospital</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onSelect={() => setSelectedHospital(hospital)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}