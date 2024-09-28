import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Doctor {
    id: number
    name: string
    specialty: string
    rating: number
    image: string
    availableDays: string[]
  }


export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
  
    return (
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${doctor.name}`} alt={doctor.name} />
            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialization}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <span>Phone: {doctor.phoneNumber}</span>
          </div>
          <div className="flex items-center mb-2">
            <span>Email: {doctor.email}</span>
          </div>
          <Badge variant="outline" className="mt-2">{doctor.department.name}</Badge>
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
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
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
                  <Label htmlFor="reason" className="text-right">Reason</Label>
                  <Input id="reason" placeholder="Reason for visit" className="col-span-3" />
                </div>
              </form>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsBookingOpen(false)}>Confirm Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
  };
  