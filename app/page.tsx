"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Phone, Calendar, TrendingUp, Users, Clock, Coins, Target, Activity } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  // Update time every second
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  })

  const quickStats = [
    { label: "Active Users", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Sessions Today", value: "156", icon: Activity, color: "text-green-600" },
    { label: "Avg. Response", value: "2.3 min", icon: Clock, color: "text-purple-600" },
    { label: "Success Rate", value: "94.2%", icon: TrendingUp, color: "text-orange-600" },
  ]

  const recentActivities = [
    { action: "New user registered", user: "Priya Sharma", time: "2 min ago", type: "user" },
    { action: "Consultation completed", user: "Dr. Rohan Patel", time: "5 min ago", type: "consultation" },
    { action: "Campaign donation received", user: "Arjun Singh", time: "8 min ago", type: "donation" },
    { action: "Emergency alert resolved", user: "System", time: "12 min ago", type: "emergency" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome to MediMate 🧠</h1>
            <p className="text-lg text-slate-600">Your comprehensive mental health and wellness platform</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-500">{currentTime}</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Mental Health Tools */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">🧠 Mental Health Tools</CardTitle>
                  <CardDescription>Interactive tools for mental wellness</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Access mood tracking, meditation guides, and cognitive behavioral therapy exercises.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">Tools Available</span>
                <Badge variant="secondary">12 Active</Badge>
              </div>
              <Progress value={85} className="mb-4" />
              <Link href="/mental-health">
                <Button className="w-full">Explore Tools</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Health Assessment */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">❤️ Health Assessment</CardTitle>
                  <CardDescription>Comprehensive mental health evaluation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Take scientifically-backed assessments to understand your mental health status.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">Completion Rate</span>
                <Badge variant="secondary">92%</Badge>
              </div>
              <Progress value={92} className="mb-4" />
              <Link href="/assessment">
                <Button className="w-full bg-transparent" variant="outline">
                  Start Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Blockchain Campaign */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Coins className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">💰 Blockchain Campaign</CardTitle>
                  <CardDescription>Transparent fundraising for mental health</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Support mental health initiatives through transparent blockchain-based campaigns.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">Active Campaigns</span>
                <Badge variant="secondary">8 Running</Badge>
              </div>
              <Progress value={67} className="mb-4" />
              <Link href="/blockchain">
                <Button className="w-full bg-transparent" variant="outline">
                  View Campaigns
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Teleconsultation */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">📞 Teleconsultation</CardTitle>
                  <CardDescription>Connect with mental health professionals</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Book video, audio, or chat sessions with certified therapists and psychiatrists.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">Available Doctors</span>
                <Badge variant="secondary">24 Online</Badge>
              </div>
              <Progress value={78} className="mb-4" />
              <Link href="/teleconsultation">
                <Button className="w-full">Book Session</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Appointments */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">📅 Appointments</CardTitle>
                  <CardDescription>Manage your consultation schedule</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                View upcoming appointments, reschedule sessions, and track your therapy progress.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">This Week</span>
                <Badge variant="secondary">3 Scheduled</Badge>
              </div>
              <Progress value={60} className="mb-4" />
              <Link href="/appointments">
                <Button className="w-full bg-transparent" variant="outline">
                  View Schedule
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">🎯 Recommendations</CardTitle>
                  <CardDescription>Personalized wellness suggestions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Get AI-powered recommendations for improving your mental health and wellness.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">New Suggestions</span>
                <Badge variant="secondary">5 Today</Badge>
              </div>
              <Progress value={88} className="mb-4" />
              <Link href="/recommendations">
                <Button className="w-full bg-transparent" variant="outline">
                  View Suggestions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your MediMate platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "user"
                        ? "bg-blue-500"
                        : activity.type === "consultation"
                          ? "bg-green-500"
                          : activity.type === "donation"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
