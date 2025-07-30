"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Phone, MapPin, Clock, Heart, MessageCircle, Shield, Users, Zap, Navigation } from "lucide-react"

export default function EmergencyPage() {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [location, setLocation] = useState("Detecting...")

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      type: "Crisis Hotline",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Text-based crisis support",
      type: "Text Support",
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate emergency response",
      type: "Emergency",
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse",
      type: "Support",
    },
  ]

  const personalContacts = [
    {
      name: "Dr. Sarah Johnson",
      role: "Primary Therapist",
      number: "(555) 123-4567",
      available: true,
    },
    {
      name: "Emergency Contact - Mom",
      role: "Family",
      number: "(555) 987-6543",
      available: true,
    },
    {
      name: "Best Friend - Alex",
      role: "Support Person",
      number: "(555) 456-7890",
      available: false,
    },
  ]

  const crisisResources = [
    {
      title: "Immediate Breathing Exercise",
      description: "4-7-8 breathing technique for instant calm",
      icon: Heart,
      action: "Start Now",
      color: "blue",
    },
    {
      title: "Grounding Technique",
      description: "5-4-3-2-1 sensory grounding method",
      icon: Shield,
      action: "Begin Exercise",
      color: "green",
    },
    {
      title: "Crisis Chat",
      description: "Connect with trained crisis counselor",
      icon: MessageCircle,
      action: "Start Chat",
      color: "purple",
    },
    {
      title: "Safety Plan",
      description: "Access your personalized safety plan",
      icon: Users,
      action: "View Plan",
      color: "orange",
    },
  ]

  const handleEmergencyAlert = () => {
    setEmergencyActive(true)
    // Simulate location detection
    setTimeout(() => {
      setLocation("123 Main St, City, State 12345")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🚨 Emergency Protocol</h1>
          <p className="text-xl text-slate-600">Immediate crisis intervention and emergency response resources</p>
        </div>

        {/* Emergency Alert Button */}
        <Card className="mb-8 border-red-200 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Crisis Emergency Button
            </CardTitle>
            <CardDescription className="text-red-100">
              Press this button if you are in immediate danger or having thoughts of self-harm
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {!emergencyActive ? (
              <Button
                onClick={handleEmergencyAlert}
                size="lg"
                className="bg-white text-red-600 hover:bg-red-50 text-xl font-bold py-6 px-12 rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                <Zap className="w-6 h-6 mr-3" />
                EMERGENCY HELP NOW
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/20 p-6 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xl font-bold">Emergency Services Contacted</span>
                  </div>
                  <div className="space-y-2 text-white/90">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Response Time: 5-10 minutes</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/90">
                  Help is on the way. Stay on the line and follow the operator's instructions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Crisis Hotlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Phone className="w-5 h-5 text-blue-600" />
                Crisis Hotlines & Support
              </CardTitle>
              <CardDescription>24/7 professional crisis support services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {contact.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{contact.description}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(`tel:${contact.number.replace(/\D/g, "")}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {contact.number}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Users className="w-5 h-5 text-green-600" />
                Personal Emergency Contacts
              </CardTitle>
              <CardDescription>Your trusted support network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                        <p className="text-sm text-slate-600">{contact.role}</p>
                      </div>
                      <Badge
                        variant={contact.available ? "default" : "secondary"}
                        className={contact.available ? "bg-green-100 text-green-700" : ""}
                      >
                        {contact.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        variant={contact.available ? "default" : "outline"}
                        disabled={!contact.available}
                        onClick={() => window.open(`tel:${contact.number}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        disabled={!contact.available}
                        onClick={() => window.open(`sms:${contact.number}`)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Add Emergency Contact</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Contact name" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" placeholder="(555) 123-4567" />
                  </div>
                  <Button className="w-full">Add Contact</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Immediate Crisis Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Heart className="w-5 h-5 text-red-500" />
              Immediate Crisis Resources
            </CardTitle>
            <CardDescription>Quick access to coping techniques and support tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {crisisResources.map((resource, index) => {
                const ResourceIcon = resource.icon
                return (
                  <Card
                    key={index}
                    className={`border-2 hover:border-${resource.color}-300 transition-colors card-hover`}
                  >
                    <CardHeader className="text-center pb-3">
                      <div
                        className={`w-12 h-12 bg-${resource.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <ResourceIcon className={`w-6 h-6 text-${resource.color}-600`} />
                      </div>
                      <CardTitle className="text-lg text-slate-800">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button className="w-full bg-transparent" variant="outline">
                        {resource.action}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Location Services */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Navigation className="w-5 h-5 text-purple-600" />
              Location-Based Emergency Services
            </CardTitle>
            <CardDescription>Find nearby emergency services and mental health facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <MapPin className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Nearest Hospital</h3>
                <p className="text-sm text-slate-600 mb-3">City General Hospital - 0.8 miles</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Directions
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <Heart className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Crisis Center</h3>
                <p className="text-sm text-slate-600 mb-3">Mental Health Crisis Center - 1.2 miles</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Directions
                </Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Safe Space</h3>
                <p className="text-sm text-slate-600 mb-3">Community Support Center - 0.5 miles</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                If you are experiencing a mental health emergency or having thoughts of self-harm, please contact
                emergency services immediately by calling 911 or the National Suicide Prevention Lifeline at 988. This
                app is designed to provide support resources but should not replace professional emergency care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
