"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Heart,
  Activity,
  BedIcon as Sleep,
  Utensils,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react"

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 0,
      category: "Mental Health",
      icon: Brain,
      question: "How often do you feel anxious or worried?",
      type: "radio",
      options: [
        { value: "never", label: "Never", score: 5 },
        { value: "rarely", label: "Rarely", score: 4 },
        { value: "sometimes", label: "Sometimes", score: 3 },
        { value: "often", label: "Often", score: 2 },
        { value: "always", label: "Always", score: 1 },
      ],
    },
    {
      id: 1,
      category: "Sleep Quality",
      icon: Sleep,
      question: "How would you rate your sleep quality?",
      type: "slider",
      min: 1,
      max: 10,
      label: "Sleep Quality Rating",
    },
    {
      id: 2,
      category: "Physical Activity",
      icon: Activity,
      question: "How many days per week do you exercise?",
      type: "radio",
      options: [
        { value: "0", label: "0 days", score: 1 },
        { value: "1-2", label: "1-2 days", score: 2 },
        { value: "3-4", label: "3-4 days", score: 4 },
        { value: "5-6", label: "5-6 days", score: 5 },
        { value: "7", label: "Every day", score: 5 },
      ],
    },
    {
      id: 3,
      category: "Stress Level",
      icon: Heart,
      question: "What is your current stress level?",
      type: "slider",
      min: 1,
      max: 10,
      label: "Stress Level (1 = Very Low, 10 = Very High)",
    },
    {
      id: 4,
      category: "Nutrition",
      icon: Utensils,
      question: "How often do you eat balanced, nutritious meals?",
      type: "radio",
      options: [
        { value: "never", label: "Never", score: 1 },
        { value: "rarely", label: "Rarely", score: 2 },
        { value: "sometimes", label: "Sometimes", score: 3 },
        { value: "often", label: "Often", score: 4 },
        { value: "always", label: "Always", score: 5 },
      ],
    },
  ]

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    let maxScore = 0

    questions.forEach((question, index) => {
      const answer = answers[index]
      if (question.type === "radio" && answer) {
        const option = question.options?.find((opt) => opt.value === answer)
        if (option) {
          totalScore += option.score
          maxScore += 5
        }
      } else if (question.type === "slider" && answer) {
        if (question.id === 1) {
          // Sleep quality - higher is better
          totalScore += answer[0] / 2
          maxScore += 5
        } else if (question.id === 3) {
          // Stress level - lower is better
          totalScore += (11 - answer[0]) / 2
          maxScore += 5
        }
      }
    })

    const percentage = Math.round((totalScore / maxScore) * 100)
    return { totalScore, maxScore, percentage }
  }

  const getHealthStatus = (percentage: number) => {
    if (percentage >= 80) return { status: "Excellent", color: "green", icon: CheckCircle }
    if (percentage >= 60) return { status: "Good", color: "blue", icon: TrendingUp }
    if (percentage >= 40) return { status: "Fair", color: "yellow", icon: AlertCircle }
    return { status: "Needs Attention", color: "red", icon: AlertCircle }
  }

  if (showResults) {
    const results = calculateResults()
    const healthStatus = getHealthStatus(results.percentage)
    const StatusIcon = healthStatus.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">📈 Your Health Assessment Results</h1>
            <p className="text-xl text-slate-600">Based on your responses, here's your personalized health overview</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div
                  className={`w-20 h-20 bg-${healthStatus.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <StatusIcon className={`w-10 h-10 text-${healthStatus.color}-600`} />
                </div>
                <CardTitle className="text-2xl text-slate-800">Overall Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-slate-800">{results.percentage}%</div>
                  <Badge
                    variant="secondary"
                    className={`bg-${healthStatus.color}-100 text-${healthStatus.color}-700 text-lg px-4 py-2`}
                  >
                    {healthStatus.status}
                  </Badge>
                  <Progress value={results.percentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">📋 Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const answer = answers[index]
                    const Icon = question.icon
                    let score = 0
                    let displayAnswer = "Not answered"

                    if (question.type === "radio" && answer) {
                      const option = question.options?.find((opt) => opt.value === answer)
                      if (option) {
                        score = option.score
                        displayAnswer = option.label
                      }
                    } else if (question.type === "slider" && answer) {
                      displayAnswer = `${answer[0]}/10`
                      if (question.id === 1) score = answer[0] / 2
                      else if (question.id === 3) score = (11 - answer[0]) / 2
                    }

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-800">{question.category}</p>
                            <p className="text-sm text-slate-600">{displayAnswer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">{Math.round(score)}/5</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-slate-800">💡 Personalized Recommendations</CardTitle>
              <CardDescription>
                Based on your assessment, here are some suggestions to improve your wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">🎯 Priority Areas</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="font-medium text-red-800">Stress Management</p>
                      <p className="text-sm text-red-600">Consider meditation or breathing exercises</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-medium text-yellow-800">Sleep Improvement</p>
                      <p className="text-sm text-yellow-600">Establish a consistent bedtime routine</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">✨ Suggested Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Brain className="w-4 h-4 mr-2" />
                      Start 10-minute daily meditation
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      Schedule 3 workout sessions this week
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Sleep className="w-4 h-4 mr-2" />
                      Set a consistent sleep schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              variant="outline"
              className="mr-4"
            >
              Retake Assessment
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Detailed Report
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const CurrentIcon = currentQ.icon
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🩺 Health Assessment</h1>
          <p className="text-xl text-slate-600">Interactive quiz to evaluate your physical and mental wellbeing</p>
          <div className="mt-6">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-slate-500 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CurrentIcon className="w-8 h-8 text-blue-600" />
            </div>
            <Badge variant="secondary" className="mb-4">
              {currentQ.category}
            </Badge>
            <CardTitle className="text-2xl text-slate-800">{currentQ.question}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentQ.type === "radio" && (
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-3"
              >
                {currentQ.options?.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-lg">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQ.type === "slider" && (
              <div className="space-y-6">
                <div className="px-4">
                  <Label className="text-lg mb-4 block">{currentQ.label}</Label>
                  <Slider
                    value={answers[currentQ.id] || [5]}
                    onValueChange={(value) => handleAnswer(currentQ.id, value)}
                    max={currentQ.max}
                    min={currentQ.min}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-2">
                    <span>{currentQ.min}</span>
                    <span className="font-semibold text-lg text-blue-600">{answers[currentQ.id]?.[0] || 5}</span>
                    <span>{currentQ.max}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-6">
              <Button onClick={handleNext} disabled={!answers[currentQ.id]} size="lg" className="px-8">
                {currentQuestion === questions.length - 1 ? "View Results" : "Next Question"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
