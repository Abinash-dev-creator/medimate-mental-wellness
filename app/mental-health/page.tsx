"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, Send, Brain, TrendingUp, Smile, BookOpen, Sparkles } from "lucide-react"

export default function MentalHealthPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [journalEntry, setJournalEntry] = useState("")
  const [currentMood, setCurrentMood] = useState(7)

  const moodData = [
    { date: "Mon", mood: 6 },
    { date: "Tue", mood: 7 },
    { date: "Wed", mood: 5 },
    { date: "Thu", mood: 8 },
    { date: "Fri", mood: 7 },
    { date: "Sat", mood: 9 },
    { date: "Sun", mood: 8 },
  ]

  const journalEntries = [
    {
      date: "Today",
      mood: 8,
      preview: "Had a great therapy session today. Feeling more optimistic about...",
    },
    {
      date: "Yesterday",
      mood: 6,
      preview: "Work was stressful but I practiced the breathing exercises...",
    },
    {
      date: "2 days ago",
      mood: 7,
      preview: "Went for a walk in the park. Nature really helps clear my mind...",
    },
  ]

  const aiInsights = [
    "Your mood has improved 23% this week! 📈",
    "You've been consistent with journaling - great job! ✍️",
    "Consider meditation when stress levels are high 🧘‍♀️",
    "Your sleep patterns correlate with better mood days 😴",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🧠 Mental Health Dashboard</h1>
          <p className="text-xl text-slate-600">
            AI-powered support, mood tracking, and personal journaling in one place
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Chatbot */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-800">🤖 AI Mental Health Assistant</CardTitle>
                    <CardDescription>Your supportive companion, available 24/7</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
                    Online
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 bg-slate-50 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                        <p className="text-slate-700">
                          Hello! I'm here to support you on your mental health journey. How are you feeling today? 😊
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg shadow-sm max-w-md">
                        <p>I've been feeling a bit anxious about work lately.</p>
                      </div>
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                        <span className="text-sm">You</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                        <p className="text-slate-700">
                          I understand that work anxiety can be challenging. Let's explore some coping strategies
                          together. Have you tried any breathing exercises recently? 🌬️
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message here..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && setChatMessage("")}
                  />
                  <Button onClick={() => setChatMessage("")} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mood Tracker & Insights */}
          <div className="space-y-6">
            {/* Current Mood */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Smile className="w-5 h-5 text-yellow-500" />
                  Current Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl">{currentMood >= 8 ? "😊" : currentMood >= 6 ? "😐" : "😔"}</div>
                  <div className="text-2xl font-bold text-slate-800">{currentMood}/10</div>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant={currentMood >= 8 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentMood(8)}
                      className="text-xs"
                    >
                      😊 Good
                    </Button>
                    <Button
                      variant={currentMood >= 6 && currentMood < 8 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentMood(6)}
                      className="text-xs"
                    >
                      😐 Okay
                    </Button>
                    <Button
                      variant={currentMood < 6 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentMood(4)}
                      className="text-xs"
                    >
                      😔 Low
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Mood Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Weekly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moodData.map((day, index) => (
                    <div key={day.date} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">{day.date}</span>
                      <Progress value={day.mood * 10} className="flex-1 h-2" />
                      <span className="text-sm text-slate-600 w-8">{day.mood}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">📈 Your mood improved by 23% this week!</p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Journaling */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-blue-500" />📝 Daily Journaling
              </CardTitle>
              <CardDescription>Express your thoughts and track your emotional journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Today's Entry</h3>
                  <Textarea
                    placeholder="How are you feeling today? What's on your mind?"
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-32"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Entry</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Recent Entries</h3>
                  <div className="space-y-3">
                    {journalEntries.map((entry, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-600">{entry.date}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-lg">{entry.mood >= 8 ? "😊" : entry.mood >= 6 ? "😐" : "😔"}</span>
                            <span className="text-sm text-slate-500">{entry.mood}/10</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700">{entry.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
