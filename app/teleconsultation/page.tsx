"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Video,
  CalendarIcon,
  Clock,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Play,
  Users,
  Award,
  Heart,
  Shield,
  Zap,
  Stethoscope,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  location: string
  availability: string
  price: number
  image: string
  bio: string
  languages: string[]
  specializations: string[]
  gender: "male" | "female"
}

interface Appointment {
  id: string
  doctorName: string
  doctorSpecialty: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled" | "in-progress"
  type: "video" | "phone" | "chat"
  reason: string
}

export default function TeleconsultationPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [bookingData, setBookingData] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    type: "video" as "video" | "phone" | "chat",
  })
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const aptToINR = 82.75

  // Mock data - replace with actual API calls
  useEffect(() => {
    const loadDoctors = async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/doctors')
      // const doctorsData = await response.json()

      const mockDoctors: Doctor[] = [
        {
          id: "1",
          name: "Dr. Priya Sharma",
          specialty: "Anxiety & Depression",
          rating: 4.9,
          experience: 12,
          location: "Mumbai, Maharashtra",
          availability: "Available Today",
          price: 1200,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Priya",
          bio: "Specialized in cognitive behavioral therapy with over 12 years of experience helping patients overcome anxiety and depression.",
          languages: ["Hindi", "English", "Marathi"],
          specializations: ["CBT", "Mindfulness", "Trauma Therapy"],
          gender: "female",
        },
        {
          id: "2",
          name: "Dr. Rajesh Kumar",
          specialty: "PTSD & Trauma",
          rating: 4.8,
          experience: 15,
          location: "Delhi, NCR",
          availability: "Next Available: Tomorrow",
          price: 1500,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Rajesh",
          bio: "Expert in trauma-informed care and PTSD treatment using evidence-based approaches.",
          languages: ["Hindi", "English", "Punjabi"],
          specializations: ["EMDR", "Trauma Therapy", "PTSD"],
          gender: "male",
        },
        {
          id: "3",
          name: "Dr. Kavya Reddy",
          specialty: "Relationship Counseling",
          rating: 4.7,
          experience: 8,
          location: "Bangalore, Karnataka",
          availability: "Available Today",
          price: 1000,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Kavya",
          bio: "Passionate about helping couples and individuals build healthier relationships and communication skills.",
          languages: ["English", "Hindi", "Telugu", "Kannada"],
          specializations: ["Couples Therapy", "Family Therapy", "Communication"],
          gender: "female",
        },
        {
          id: "4",
          name: "Dr. Arjun Singh",
          specialty: "Addiction Recovery",
          rating: 4.9,
          experience: 20,
          location: "Chennai, Tamil Nadu",
          availability: "Next Available: Today 3 PM",
          price: 1800,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Arjun",
          bio: "Leading addiction specialist with two decades of experience in substance abuse recovery and rehabilitation.",
          languages: ["English"],
          specializations: ["Addiction Recovery", "Substance Abuse", "Behavioral Therapy"],
          gender: "male",
        },
      ]

      setDoctors(mockDoctors)
    }

    const loadAppointments = async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/appointments/user')
      // const appointmentsData = await response.json()

      const mockAppointments: Appointment[] = [
        {
          id: "1",
          doctorName: "Dr. Sarah Mitchell",
          doctorSpecialty: "Anxiety & Depression",
          date: "2024-01-15",
          time: "10:00 AM",
          status: "in-progress",
          type: "video",
          reason: "Follow-up session for anxiety management",
        },
        {
          id: "2",
          doctorName: "Dr. Michael Chen",
          doctorSpecialty: "PTSD & Trauma",
          date: "2024-01-18",
          time: "2:00 PM",
          status: "upcoming",
          type: "video",
          reason: "Initial consultation for trauma therapy",
        },
        {
          id: "3",
          doctorName: "Dr. Emily Rodriguez",
          doctorSpecialty: "Relationship Counseling",
          date: "2024-01-10",
          time: "11:00 AM",
          status: "completed",
          type: "video",
          reason: "Couples therapy session",
        },
      ]

      setAppointments(mockAppointments)
    }

    loadDoctors()
    loadAppointments()
  }, [])

  const specialties = [
    "all",
    "Anxiety & Depression",
    "PTSD & Trauma",
    "Relationship Counseling",
    "Addiction Recovery",
    "Child Psychology",
    "Eating Disorders",
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty
    const matchesSearch =
      (doctor.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (doctor.specialty?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    return matchesSpecialty && matchesSearch
  })

  const handleBookAppointment = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/appointments/book', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData)
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsBookingOpen(false)
      setIsPaymentDialogOpen(true)
      // Refresh appointments
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoctorPayment = async () => {
    setIsLoading(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Close the payment dialog
      setIsPaymentDialogOpen(false)

      // Optionally, show a success message or redirect the user
      alert("Payment successful! Your appointment is confirmed.")
    } catch (error) {
      console.error("Payment failed:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      case "in-progress":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      case "in-progress":
        return <Play className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getGenderIcon = (gender: "male" | "female") => {
    return gender === "male" ? "👨‍⚕️" : "👩‍⚕️"
  }

  const inProgressAppointment = appointments.find((apt) => apt.status === "in-progress")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">📞 Book a Virtual Mental Health Consultation</h1>
          <p className="text-xl text-slate-600">
            Connect with licensed mental health professionals from the comfort of your home
          </p>
        </div>

        {/* Live Video Call Alert */}
        {inProgressAppointment && (
          <Card className="mb-8 border-orange-200 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Session in Progress</h3>
                    <p className="text-orange-100">
                      {inProgressAppointment.doctorName} • {inProgressAppointment.time}
                    </p>
                  </div>
                </div>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8">
                  <Video className="w-5 h-5 mr-2" />
                  Join Video Call
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="book" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Find Specialists
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              My Appointments
            </TabsTrigger>
          </TabsList>

          {/* Book Appointment Tab */}
          <TabsContent value="book">
            <div className="space-y-6">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          placeholder="Search by doctor name or specialty..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                    <div className="md:w-64">
                      <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                        <SelectTrigger className="h-12">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filter by specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty === "all" ? "All Specialties" : specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctors Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="card-hover border-2 hover:border-blue-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm border-2 border-blue-100">
                            {getGenderIcon(doctor.gender)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                            {doctor.name}
                            <span className="text-lg">{getGenderIcon(doctor.gender)}</span>
                          </CardTitle>
                          <CardDescription className="text-blue-600 font-medium">{doctor.specialty}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">{doctor.experience} years exp</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">{doctor.availability}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doctor.specializations.slice(0, 2).map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {doctor.specializations.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doctor.specializations.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-bold text-slate-800">
                          ₹{doctor.price.toLocaleString("en-IN")}/session
                        </div>
                        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setSelectedDoctor(doctor)
                                setBookingData({ ...bookingData, doctorId: doctor.id })
                              }}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Book Session
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
                              <DialogDescription>Schedule a session with {selectedDoctor?.name}</DialogDescription>
                            </DialogHeader>

                            {selectedDoctor && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                                  <img
                                    src={selectedDoctor.image || "/placeholder.svg"}
                                    alt={selectedDoctor.name}
                                    className="w-12 h-12 rounded-full"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-slate-800">{selectedDoctor.name}</h3>
                                    <p className="text-blue-600">{selectedDoctor.specialty}</p>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label>Select Date</Label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full justify-start text-left font-normal h-11 bg-transparent"
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar
                                          mode="single"
                                          selected={selectedDate}
                                          onSelect={setSelectedDate}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Select Time</Label>
                                    <Select
                                      value={bookingData.time}
                                      onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
                                    >
                                      <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Choose time" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="09:00">9:00 AM</SelectItem>
                                        <SelectItem value="10:00">10:00 AM</SelectItem>
                                        <SelectItem value="11:00">11:00 AM</SelectItem>
                                        <SelectItem value="14:00">2:00 PM</SelectItem>
                                        <SelectItem value="15:00">3:00 PM</SelectItem>
                                        <SelectItem value="16:00">4:00 PM</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Session Type</Label>
                                  <Select
                                    value={bookingData.type}
                                    onValueChange={(value: "video" | "phone" | "chat") =>
                                      setBookingData({ ...bookingData, type: value })
                                    }
                                  >
                                    <SelectTrigger className="h-11">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">
                                        <div className="flex items-center gap-2">
                                          <Video className="w-4 h-4" />
                                          Video Call
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="phone">
                                        <div className="flex items-center gap-2">
                                          <Phone className="w-4 h-4" />
                                          Phone Call
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="chat">
                                        <div className="flex items-center gap-2">
                                          <MessageCircle className="w-4 h-4" />
                                          Text Chat
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="reason">Reason for Consultation</Label>
                                  <Textarea
                                    id="reason"
                                    placeholder="Please describe what you'd like to discuss in this session..."
                                    value={bookingData.reason}
                                    onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                                    className="min-h-24"
                                  />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                  <div>
                                    <span className="text-lg font-bold text-slate-800">
                                      Total: ₹{selectedDoctor.price.toLocaleString("en-IN")}
                                    </span>
                                    <p className="text-sm text-slate-600">50-minute session</p>
                                  </div>
                                  <Button
                                    onClick={handleBookAppointment}
                                    disabled={isLoading || !selectedDate || !bookingData.time}
                                    size="lg"
                                    className="px-8"
                                  >
                                    {isLoading ? "Booking..." : "Confirm Booking"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No specialists found</h3>
                    <p className="text-slate-600">
                      Try adjusting your search criteria or browse all available specialists.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* My Appointments Tab */}
          <TabsContent value="appointments">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>Manage your scheduled mental health consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments
                      .filter((apt) => apt.status === "upcoming" || apt.status === "in-progress")
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              {appointment.type === "video" && <Video className="w-6 h-6 text-blue-600" />}
                              {appointment.type === "phone" && <Phone className="w-6 h-6 text-blue-600" />}
                              {appointment.type === "chat" && <MessageCircle className="w-6 h-6 text-blue-600" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{appointment.doctorName}</h3>
                              <p className="text-sm text-slate-600">{appointment.doctorSpecialty}</p>
                              <p className="text-sm text-slate-500 mt-1">{appointment.reason}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusIcon(appointment.status)}
                                <span className="ml-1 capitalize">{appointment.status.replace("-", " ")}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {format(new Date(appointment.date), "MMM dd, yyyy")} at {appointment.time}
                            </p>
                            {appointment.status === "in-progress" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Video className="w-4 h-4 mr-1" />
                                Join Now
                              </Button>
                            )}
                            {appointment.status === "upcoming" && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {appointments.filter((apt) => apt.status === "upcoming" || apt.status === "in-progress").length ===
                      0 && (
                      <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">No upcoming appointments</h3>
                        <p className="text-slate-500">Book a session with one of our specialists to get started.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Past Appointments
                  </CardTitle>
                  <CardDescription>Your consultation history and session notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments
                      .filter((apt) => apt.status === "completed" || apt.status === "cancelled")
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                              {appointment.type === "video" && <Video className="w-6 h-6 text-slate-500" />}
                              {appointment.type === "phone" && <Phone className="w-6 h-6 text-slate-500" />}
                              {appointment.type === "chat" && <MessageCircle className="w-6 h-6 text-slate-500" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{appointment.doctorName}</h3>
                              <p className="text-sm text-slate-600">{appointment.doctorSpecialty}</p>
                              <p className="text-sm text-slate-500 mt-1">{appointment.reason}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1 capitalize">{appointment.status}</span>
                            </Badge>
                            <p className="text-sm text-slate-600">
                              {format(new Date(appointment.date), "MMM dd, yyyy")} at {appointment.time}
                            </p>
                            {appointment.status === "completed" && (
                              <Button size="sm" variant="outline">
                                View Notes
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-slate-800">
              🌟 Why Choose MediMate Teleconsultation?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">HIPAA Compliant</h3>
                <p className="text-sm text-slate-600">Your privacy and data security are our top priority</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Licensed Professionals</h3>
                <p className="text-sm text-slate-600">All therapists are licensed and verified specialists</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Instant Access</h3>
                <p className="text-sm text-slate-600">Book and start sessions within minutes</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Personalized Care</h3>
                <p className="text-sm text-slate-600">Tailored treatment plans for your unique needs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>
                Please confirm your payment details to proceed with the consultation.
              </DialogDescription>
            </DialogHeader>

            {selectedDoctor ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span className="font-medium">Consultation Fee</span>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{selectedDoctor.price.toLocaleString("en-IN")}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {(selectedDoctor.price / aptToINR).toFixed(4)} APT
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection (Placeholder) */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Payment Method</h4>
                  <p className="text-sm text-slate-600">
                    We currently only support APT payments. More payment options coming soon!
                  </p>
                </div>

                {/* Confirm and Pay Button */}
                <Button
                  onClick={handleDoctorPayment}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Confirm & Pay ₹{selectedDoctor.price.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600">No doctor selected for payment.</p>
                <Button onClick={() => setIsPaymentDialogOpen(false)} className="mt-4">
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
