"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import {
  User,
  Heart,
  Brain,
  Shield,
  Wallet,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Activity,
  Target,
  Zap,
  Loader2,
  Info,
  AlertCircle,
  Stethoscope,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface OnboardingData {
  personalInfo: {
    fullName: string
    age: string
    gender: string
    location: string
    occupation: string
  }
  mentalHealthProfile: {
    primaryConcerns: string[]
    previousTherapy: string
    currentMedication: string
    stressLevel: number[]
    sleepQuality: string
    exerciseFrequency: string
  }
  preferences: {
    preferredLanguage: string
    sessionType: string
    doctorGender: string
    availableTime: string[]
    budget: number[]
    notifications: boolean
  }
  goals: {
    shortTermGoals: string[]
    longTermGoals: string[]
    motivations: string
    expectations: string
  }
  walletSetup: {
    connected: boolean
    address: string
    balance: number
  }
}

interface WalletState {
  connected: boolean
  address: string
  balance: number
  network: "mainnet" | "testnet"
}

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: "",
    balance: 0,
    network: "testnet",
  })

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: {
      fullName: "",
      age: "",
      gender: "",
      location: "",
      occupation: "",
    },
    mentalHealthProfile: {
      primaryConcerns: [],
      previousTherapy: "",
      currentMedication: "",
      stressLevel: [5],
      sleepQuality: "",
      exerciseFrequency: "",
    },
    preferences: {
      preferredLanguage: "",
      sessionType: "",
      doctorGender: "",
      availableTime: [],
      budget: [1500],
      notifications: true,
    },
    goals: {
      shortTermGoals: [],
      longTermGoals: [],
      motivations: "",
      expectations: "",
    },
    walletSetup: {
      connected: false,
      address: "",
      balance: 0,
    },
  })

  const totalSteps = 6
  const progressPercentage = (currentStep / totalSteps) * 100

  const mentalHealthConcerns = [
    "Anxiety",
    "Depression",
    "Stress Management",
    "Relationship Issues",
    "Work-Life Balance",
    "Sleep Disorders",
    "Trauma/PTSD",
    "Addiction",
    "Eating Disorders",
    "Grief & Loss",
    "Self-Esteem",
    "Anger Management",
  ]

  const shortTermGoalOptions = [
    "Reduce daily anxiety",
    "Improve sleep quality",
    "Better stress management",
    "Enhance communication skills",
    "Develop coping strategies",
    "Increase self-awareness",
    "Build confidence",
    "Manage emotions better",
  ]

  const longTermGoalOptions = [
    "Achieve emotional stability",
    "Build stronger relationships",
    "Career advancement",
    "Personal growth",
    "Overcome past trauma",
    "Maintain mental wellness",
    "Develop resilience",
    "Find life purpose",
  ]

  const connectMartianWallet = async () => {
    setIsLoading(true)
    try {
      // Check if Martian wallet is installed
      if (typeof window !== "undefined" && !window.martian) {
        toast({
          title: "Martian Wallet Not Found",
          description: "Please install Martian Wallet extension to continue.",
          variant: "destructive",
        })
        return
      }

      // Mock wallet connection for demo purposes
      // In real implementation, use: const response = await window.martian.connect()
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockWalletData = {
        connected: true,
        address: "0x1234567890abcdef1234567890abcdef12345678",
        balance: 15.75,
        network: "testnet" as const,
      }

      setWallet(mockWalletData)
      setOnboardingData({
        ...onboardingData,
        walletSetup: {
          connected: true,
          address: mockWalletData.address,
          balance: mockWalletData.balance,
        },
      })

      toast({
        title: "Wallet Connected Successfully! 🎉",
        description: `Connected to ${mockWalletData.address.slice(0, 6)}...${mockWalletData.address.slice(-4)}`,
      })
    } catch (error) {
      console.error("Wallet connection failed:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Martian Wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (section: keyof OnboardingData, field: string, value: any) => {
    setOnboardingData({
      ...onboardingData,
      [section]: {
        ...onboardingData[section],
        [field]: value,
      },
    })
  }

  const handleArrayToggle = (section: keyof OnboardingData, field: string, value: string) => {
    const currentArray = (onboardingData[section] as any)[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    setOnboardingData({
      ...onboardingData,
      [section]: {
        ...onboardingData[section],
        [field]: newArray,
      },
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to save onboarding data
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Welcome to MediMate! 🎉",
        description: "Your profile has been created successfully. Let's start your mental wellness journey!",
      })

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-2 border-blue-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Personal Information</CardTitle>
              <CardDescription>Tell us about yourself to personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={onboardingData.personalInfo.fullName}
                    onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={onboardingData.personalInfo.age}
                    onChange={(e) => handleInputChange("personalInfo", "age", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <RadioGroup
                  value={onboardingData.personalInfo.gender}
                  onValueChange={(value) => handleInputChange("personalInfo", "gender", value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="non-binary" />
                    <Label htmlFor="non-binary">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={onboardingData.personalInfo.location}
                    onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Your profession"
                    value={onboardingData.personalInfo.occupation}
                    onChange={(e) => handleInputChange("personalInfo", "occupation", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Mental Health Profile</CardTitle>
              <CardDescription>Help us understand your mental health needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>What are your primary mental health concerns? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mentalHealthConcerns.map((concern) => (
                    <div key={concern} className="flex items-center space-x-2">
                      <Checkbox
                        id={concern}
                        checked={onboardingData.mentalHealthProfile.primaryConcerns.includes(concern)}
                        onCheckedChange={() => handleArrayToggle("mentalHealthProfile", "primaryConcerns", concern)}
                      />
                      <Label htmlFor={concern} className="text-sm">
                        {concern}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Have you had therapy or counseling before?</Label>
                <RadioGroup
                  value={onboardingData.mentalHealthProfile.previousTherapy}
                  onValueChange={(value) => handleInputChange("mentalHealthProfile", "previousTherapy", value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never">Never</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="past" id="past" />
                    <Label htmlFor="past">In the past</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="currently" id="currently" />
                    <Label htmlFor="currently">Currently</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medication">Are you currently taking any medication for mental health?</Label>
                <Textarea
                  id="medication"
                  placeholder="Please list any medications or write 'None'"
                  value={onboardingData.mentalHealthProfile.currentMedication}
                  onChange={(e) => handleInputChange("mentalHealthProfile", "currentMedication", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Current stress level (1-10)</Label>
                <div className="px-3">
                  <Slider
                    value={onboardingData.mentalHealthProfile.stressLevel}
                    onValueChange={(value) => handleInputChange("mentalHealthProfile", "stressLevel", value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-1">
                    <span>Low (1)</span>
                    <span className="font-medium">Current: {onboardingData.mentalHealthProfile.stressLevel[0]}</span>
                    <span>High (10)</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sleep Quality</Label>
                  <Select
                    value={onboardingData.mentalHealthProfile.sleepQuality}
                    onValueChange={(value) => handleInputChange("mentalHealthProfile", "sleepQuality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="very-poor">Very Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Exercise Frequency</Label>
                  <Select
                    value={onboardingData.mentalHealthProfile.exerciseFrequency}
                    onValueChange={(value) => handleInputChange("mentalHealthProfile", "exerciseFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="few-times-week">Few times a week</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="border-2 border-purple-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Preferences</CardTitle>
              <CardDescription>Customize your therapy experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Language</Label>
                  <Select
                    value={onboardingData.preferences.preferredLanguage}
                    onValueChange={(value) => handleInputChange("preferences", "preferredLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Session Type Preference</Label>
                  <Select
                    value={onboardingData.preferences.sessionType}
                    onValueChange={(value) => handleInputChange("preferences", "sessionType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="audio">Audio Call</SelectItem>
                      <SelectItem value="chat">Text Chat</SelectItem>
                      <SelectItem value="in-person">In-Person (if available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Doctor Gender Preference</Label>
                <RadioGroup
                  value={onboardingData.preferences.doctorGender}
                  onValueChange={(value) => handleInputChange("preferences", "doctorGender", value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference" />
                    <Label htmlFor="no-preference">No Preference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male-doctor" id="male-doctor" />
                    <Label htmlFor="male-doctor">Male Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female-doctor" id="female-doctor" />
                    <Label htmlFor="female-doctor">Female Doctor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Available Time Slots (Select all that work for you)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Morning (6AM-12PM)",
                    "Afternoon (12PM-6PM)",
                    "Evening (6PM-10PM)",
                    "Weekdays",
                    "Weekends",
                    "Flexible",
                  ].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={onboardingData.preferences.availableTime.includes(time)}
                        onCheckedChange={() => handleArrayToggle("preferences", "availableTime", time)}
                      />
                      <Label htmlFor={time} className="text-sm">
                        {time}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Budget per session (₹)</Label>
                <div className="px-3">
                  <Slider
                    value={onboardingData.preferences.budget}
                    onValueChange={(value) => handleInputChange("preferences", "budget", value)}
                    max={5000}
                    min={500}
                    step={250}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-1">
                    <span>₹500</span>
                    <span className="font-medium">₹{onboardingData.preferences.budget[0].toLocaleString("en-IN")}</span>
                    <span>₹5,000</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifications"
                  checked={onboardingData.preferences.notifications}
                  onCheckedChange={(checked) => handleInputChange("preferences", "notifications", checked)}
                />
                <Label htmlFor="notifications">Send me appointment reminders and wellness tips via notifications</Label>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="border-2 border-orange-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Goals & Expectations</CardTitle>
              <CardDescription>What do you hope to achieve through therapy?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Short-term goals (next 3 months)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shortTermGoalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={onboardingData.goals.shortTermGoals.includes(goal)}
                        onCheckedChange={() => handleArrayToggle("goals", "shortTermGoals", goal)}
                      />
                      <Label htmlFor={goal} className="text-sm">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Long-term goals (6+ months)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {longTermGoalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={onboardingData.goals.longTermGoals.includes(goal)}
                        onCheckedChange={() => handleArrayToggle("goals", "longTermGoals", goal)}
                      />
                      <Label htmlFor={goal} className="text-sm">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivations">What motivates you to seek therapy now?</Label>
                <Textarea
                  id="motivations"
                  placeholder="Share what's driving you to take this step..."
                  value={onboardingData.goals.motivations}
                  onChange={(e) => handleInputChange("goals", "motivations", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectations">What are your expectations from therapy?</Label>
                <Textarea
                  id="expectations"
                  placeholder="Describe what you hope to gain from your therapy sessions..."
                  value={onboardingData.goals.expectations}
                  onChange={(e) => handleInputChange("goals", "expectations", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card className="border-2 border-indigo-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Wallet Setup</CardTitle>
              <CardDescription>Connect your Martian Aptos Wallet for secure payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!wallet.connected ? (
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                    <Wallet className="w-12 h-12 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Connect Your Martian Wallet</h3>
                    <p className="text-slate-600 mb-6">
                      Securely connect your Martian Aptos Wallet to make payments for consultations and donations.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Why do we need your wallet?</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Secure payments for therapy sessions</li>
                          <li>• Donate to mental health campaigns</li>
                          <li>• Transparent blockchain transactions</li>
                          <li>• No hidden fees or intermediaries</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={connectMartianWallet}
                    disabled={isLoading}
                    size="lg"
                    className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Connecting to Martian Wallet...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Martian Wallet
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-slate-500">
                    Don't have Martian Wallet?{" "}
                    <a
                      href="https://martianwallet.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline"
                    >
                      Download it here
                    </a>
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Wallet Connected Successfully!</h3>
                    <p className="text-green-600">Your Martian Aptos Wallet is now connected and ready to use.</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-green-700">Wallet Address</Label>
                        <p className="font-mono text-sm text-green-800 bg-white p-2 rounded border">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-green-700">Balance</Label>
                        <p className="text-lg font-bold text-green-800">{wallet.balance} APT</p>
                        <p className="text-sm text-green-600">≈ ₹{(wallet.balance * 850).toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-green-700">Network</Label>
                      <Badge variant="secondary" className="ml-2">
                        {wallet.network === "mainnet" ? "Mainnet" : "Testnet"}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Your wallet is secure</h4>
                        <p className="text-sm text-blue-700">
                          All transactions are encrypted and processed on the Aptos blockchain. We never store your
                          private keys.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Review & Complete</CardTitle>
              <CardDescription>Review your information and complete your MediMate setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {onboardingData.personalInfo.fullName || "Not provided"}
                    </p>
                    <p>
                      <strong>Age:</strong> {onboardingData.personalInfo.age || "Not provided"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {onboardingData.personalInfo.gender || "Not provided"}
                    </p>
                    <p>
                      <strong>Location:</strong> {onboardingData.personalInfo.location || "Not provided"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="w-5 h-5 text-green-600" />
                      Mental Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Primary Concerns:</strong>{" "}
                      {onboardingData.mentalHealthProfile.primaryConcerns.length > 0
                        ? onboardingData.mentalHealthProfile.primaryConcerns.join(", ")
                        : "None selected"}
                    </p>
                    <p>
                      <strong>Stress Level:</strong> {onboardingData.mentalHealthProfile.stressLevel[0]}/10
                    </p>
                    <p>
                      <strong>Previous Therapy:</strong>{" "}
                      {onboardingData.mentalHealthProfile.previousTherapy || "Not specified"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="w-5 h-5 text-purple-600" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Language:</strong> {onboardingData.preferences.preferredLanguage || "Not selected"}
                    </p>
                    <p>
                      <strong>Session Type:</strong> {onboardingData.preferences.sessionType || "Not selected"}
                    </p>
                    <p>
                      <strong>Budget:</strong> ₹{onboardingData.preferences.budget[0].toLocaleString("en-IN")} per
                      session
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Short-term Goals:</strong>{" "}
                      {onboardingData.goals.shortTermGoals.length > 0
                        ? onboardingData.goals.shortTermGoals.join(", ")
                        : "None selected"}
                    </p>
                    <p>
                      <strong>Long-term Goals:</strong>{" "}
                      {onboardingData.goals.longTermGoals.length > 0
                        ? onboardingData.goals.longTermGoals.join(", ")
                        : "None selected"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-indigo-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-indigo-600" />
                    Wallet Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {wallet.connected ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Martian Wallet Connected</span>
                      <Badge variant="secondary" className="ml-2">
                        {wallet.balance} APT
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-700">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Wallet Not Connected</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">🎉 You're All Set!</h3>
                <p className="text-slate-600 mb-4">
                  Complete your onboarding to start your mental wellness journey with MediMate.
                </p>
                <Button
                  onClick={completeOnboarding}
                  disabled={isLoading || !wallet.connected}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Setting up your profile...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Complete Setup & Start Journey
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to MediMate! 🌟</h1>
          <p className="text-xl text-slate-600">Let's personalize your mental wellness journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-slate-600">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Step Content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i + 1 <= currentStep ? "bg-blue-600" : "bg-slate-200"
                } transition-colors`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={completeOnboarding}
              disabled={isLoading || !wallet.connected}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete Setup
                </>
              )}
            </Button>
          )}
        </div>

        {/* Features Preview */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-800">🚀 What's Next?</CardTitle>
            <CardDescription>Here's what you'll get access to after completing onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Expert Consultations</h3>
                <p className="text-sm text-slate-600">Connect with licensed mental health professionals</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Wellness Tools</h3>
                <p className="text-sm text-slate-600">Access meditation, mood tracking, and self-care resources</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Secure Records</h3>
                <p className="text-sm text-slate-600">Blockchain-secured health records and privacy protection</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Community Support</h3>
                <p className="text-sm text-slate-600">Join support groups and contribute to mental health causes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Extend window object for Martian wallet
declare global {
  interface Window {
    martian?: {
      connect: () => Promise<any>
      account: () => Promise<{ address: string }>
      signAndSubmitTransaction: (transaction: any) => Promise<any>
      network: () => Promise<string>
    }
  }
}
