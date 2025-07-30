"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Wallet,
  CreditCard,
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  Stethoscope,
  Shield,
  Zap,
  Award,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Campaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  daysLeft: number
  category: string
  image: string
  organizer: string
  supporters: number
}

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  price: number
  image: string
  availability: string
  gender: "male" | "female"
}

interface Transaction {
  id: string
  type: "donation" | "consultation" | "subscription"
  amount: number
  recipient: string
  date: string
  status: "completed" | "pending" | "failed"
  description: string
}

interface Subscription {
  id: string
  campaignId: string
  campaignTitle: string
  amount: number
  frequency: "monthly" | "weekly"
  nextPayment: string
  status: "active" | "paused" | "cancelled"
  totalDonated: number
}

export default function PaymentsPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [consultationAmount, setConsultationAmount] = useState("")
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false)
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false)
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false)
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<"monthly" | "weekly">("monthly")
  const [monthlyDonationAmount, setMonthlyDonationAmount] = useState("")
  const { toast } = useToast()

  const aptToINR = 82.75

  useEffect(() => {
    // Load mock data
    const loadData = async () => {
      // Mock campaigns
      const mockCampaigns: Campaign[] = [
        {
          id: "1",
          title: "Mental Health Support for Rural Communities",
          description: "Providing accessible mental health services to underserved rural areas across India.",
          targetAmount: 500000,
          currentAmount: 325000,
          daysLeft: 45,
          category: "Mental Health",
          image: "/placeholder.svg?height=200&width=300&text=Mental+Health",
          organizer: "Dr. Priya Sharma",
          supporters: 1250,
        },
        {
          id: "2",
          title: "Emergency Mental Health Crisis Intervention",
          description: "24/7 crisis intervention services for individuals experiencing mental health emergencies.",
          targetAmount: 750000,
          currentAmount: 480000,
          daysLeft: 30,
          category: "Emergency Care",
          image: "/placeholder.svg?height=200&width=300&text=Crisis+Care",
          organizer: "Dr. Rajesh Kumar",
          supporters: 890,
        },
        {
          id: "3",
          title: "Youth Mental Wellness Program",
          description: "Comprehensive mental health programs for teenagers and young adults in schools and colleges.",
          targetAmount: 300000,
          currentAmount: 180000,
          daysLeft: 60,
          category: "Youth Programs",
          image: "/placeholder.svg?height=200&width=300&text=Youth+Program",
          organizer: "Dr. Kavya Reddy",
          supporters: 650,
        },
      ]

      // Mock doctors
      const mockDoctors: Doctor[] = [
        {
          id: "1",
          name: "Dr. Priya Sharma",
          specialty: "Anxiety & Depression",
          rating: 4.9,
          experience: 12,
          price: 1200,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Priya",
          availability: "Available Today",
          gender: "female",
        },
        {
          id: "2",
          name: "Dr. Rajesh Kumar",
          specialty: "PTSD & Trauma",
          rating: 4.8,
          experience: 15,
          price: 1500,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Rajesh",
          availability: "Next Available: Tomorrow",
          gender: "male",
        },
        {
          id: "3",
          name: "Dr. Kavya Reddy",
          specialty: "Relationship Counseling",
          rating: 4.7,
          experience: 8,
          price: 1000,
          image: "/placeholder.svg?height=100&width=100&text=Dr.+Kavya",
          availability: "Available Today",
          gender: "female",
        },
      ]

      // Mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          type: "donation",
          amount: 2500,
          recipient: "Mental Health Support Campaign",
          date: "2024-01-15",
          status: "completed",
          description: "Monthly donation to rural mental health initiative",
        },
        {
          id: "2",
          type: "consultation",
          amount: 1200,
          recipient: "Dr. Priya Sharma",
          date: "2024-01-14",
          status: "completed",
          description: "Video consultation for anxiety management",
        },
        {
          id: "3",
          type: "subscription",
          amount: 1000,
          recipient: "Youth Mental Wellness Program",
          date: "2024-01-13",
          status: "completed",
          description: "Monthly subscription payment",
        },
        {
          id: "4",
          type: "donation",
          amount: 5000,
          recipient: "Emergency Crisis Intervention",
          date: "2024-01-12",
          status: "completed",
          description: "One-time donation for crisis support",
        },
      ]

      // Mock subscriptions
      const mockSubscriptions: Subscription[] = [
        {
          id: "1",
          campaignId: "1",
          campaignTitle: "Mental Health Support for Rural Communities",
          amount: 2500,
          frequency: "monthly",
          nextPayment: "2024-02-15",
          status: "active",
          totalDonated: 15000,
        },
        {
          id: "2",
          campaignId: "3",
          campaignTitle: "Youth Mental Wellness Program",
          amount: 1000,
          frequency: "monthly",
          nextPayment: "2024-02-13",
          status: "active",
          totalDonated: 8000,
        },
      ]

      setCampaigns(mockCampaigns)
      setDoctors(mockDoctors)
      setTransactions(mockTransactions)
      setSubscriptions(mockSubscriptions)
    }

    loadData()
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
      setBalance(125.5)

      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Martian Aptos Wallet",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDonation = async () => {
    if (!selectedCampaign || !donationAmount) return

    setIsLoading(true)
    try {
      // Simulate donation transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "donation",
        amount: Number.parseFloat(donationAmount),
        recipient: selectedCampaign.title,
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        description: `Donation to ${selectedCampaign.title}`,
      }

      setTransactions([newTransaction, ...transactions])
      setBalance(balance - Number.parseFloat(donationAmount))
      setIsDonationDialogOpen(false)
      setDonationAmount("")

      toast({
        title: "Donation Successful",
        description: `₹${Number.parseFloat(donationAmount).toLocaleString("en-IN")} donated to ${selectedCampaign.title}`,
      })
    } catch (error) {
      toast({
        title: "Donation Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConsultationPayment = async () => {
    if (!selectedDoctor) return

    setIsLoading(true)
    try {
      // Simulate consultation payment
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "consultation",
        amount: selectedDoctor.price,
        recipient: selectedDoctor.name,
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        description: `Consultation with ${selectedDoctor.name}`,
      }

      setTransactions([newTransaction, ...transactions])
      setBalance(balance - selectedDoctor.price)
      setIsConsultationDialogOpen(false)

      toast({
        title: "Payment Successful",
        description: `₹${selectedDoctor.price.toLocaleString("en-IN")} paid to ${selectedDoctor.name}`,
      })
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscription = async () => {
    if (!selectedCampaign || !monthlyDonationAmount) return

    setIsLoading(true)
    try {
      // Simulate subscription setup
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newSubscription: Subscription = {
        id: Date.now().toString(),
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        amount: Number.parseFloat(monthlyDonationAmount),
        frequency: subscriptionFrequency,
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "active",
        totalDonated: 0,
      }

      setSubscriptions([newSubscription, ...subscriptions])
      setIsSubscriptionDialogOpen(false)
      setMonthlyDonationAmount("")

      toast({
        title: "Subscription Created",
        description: `₹${Number.parseFloat(monthlyDonationAmount).toLocaleString("en-IN")} ${subscriptionFrequency} subscription to ${selectedCampaign.title}`,
      })
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async (subscriptionId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubscriptions(
        subscriptions.map((sub) => (sub.id === subscriptionId ? { ...sub, status: "cancelled" as const } : sub)),
      )

      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully.",
      })
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "active":
        return "bg-blue-100 text-blue-700"
      case "paused":
        return "bg-orange-100 text-orange-700"
      case "cancelled":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getGenderIcon = (gender: "male" | "female") => {
    return gender === "male" ? "👨‍⚕️" : "👩‍⚕️"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">💳 Donation & Doctor Payment Portal</h1>
          <p className="text-xl text-slate-600">
            Support mental health initiatives and pay for consultations using Web3 technology
          </p>
        </div>

        {/* Wallet Connection */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {walletConnected ? "Wallet Connected" : "Connect Your Wallet"}
                  </h3>
                  <p className="text-slate-600">
                    {walletConnected
                      ? `${walletAddress} • Balance: ₹${balance.toLocaleString("en-IN")}`
                      : "Connect your Martian Aptos Wallet to start making payments"}
                  </p>
                </div>
              </div>
              {!walletConnected && (
                <Button onClick={connectWallet} disabled={isLoading} size="lg" className="px-8">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {walletConnected && (
          <Tabs defaultValue="donations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="donations" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Donations
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Subscriptions
              </TabsTrigger>
              <TabsTrigger value="consultations" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Consultations
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Donations Tab */}
            <TabsContent value="donations">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Heart className="w-5 h-5 text-red-500" />
                      Support Mental Health Campaigns
                    </CardTitle>
                    <CardDescription>Make a difference by supporting mental health initiatives</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="card-hover border-2 hover:border-purple-300">
                      <CardHeader className="pb-4">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <CardTitle className="text-lg text-slate-800">{campaign.title}</CardTitle>
                        <CardDescription className="text-sm">{campaign.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">
                              {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}%
                            </span>
                          </div>
                          <Progress value={(campaign.currentAmount / campaign.targetAmount) * 100} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              ₹{campaign.currentAmount.toLocaleString("en-IN")} raised
                            </span>
                            <span className="text-slate-600">
                              ₹{campaign.targetAmount.toLocaleString("en-IN")} goal
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {campaign.supporters} supporters
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {campaign.daysLeft} days left
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => setSelectedCampaign(campaign)}
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                              >
                                <Heart className="w-4 h-4 mr-2" />
                                Donate Now
                              </Button>
                            </DialogTrigger>
                          </Dialog>

                          <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => setSelectedCampaign(campaign)}
                                variant="outline"
                                className="flex-1"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Subscribe
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Monthly Donation Subscriptions
                    </CardTitle>
                    <CardDescription>Manage your recurring donations to mental health campaigns</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid gap-6">
                  {subscriptions.map((subscription) => (
                    <Card key={subscription.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{subscription.campaignTitle}</h3>
                              <p className="text-sm text-slate-600">
                                ₹{subscription.amount.toLocaleString("en-IN")} {subscription.frequency}
                              </p>
                              <p className="text-sm text-slate-500">
                                Total donated: ₹{subscription.totalDonated.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(subscription.status)}>
                              {getStatusIcon(subscription.status)}
                              <span className="ml-1 capitalize">{subscription.status}</span>
                            </Badge>
                            <p className="text-sm text-slate-600">
                              Next payment: {new Date(subscription.nextPayment).toLocaleDateString("en-IN")}
                            </p>
                            {subscription.status === "active" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cancelSubscription(subscription.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {subscriptions.length === 0 && (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No active subscriptions</h3>
                        <p className="text-slate-500">
                          Set up monthly donations to support mental health campaigns consistently.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Consultations Tab */}
            <TabsContent value="consultations">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      Pay for Doctor Consultations
                    </CardTitle>
                    <CardDescription>Secure payments for mental health consultations</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id} className="card-hover border-2 hover:border-green-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={doctor.image || "/placeholder.svg"}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm border-2 border-green-100">
                              {getGenderIcon(doctor.gender)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                              {doctor.name}
                              <span className="text-lg">{getGenderIcon(doctor.gender)}</span>
                            </CardTitle>
                            <CardDescription className="text-green-600 font-medium">{doctor.specialty}</CardDescription>
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
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">{doctor.availability}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-lg font-bold text-slate-800">
                            ₹{doctor.price.toLocaleString("en-IN")}/session
                          </div>
                          <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => setSelectedDoctor(doctor)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Pay Now
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Transaction History Tab */}
            <TabsContent value="history">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Clock className="w-5 h-5 text-slate-600" />
                      Transaction History
                    </CardTitle>
                    <CardDescription>View all your donations and consultation payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                              {transaction.type === "donation" && <Heart className="w-6 h-6 text-red-500" />}
                              {transaction.type === "consultation" && (
                                <Stethoscope className="w-6 h-6 text-green-600" />
                              )}
                              {transaction.type === "subscription" && <Calendar className="w-6 h-6 text-blue-600" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{transaction.recipient}</h3>
                              <p className="text-sm text-slate-600">{transaction.description}</p>
                              <p className="text-sm text-slate-500">
                                {new Date(transaction.date).toLocaleDateString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(transaction.status)}>
                                {getStatusIcon(transaction.status)}
                                <span className="ml-1 capitalize">{transaction.status}</span>
                              </Badge>
                            </div>
                            <p className="text-lg font-bold text-slate-800">
                              ₹{transaction.amount.toLocaleString("en-IN")}
                            </p>
                            <p className="text-sm text-slate-500">{(transaction.amount / aptToINR).toFixed(4)} APT</p>
                          </div>
                        </div>
                      ))}

                      {transactions.length === 0 && (
                        <div className="text-center py-8">
                          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-slate-600 mb-2">No transactions yet</h3>
                          <p className="text-slate-500">
                            Your donation and consultation payment history will appear here.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Features Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-slate-800">
              🌟 Why Choose MediMate Payment Portal?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Secure Payments</h3>
                <p className="text-sm text-slate-600">Blockchain-secured transactions with full transparency</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Instant Transfers</h3>
                <p className="text-sm text-slate-600">Fast and efficient Web3 payments</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Verified Recipients</h3>
                <p className="text-sm text-slate-600">All campaigns and doctors are verified</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Impact Tracking</h3>
                <p className="text-sm text-slate-600">See the real impact of your contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation Dialog */}
        <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>Support {selectedCampaign?.title} with your contribution</DialogDescription>
            </DialogHeader>

            {selectedCampaign && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedCampaign.title}</h4>
                    <p className="text-sm text-slate-600">by {selectedCampaign.organizer}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donation-amount">Donation Amount (₹)</Label>
                  <Input
                    id="donation-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                  <div className="flex gap-2">
                    {[500, 1000, 2500, 5000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDonationAmount(amount.toString())}
                      >
                        ₹{amount.toLocaleString("en-IN")}
                      </Button>
                    ))}
                  </div>
                </div>

                {donationAmount && (
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Total Donation</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ₹{Number.parseFloat(donationAmount).toLocaleString("en-IN")}
                      </div>
                      <div className="text-sm text-slate-600">
                        {(Number.parseFloat(donationAmount) / aptToINR).toFixed(4)} APT
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleDonation}
                  disabled={isLoading || !donationAmount}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Donation...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Donate ₹{donationAmount ? Number.parseFloat(donationAmount).toLocaleString("en-IN") : "0"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Consultation Payment Dialog */}
        <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Pay for Consultation</DialogTitle>
              <DialogDescription>Complete payment for your consultation with {selectedDoctor?.name}</DialogDescription>
            </DialogHeader>

            {selectedDoctor && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <img
                    src={selectedDoctor.image || "/placeholder.svg"}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedDoctor.name}</h4>
                    <p className="text-sm text-green-600">{selectedDoctor.specialty}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span className="font-medium">Consultation Fee</span>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{selectedDoctor.price.toLocaleString("en-IN")}</div>
                    <div className="text-sm text-slate-600">{(selectedDoctor.price / aptToINR).toFixed(4)} APT</div>
                  </div>
                </div>

                <Button
                  onClick={handleConsultationPayment}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Pay ₹{selectedDoctor.price.toLocaleString("en-IN")}
                    </>
                  )}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Subscription Dialog */}
        <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Set Up Monthly Donation</DialogTitle>
              <DialogDescription>Create a recurring donation to {selectedCampaign?.title}</DialogDescription>
            </DialogHeader>

            {selectedCampaign && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedCampaign.title}</h4>
                    <p className="text-sm text-slate-600">by {selectedCampaign.organizer}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-amount">Monthly Donation Amount (₹)</Label>
                  <Input
                    id="monthly-amount"
                    type="number"
                    placeholder="Enter monthly amount"
                    value={monthlyDonationAmount}
                    onChange={(e) => setMonthlyDonationAmount(e.target.value)}
                  />
                  <div className="flex gap-2">
                    {[500, 1000, 2000, 3000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setMonthlyDonationAmount(amount.toString())}
                      >
                        ₹{amount.toLocaleString("en-IN")}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select value={subscriptionFrequency} onValueChange={setSubscriptionFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {monthlyDonationAmount && (
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">
                      {subscriptionFrequency.charAt(0).toUpperCase() + subscriptionFrequency.slice(1)} Donation
                    </span>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ₹{Number.parseFloat(monthlyDonationAmount).toLocaleString("en-IN")}
                      </div>
                      <div className="text-sm text-slate-600">
                        {(Number.parseFloat(monthlyDonationAmount) / aptToINR).toFixed(4)} APT
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSubscription}
                  disabled={isLoading || !monthlyDonationAmount}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up Subscription...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Up {subscriptionFrequency.charAt(0).toUpperCase() + subscriptionFrequency.slice(1)} Donation
                    </>
                  )}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
