"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, Mail, Lock, User, Calendar, Heart, Chrome } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    age: "",
    gender: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, password: formData.password })
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     fullName: formData.fullName,
      //     age: formData.age,
      //     gender: formData.gender
      //   })
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/onboarding")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    // TODO: Implement Google OAuth
    console.log("Google authentication")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Calming Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iHb930luPiHxpnHTcDWJL6UtAjRsQ6.png"
          alt="Peaceful meditation and mental wellness with technology icons"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Welcome to MediMate</h1>
            <p className="text-xl text-blue-100 max-w-md">
              Your journey to better mental health starts here. Join thousands who have found peace and support.
            </p>
            <div className="flex justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-l2mHNeop5r1FYpkYMnp7lz68PGjgRO.png"
                alt="MediMate logo"
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">MediMate</h2>
            <p className="text-slate-600 mt-2">Your mental wellness companion</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="text-sm font-medium">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-sm font-medium">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800">Welcome Back! 👋</CardTitle>
                  <CardDescription>Sign in to continue your wellness journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm text-slate-600">
                          Remember me
                        </Label>
                      </div>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Forgot Password?
                      </button>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleAuth}
                      className="w-full h-12 text-base font-medium bg-transparent"
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      Continue with Google
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-800">Join MediMate 🌟</CardTitle>
                  <CardDescription>Create your account to start your wellness journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-slate-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-age" className="text-slate-700">
                          Age
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            id="signup-age"
                            type="number"
                            placeholder="Age"
                            value={formData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className="pl-10 h-12 text-base"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700">Gender</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                          className="flex space-x-4 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="text-sm">
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="text-sm">
                              Female
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="text-sm">
                              Other
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-slate-600">
                        I agree to the{" "}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </button>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleAuth}
                      className="w-full h-12 text-base font-medium bg-transparent"
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      Continue with Google
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-slate-600">
            {activeTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setActiveTab("login")} className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
