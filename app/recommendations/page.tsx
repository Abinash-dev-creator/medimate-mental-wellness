import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Moon, Brain, Music, Dumbbell, Heart, Clock, Star, Play, BookOpen, Headphones } from "lucide-react"

export default function RecommendationsPage() {
  const dailyPlan = {
    sleepScore: 85,
    meditationMinutes: 15,
    exerciseMinutes: 30,
    musicMinutes: 45,
    completedTasks: 3,
    totalTasks: 5,
  }

  const recommendations = [
    {
      category: "Sleep Optimization",
      icon: Moon,
      color: "blue",
      priority: "High",
      items: [
        {
          title: "Evening Wind-Down Routine",
          description: "Start your bedtime routine 1 hour before sleep with calming activities",
          duration: "60 min",
          difficulty: "Easy",
          benefits: ["Better sleep quality", "Reduced stress", "Improved mood"],
        },
        {
          title: "Sleep Environment Optimization",
          description: "Keep your bedroom cool (65-68°F) and completely dark",
          duration: "Setup once",
          difficulty: "Easy",
          benefits: ["Deeper sleep", "Faster sleep onset", "Less night waking"],
        },
        {
          title: "Blue Light Reduction",
          description: "Avoid screens 2 hours before bedtime or use blue light filters",
          duration: "2 hours",
          difficulty: "Medium",
          benefits: ["Natural melatonin production", "Better circadian rhythm"],
        },
      ],
    },
    {
      category: "Meditation & Mindfulness",
      icon: Brain,
      color: "purple",
      priority: "High",
      items: [
        {
          title: "Morning Breathing Exercise",
          description: "Start your day with 5 minutes of deep breathing",
          duration: "5 min",
          difficulty: "Easy",
          benefits: ["Reduced anxiety", "Increased focus", "Better mood"],
        },
        {
          title: "Mindful Walking",
          description: "Take a 10-minute mindful walk focusing on your surroundings",
          duration: "10 min",
          difficulty: "Easy",
          benefits: ["Stress relief", "Mental clarity", "Physical activity"],
        },
        {
          title: "Body Scan Meditation",
          description: "Progressive relaxation technique for deep stress relief",
          duration: "15 min",
          difficulty: "Medium",
          benefits: ["Deep relaxation", "Body awareness", "Tension release"],
        },
      ],
    },
    {
      category: "Music Therapy",
      icon: Music,
      color: "green",
      priority: "Medium",
      items: [
        {
          title: "Calming Nature Sounds",
          description: "Listen to rain, ocean waves, or forest sounds for relaxation",
          duration: "20 min",
          difficulty: "Easy",
          benefits: ["Stress reduction", "Better focus", "Improved sleep"],
        },
        {
          title: "Classical Music for Focus",
          description: "Baroque and classical pieces to enhance concentration",
          duration: "45 min",
          difficulty: "Easy",
          benefits: ["Enhanced productivity", "Reduced anxiety", "Mental clarity"],
        },
        {
          title: "Binaural Beats",
          description: "Specific frequencies to promote relaxation and focus",
          duration: "30 min",
          difficulty: "Easy",
          benefits: ["Altered brainwaves", "Deep meditation", "Stress relief"],
        },
      ],
    },
    {
      category: "Physical Exercise",
      icon: Dumbbell,
      color: "orange",
      priority: "High",
      items: [
        {
          title: "Morning Yoga Flow",
          description: "Gentle 20-minute yoga sequence to energize your day",
          duration: "20 min",
          difficulty: "Easy",
          benefits: ["Flexibility", "Stress relief", "Energy boost"],
        },
        {
          title: "HIIT Cardio Workout",
          description: "High-intensity interval training for cardiovascular health",
          duration: "25 min",
          difficulty: "Hard",
          benefits: ["Improved fitness", "Mood enhancement", "Better sleep"],
        },
        {
          title: "Evening Stretching",
          description: "Relaxing stretches to unwind and prepare for sleep",
          duration: "15 min",
          difficulty: "Easy",
          benefits: ["Muscle relaxation", "Better sleep", "Reduced tension"],
        },
      ],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100"
      case "purple":
        return "text-purple-600 bg-purple-100"
      case "green":
        return "text-green-600 bg-green-100"
      case "orange":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">✨ AI-Powered Recommendations</h1>
          <p className="text-xl text-slate-600">
            Personalized wellness suggestions based on your health assessment and goals
          </p>
        </div>

        {/* Daily Wellness Plan Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="w-6 h-6" />
              Today's Wellness Plan
            </CardTitle>
            <CardDescription className="text-blue-100">
              Your personalized daily routine for optimal mental health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Moon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-1">Sleep Quality</h3>
                <div className="text-2xl font-bold">{dailyPlan.sleepScore}%</div>
                <Progress value={dailyPlan.sleepScore} className="mt-2 bg-white/20" />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-1">Meditation</h3>
                <div className="text-2xl font-bold">{dailyPlan.meditationMinutes} min</div>
                <p className="text-sm text-blue-100">Target: 15 min</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-1">Exercise</h3>
                <div className="text-2xl font-bold">{dailyPlan.exerciseMinutes} min</div>
                <p className="text-sm text-blue-100">Target: 30 min</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-1">Music Therapy</h3>
                <div className="text-2xl font-bold">{dailyPlan.musicMinutes} min</div>
                <p className="text-sm text-blue-100">Target: 45 min</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Daily Progress</span>
                <span className="text-sm">
                  {dailyPlan.completedTasks}/{dailyPlan.totalTasks} tasks completed
                </span>
              </div>
              <Progress value={(dailyPlan.completedTasks / dailyPlan.totalTasks) * 100} className="mt-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="space-y-8">
          {recommendations.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <Card key={categoryIndex} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(category.color)}`}
                      >
                        <CategoryIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800">{category.category}</CardTitle>
                        <CardDescription>Personalized recommendations for your wellness journey</CardDescription>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(category.priority)}>{category.priority} Priority</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="border-2 hover:border-blue-300 transition-colors card-hover">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg text-slate-800 leading-tight">{item.title}</CardTitle>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Clock className="w-4 h-4" />
                              {item.duration}
                            </div>
                          </div>
                          <CardDescription className="text-sm">{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {item.difficulty}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-slate-700">Benefits:</h4>
                              <ul className="text-xs text-slate-600 space-y-1">
                                {item.benefits.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="flex items-center gap-2">
                                    <Heart className="w-3 h-3 text-green-500" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button size="sm" className="flex-1">
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </Button>
                              <Button size="sm" variant="outline">
                                <BookOpen className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>Start your wellness activities with one click</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                <Headphones className="w-6 h-6" />
                <span>5-Min Meditation</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-green-600 hover:bg-green-700">
                <Music className="w-6 h-6" />
                <span>Calming Music</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                <Dumbbell className="w-6 h-6" />
                <span>Quick Workout</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                <Moon className="w-6 h-6" />
                <span>Sleep Sounds</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
