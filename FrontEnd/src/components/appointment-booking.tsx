import { useState, useEffect } from "react"
import { Calendar as CalendarIcon, Clock, Hospital, User, Stethoscope, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

export function AppointmentBookingComponent() {
  const [step, setStep] = useState(1)
  const [diseaseName, setDiseaseName] = useState("")
  const [department, setDepartment] = useState("")
  const [doctor, setDoctor] = useState("")
  const [hospital, setHospital] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [notification, setNotification] = useState({ message: "", type: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Appointment Booking:", { diseaseName, department, doctor, hospital, date, time, additionalNotes })
    setNotification({ message: "Your appointment has been successfully booked.", type: "success" })
    setIsSubmitting(false)
    setStep(4) // Move to confirmation step
  }

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s <= step ? 'bg-[#5046e3] text-white' : 'bg-gray-200 text-gray-500'}`}>
            {s < step ? <CheckCircle className="w-6 h-6" /> : s}
          </div>
          <span className={`mt-2 text-sm ${s <= step ? 'text-[#5046e3]' : 'text-gray-500'}`}>
            {s === 1 ? 'Details' : s === 2 ? 'Doctor' : 'Schedule'}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5046e3] to-[#8e86ff] p-4">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="bg-white rounded-t-lg border-b-4 border-[#5046e3]">
          <CardTitle className="text-4xl font-bold text-center text-[#5046e3]">Book an Appointment</CardTitle>
          <CardDescription className="text-center text-gray-600">Your health, our priority</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <AnimatePresence mode="wait">
            {notification.message && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`mb-6 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diseaseName" className="text-[#5046e3] font-semibold">Potential Disease Name</Label>
                      <div className="relative">
                        <Input
                          id="diseaseName"
                          placeholder="Enter potential disease name"
                          value={diseaseName}
                          onChange={(e) => setDiseaseName(e.target.value)}
                          required
                          className="pl-10 border-[#5046e3] focus:ring-[#5046e3]"
                        />
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-[#5046e3] font-semibold">Department</Label>
                      <div className="relative">
                        <Select value={department} onValueChange={setDepartment} required>
                          <SelectTrigger id="department" className="pl-10 border-[#5046e3]">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="general">General Medicine</SelectItem>
                          </SelectContent>
                        </Select>
                        <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                      </div>
                    </div>
                  </div>
                  <Button type="button" onClick={() => setStep(2)} className="mt-6 w-full bg-[#5046e3] hover:bg-[#4038b0] text-white">Next</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor" className="text-[#5046e3] font-semibold">Doctor</Label>
                      <div className="relative">
                        <Select value={doctor} onValueChange={setDoctor} required>
                          <SelectTrigger id="doctor" className="pl-10 border-[#5046e3]">
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                            <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                            <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                          </SelectContent>
                        </Select>
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital" className="text-[#5046e3] font-semibold">Hospital</Label>
                      <div className="relative">
                        <Select value={hospital} onValueChange={setHospital} required>
                          <SelectTrigger id="hospital" className="pl-10 border-[#5046e3]">
                            <SelectValue placeholder="Select hospital" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="city-hospital">City Hospital</SelectItem>
                            <SelectItem value="rural-health-center">Rural Health Center</SelectItem>
                            <SelectItem value="community-clinic">Community Clinic</SelectItem>
                          </SelectContent>
                        </Select>
                        <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button type="button" onClick={() => setStep(1)} variant="outline" className="w-[48%]">Back</Button>
                    <Button type="button" onClick={() => setStep(3)} className="w-[48%] bg-[#5046e3] hover:bg-[#4038b0] text-white">Next</Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#5046e3] font-semibold">Appointment Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal pl-10 border-[#5046e3]">
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="rounded-md border border-[#5046e3]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-[#5046e3] font-semibold">Appointment Time</Label>
                      <div className="relative">
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          required
                          className="pl-10 border-[#5046e3] focus:ring-[#5046e3]"
                        />
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5046e3]" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes" className="text-[#5046e3] font-semibold">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Any additional information or special requests"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="min-h-[100px] border-[#5046e3] focus:ring-[#5046e3]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button type="button" onClick={() => setStep(2)} variant="outline" className="w-[48%]">Back</Button>
                    <Button type="submit" disabled={isSubmitting} className="w-[48%] bg-[#5046e3] hover:bg-[#4038b0] text-white">
                      {isSubmitting ? 'Booking...' : 'Book Appointment'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#5046e3] mb-2">Appointment Confirmed!</h2>
                  <p className="text-gray-600 mb-6">Your appointment has been successfully booked. We look forward to seeing you.</p>
                  <Button onClick={() => setStep(1)} className="bg-[#5046e3] hover:bg-[#4038b0] text-white">Book Another Appointment</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By booking an appointment, you agree to our{" "}
            <a href="#" className="text-[#5046e3] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#5046e3] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}