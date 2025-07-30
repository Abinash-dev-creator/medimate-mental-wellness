"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import {
  CalendarIcon,
  Clock,
  Star,
  MapPin,
  Phone,
  Video,
  MessageCircle,
  User,
  Mail,
  FileText,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Brain,
  Heart,
  Shield,
} from "lucide-react"
import { format } from "date-fns"

interface Doctor {
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  experience: number
  consultationFee: number
  aptFee: number
  location: string
  languages: string[]
  availableDays: string[]
  timeSlots: string[]
  about: string
  education: string[]
  achievements: string[]
  consultationTypes: ("video" | "audio" | "chat")[]
}

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  reason: string
  status: "upcoming" | "completed" | "cancelled"
  consultationType: "video" | "audio" | "chat"
  fee: number
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rohan Sharma",
    specialty: "Psychiatry",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    experience: 12,
    consultationFee: 800,
    aptFee: 0.15,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    about:
      "Dr. Rohan Sharma is a renowned psychiatrist with over 12 years of experience in treating anxiety, depression, and stress-related disorders. He specializes in cognitive behavioral therapy and mindfulness-based interventions.",
    education: [
      "MBBS - King Edward Memorial Hospital",
      "MD Psychiatry - All India Institute of Medical Sciences",
      "Fellowship in Child Psychiatry - NIMHANS",
    ],
    achievements: ["Best Psychiatrist Award 2022", "Published 25+ research papers", "TEDx Speaker on Mental Health"],
    consultationTypes: ["video", "audio", "chat"],
  },
  {
    id: "2",
    name: "Dr. Anjali Iyer",
    specialty: "Clinical Psychology",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    experience: 8,
    consultationFee: 600,
    aptFee: 0.12,
    location: "Bangalore, Karnataka",
    languages: ["English", "Hindi", "Tamil", "Kannada"],
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00"],
    about:
      "Dr. Anjali Iyer is a clinical psychologist specializing in trauma therapy, relationship counseling, and stress management. She uses evidence-based approaches to help clients achieve mental wellness.",
    education: [
      "MA Psychology - Christ University",
      "M.Phil Clinical Psychology - NIMHANS",
      "PhD Psychology - Indian Institute of Science",
    ],
    achievements: [
      "Excellence in Clinical Practice 2021",
      "Certified EMDR Therapist",
      "Mental Health Advocate of the Year",
    ],
    consultationTypes: ["video", "audio", "chat"],
  },
  {
    id: "3",
    name: "Dr. Vikram Patel",
    specialty: "Neuropsychiatry",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    experience: 15,
    consultationFee: 1000,
    aptFee: 0.18,
    location: "Delhi, NCR",
    languages: ["Hindi", "English", "Punjabi"],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    about:
      "Dr. Vikram Patel is a leading neuropsychiatrist with expertise in treating complex mental health conditions, including bipolar disorder, schizophrenia, and neurodevelopmental disorders.",
    education: [
      "MBBS - Maulana Azad Medical College",
      "MD Psychiatry - AIIMS Delhi",
      "DM Neuropsychiatry - PGIMER Chandigarh",
    ],
    achievements: [
      "Padma Shri Recipient",
      "International Mental Health Research Award",
      "Author of 3 medical textbooks",
    ],
    consultationTypes: ["video", "audio"],
  },
  {
    id: "4",
    name: "Dr. Priya Menon",
    specialty: "Child Psychology",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    experience: 10,
    consultationFee: 700,
    aptFee: 0.13,
    location: "Chennai, Tamil Nadu",
    languages: ["Tamil", "English", "Hindi", "Malayalam"],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    about:
      "Dr. Priya Menon specializes in child and adolescent psychology, helping young minds navigate developmental challenges, learning disabilities, and behavioral issues.",
    education: [
      "MA Psychology - University of Madras",
      "M.Phil Child Psychology - NIMHANS",
      "Certification in Play Therapy",
    ],
    achievements: [
      "Child Mental Health Excellence Award",
      "Certified Play Therapist",
      "Published researcher in child development",
    ],
    consultationTypes: ["video", "audio", "chat"],
  },
  {
    id: "5",
    name: "Dr. Arjun Singh",
    specialty: "Stress Counseling",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    experience: 7,
    consultationFee: 500,
    aptFee: 0.1,
    location: "Pune, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    timeSlots: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
    about:
      "Dr. Arjun Singh is a stress counselor and wellness coach who helps professionals manage work-life balance, burnout, and performance anxiety through holistic approaches.",
    education: [
      "MA Counseling Psychology - Pune University",
      "Certification in Mindfulness-Based Stress Reduction",
      "Diploma in Yoga Therapy",
    ],
    achievements: [
      "Corporate Wellness Expert",
      "Mindfulness Trainer Certification",
      "Stress Management Workshop Leader",
    ],
    consultationTypes: ["video", "audio", "chat"],
  },
  {
    id: "6",
    name: "Dr. Kavya Reddy",
    specialty: "Addiction Counseling",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    experience: 9,
    consultationFee: 750,
    aptFee: 0.14,
    location: "Hyderabad, Telangana",
    languages: ["Telugu", "English", "Hindi"],
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
    about:
      "Dr. Kavya Reddy specializes in addiction counseling and recovery therapy, helping individuals overcome substance abuse and behavioral addictions through evidence-based treatment approaches.",
    education: [
      "MA Clinical Psychology - Osmania University",
      "Certification in Addiction Counseling",
      "Training in Motivational Interviewing",
    ],
    achievements: [
      "Addiction Recovery Excellence Award",
      "Certified Addiction Counselor",
      "Community Service Recognition",
    ],
    consultationTypes: ["video", "audio", "chat"],
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

export default function AppointmentsPage() {
  const [selectedView, setSelectedView] = useState<"book" | "history">("book")
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    doctorId: "",
    date: undefined as Date | undefined,
    timeSlot: "",
    reason: "",
    consultationType: "video" as "video" | "audio" | "chat",
    agreeToTerms: false,
  })
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isBookingSuccess, setIsBookingSuccess] = useState(false)
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorId: "1",
      doctorName: "Dr. Rohan Sharma",
      specialty: "Psychiatry",
      date: "2024-02-15",
      time: "10:00",
      reason: "Anxiety and stress management",
      status: "upcoming",
      consultationType: "video",
      fee: 800,
    },
    {
      id: "2",
      doctorId: "2",
      doctorName: "Dr. Anjali Iyer",
      specialty: "Clinical Psychology",
      date: "2024-02-10",
      time: "15:00",
      reason: "Relationship counseling",
      status: "completed",
      consultationType: "video",
      fee: 600,
    },
  ])
  const { toast } = useToast()

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId)
    setSelectedDoctor(doctor || null)
    setFormData((prev) => ({ ...prev, doctorId }))
  }

  const handleBookAppointment = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.doctorId ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.reason ||
      !formData.agreeToTerms
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and agree to the terms.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: formData.doctorId,
      doctorName: selectedDoctor?.name || "",
      specialty: selectedDoctor?.specialty || "",
      date: format(formData.date, "yyyy-MM-dd"),
      time: formData.timeSlot,
      reason: formData.reason,
      status: "upcoming",
      consultationType: formData.consultationType,
      fee: selectedDoctor?.consultationFee || 0,
    }

    setAppointments((prev) => [newAppointment, ...prev])
    setBookedAppointment(newAppointment)
    setIsBookingSuccess(true)

    toast({
      title: "Appointment Booked Successfully! 🎉",
      description: `Your consultation with ${selectedDoctor?.name} is confirmed for ${format(formData.date, "MMM dd, yyyy")} at ${formData.timeSlot}.`,
    })
  }

  const resetForm = () => {
    setFormData({
      fullName: "John Doe",
      email: "john.doe@example.com",
      doctorId: "",
      date: undefined,
      timeSlot: "",
      reason: "",
      consultationType: "video",
      agreeToTerms: false,
    })
    setSelectedDoctor(null)
    setIsBookingSuccess(false)
    setBookedAppointment(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Phone className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <Video className="h-4 w-4" />
    }
  }

  if (isBookingSuccess && bookedAppointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
                <p className="text-gray-600">Your mental health consultation has been successfully booked.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <span>
                      <strong>Doctor:</strong> {bookedAppointment.doctorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>
                      <strong>Specialty:</strong> {bookedAppointment.specialty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-green-600" />
                    <span>
                      <strong>Date:</strong> {format(new Date(bookedAppointment.date), "EEEE, MMMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>
                      <strong>Time:</strong> {bookedAppointment.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {getConsultationIcon(bookedAppointment.consultationType)}
                    <span>
                      <strong>Type:</strong>{" "}
                      {bookedAppointment.consultationType.charAt(0).toUpperCase() +
                        bookedAppointment.consultationType.slice(1)}{" "}
                      Consultation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span>
                      <strong>Fee:</strong> ₹{bookedAppointment.fee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <Shield className="h-4 w-4 inline mr-2" />
                  You will receive a confirmation email with the consultation link 30 minutes before your appointment.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => setSelectedView("history")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  View My Appointments
                </Button>
                <Button onClick={resetForm} className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Book Another Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Mental Health Consultation</h1>
          <p className="text-gray-600 text-lg">Connect with experienced mental health professionals</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={selectedView === "book" ? "default" : "ghost"}
              onClick={() => setSelectedView("book")}
              className="px-6"
            >
              Book Appointment
            </Button>
            <Button
              variant={selectedView === "history" ? "default" : "ghost"}
              onClick={() => setSelectedView("history")}
              className="px-6"
            >
              My Appointments ({appointments.length})
            </Button>
          </div>
        </div>

        {selectedView === "book" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Booking Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Select Doctor *
                  </Label>
                  <Select value={formData.doctorId} onValueChange={handleDoctorSelect}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <span>{doctor.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {doctor.specialty}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedDoctor && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Specialty:</strong> {selectedDoctor.specialty} |<strong> Fee:</strong> ₹
                        {selectedDoctor.consultationFee.toLocaleString("en-IN")} ({selectedDoctor.aptFee} APT)
                      </p>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div>
                  <Label className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Select Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-1 bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Select Time Slot *
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(selectedDoctor?.timeSlots || timeSlots).map((slot) => (
                      <Button
                        key={slot}
                        variant={formData.timeSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                        className="text-sm"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Consultation Type *
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["video", "audio", "chat"].map((type) => (
                      <Button
                        key={type}
                        variant={formData.consultationType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, consultationType: type as any }))}
                        className="flex items-center gap-2 text-sm"
                        disabled={selectedDoctor && !selectedDoctor.consultationTypes.includes(type as any)}
                      >
                        {getConsultationIcon(type)}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reason for Appointment */}
                <div>
                  <Label htmlFor="reason" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Reason for Appointment *
                  </Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please describe your concerns or what you'd like to discuss..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>{" "}
                    and <span className="text-blue-600 underline cursor-pointer">privacy policy</span>
                  </Label>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBookAppointment}
                  className="w-full py-3 text-lg font-semibold"
                  disabled={!formData.agreeToTerms}
                >
                  Book Appointment
                  {selectedDoctor && (
                    <span className="ml-2">- ₹{selectedDoctor.consultationFee.toLocaleString("en-IN")}</span>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Right Column - Doctor Profiles */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{doctor.rating}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="mb-2">
                            {doctor.specialty}
                          </Badge>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{doctor.experience} years experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              <span>
                                ₹{doctor.consultationFee.toLocaleString("en-IN")} ({doctor.aptFee} APT)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-gray-600">Available:</span>
                            <div className="flex gap-1">
                              {doctor.availableDays.slice(0, 3).map((day) => (
                                <Badge key={day} variant="outline" className="text-xs">
                                  {day.slice(0, 3)}
                                </Badge>
                              ))}
                              {doctor.availableDays.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{doctor.availableDays.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" onClick={() => handleDoctorSelect(doctor.id)} className="flex-1">
                              Select Doctor
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  More Info
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-3">
                                    <img
                                      src={doctor.image || "/placeholder.svg"}
                                      alt={doctor.name}
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                      <h3 className="text-xl">{doctor.name}</h3>
                                      <Badge variant="secondary">{doctor.specialty}</Badge>
                                    </div>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-semibold mb-2">About</h4>
                                    <p className="text-gray-600">{doctor.about}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Education</h4>
                                    <ul className="space-y-1">
                                      {doctor.education.map((edu, index) => (
                                        <li key={index} className="text-gray-600">
                                          • {edu}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Achievements</h4>
                                    <ul className="space-y-1">
                                      {doctor.achievements.map((achievement, index) => (
                                        <li key={index} className="text-gray-600">
                                          • {achievement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Languages</h4>
                                    <div className="flex gap-2">
                                      {doctor.languages.map((lang) => (
                                        <Badge key={lang} variant="outline">
                                          {lang}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Consultation Types</h4>
                                    <div className="flex gap-2">
                                      {doctor.consultationTypes.map((type) => (
                                        <Badge key={type} variant="outline" className="flex items-center gap-1">
                                          {getConsultationIcon(type)}
                                          {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold">Consultation Fee:</span>
                                      <span className="text-lg font-bold text-blue-600">
                                        ₹{doctor.consultationFee.toLocaleString("en-IN")} ({doctor.aptFee} APT)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Appointments History */
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  My Appointments ({appointments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-4">Book your first mental health consultation to get started.</p>
                    <Button onClick={() => setSelectedView("book")}>Book Appointment</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Stethoscope className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                                <p className="text-gray-600">{appointment.specialty}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    {format(new Date(appointment.date), "MMM dd, yyyy")}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {appointment.time}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {getConsultationIcon(appointment.consultationType)}
                                    {appointment.consultationType.charAt(0).toUpperCase() +
                                      appointment.consultationType.slice(1)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                              <p className="text-lg font-semibold mt-2">₹{appointment.fee.toLocaleString("en-IN")}</p>
                              {appointment.status === "upcoming" && (
                                <Button size="sm" className="mt-2">
                                  Join Consultation
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Reason:</strong> {appointment.reason}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
