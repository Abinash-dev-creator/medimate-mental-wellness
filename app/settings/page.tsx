"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  Bell,
  Shield,
  Trash2,
  Save,
  Mail,
  Smartphone,
  Monitor,
  Heart,
  Brain,
  Database,
  Info,
  CheckCircle,
  Loader2,
} from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [userSettings, setUserSettings] = useState({
    // Profile Info
    fullName: "Sarah Johnson",
    age: "28",
    email: "sarah.johnson@email.com",
    bio: "Mental health advocate and wellness enthusiast. Passionate about mindfulness and helping others.",

    // Mood Preferences
    dailyMoodReminders: true,
    moodReminderTime: "09:00",
    weeklyMoodSummary: true,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    wellnessInsights: true,
    emergencyAlerts: true,

    // Data Sharing
    researchParticipation: false,
    blockchainStorage: true,
    anonymousDataSharing: false,
    dataExportEnabled: true,
  })

  // Simulate loading user settings from API
  useEffect(() => {
    const loadUserSettings = async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/user/settings')
      // const settings = await response.json()
      // setUserSettings(settings)
    }
    loadUserSettings()
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserSettings({ ...userSettings, [field]: value })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/user/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userSettings)
      // })

      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion
    console.log("Account deletion requested")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">⚙️ Account & Preferences</h1>
          <p className="text-xl text-slate-600">Manage your profile, notifications, and privacy settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Mood
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Info Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <User className="w-5 h-5 text-blue-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">SJ</span>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={userSettings.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-slate-700">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={userSettings.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11"
                  />
                  <p className="text-sm text-slate-500">We'll send important updates to this email address.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-700">
                    Bio (Optional)
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a bit about yourself..."
                    value={userSettings.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-24"
                  />
                  <p className="text-sm text-slate-500">This helps us personalize your experience.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mood Preferences Tab */}
          <TabsContent value="mood">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Mood Tracking Preferences
                </CardTitle>
                <CardDescription>Customize how you track and receive mood-related insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-slate-800">Daily Mood Reminders</span>
                    </div>
                    <p className="text-sm text-slate-600">Get reminded to log your mood each day</p>
                  </div>
                  <Switch
                    checked={userSettings.dailyMoodReminders}
                    onCheckedChange={(checked) => handleInputChange("dailyMoodReminders", checked)}
                  />
                </div>

                {userSettings.dailyMoodReminders && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="reminderTime" className="text-slate-700">
                      Reminder Time
                    </Label>
                    <Input
                      id="reminderTime"
                      type="time"
                      value={userSettings.moodReminderTime}
                      onChange={(e) => handleInputChange("moodReminderTime", e.target.value)}
                      className="w-40 h-11"
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-600" />
                      <span className="font-medium text-slate-800">Weekly Mood Summary</span>
                    </div>
                    <p className="text-sm text-slate-600">Receive weekly insights about your mood patterns</p>
                  </div>
                  <Switch
                    checked={userSettings.weeklyMoodSummary}
                    onCheckedChange={(checked) => handleInputChange("weeklyMoodSummary", checked)}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Mood Tracking Benefits</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Regular mood tracking helps identify patterns, triggers, and improvements in your mental health
                        journey. Our AI uses this data to provide personalized recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Choose how you want to receive updates and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Notification Channels
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-slate-800">Email Notifications</span>
                          <p className="text-sm text-slate-600">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={userSettings.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-green-600" />
                        <div>
                          <span className="font-medium text-slate-800">SMS Notifications</span>
                          <p className="text-sm text-slate-600">Receive text messages for urgent updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={userSettings.smsNotifications}
                        onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-purple-600" />
                        <div>
                          <span className="font-medium text-slate-800">Push Notifications</span>
                          <p className="text-sm text-slate-600">Browser and mobile app notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={userSettings.pushNotifications}
                        onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Notification Types</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Appointment Reminders</span>
                      <Switch
                        checked={userSettings.appointmentReminders}
                        onCheckedChange={(checked) => handleInputChange("appointmentReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Wellness Insights</span>
                      <Switch
                        checked={userSettings.wellnessInsights}
                        onCheckedChange={(checked) => handleInputChange("wellnessInsights", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Emergency Alerts</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                        <Switch
                          checked={userSettings.emergencyAlerts}
                          onCheckedChange={(checked) => handleInputChange("emergencyAlerts", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Data Tab */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Database className="w-5 h-5 text-green-600" />
                    Data Sharing & Privacy
                  </CardTitle>
                  <CardDescription>Control how your data is used and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <span className="font-medium text-slate-800">Research Participation</span>
                      <p className="text-sm text-slate-600">Help improve mental health research with anonymized data</p>
                    </div>
                    <Switch
                      checked={userSettings.researchParticipation}
                      onCheckedChange={(checked) => handleInputChange("researchParticipation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Blockchain Storage</span>
                        <Badge variant="secondary" className="text-xs">
                          Secure
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">Store your health records on secure blockchain</p>
                    </div>
                    <Switch
                      checked={userSettings.blockchainStorage}
                      onCheckedChange={(checked) => handleInputChange("blockchainStorage", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <span className="font-medium text-slate-800">Anonymous Data Sharing</span>
                      <p className="text-sm text-slate-600">Share anonymized insights to help others</p>
                    </div>
                    <Switch
                      checked={userSettings.anonymousDataSharing}
                      onCheckedChange={(checked) => handleInputChange("anonymousDataSharing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <span className="font-medium text-slate-800">Data Export</span>
                      <p className="text-sm text-slate-600">Allow downloading your personal data</p>
                    </div>
                    <Switch
                      checked={userSettings.dataExportEnabled}
                      onCheckedChange={(checked) => handleInputChange("dataExportEnabled", checked)}
                    />
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Your Privacy Matters</h4>
                        <p className="text-sm text-green-700 mt-1">
                          We use industry-standard encryption and never share personal information without your explicit
                          consent. All data sharing is optional and anonymized.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions that affect your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-800">Delete Account</h4>
                        <p className="text-sm text-red-600 mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers, including:
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>All mood tracking data</li>
                                <li>Journal entries and personal notes</li>
                                <li>Appointment history</li>
                                <li>AI recommendations and insights</li>
                              </ul>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                              Yes, delete my account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            {isSaved && (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Settings saved successfully!</span>
              </>
            )}
          </div>
          <Button onClick={handleSaveSettings} disabled={isLoading} size="lg" className="px-8">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
