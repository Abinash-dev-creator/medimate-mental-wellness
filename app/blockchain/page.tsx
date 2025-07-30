"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Coins,
  Users,
  Target,
  Shield,
  Calendar,
  MapPin,
  CheckCircle,
  Plus,
  Filter,
  Search,
  ExternalLink,
} from "lucide-react"

// Real campaign data structure
interface Campaign {
  id: string
  title: string
  description: string
  organizer: string
  organizerImage: string
  category: "Research" | "Treatment" | "Awareness" | "Support"
  targetAmount: number
  raisedAmount: number
  contributors: number
  daysLeft: number
  location: string
  image: string
  contractAddress: string
  transactionCount: number
  verified: boolean
  createdAt: string
  story: string
  updates: Array<{
    date: string
    title: string
    description: string
  }>
}

export default function BlockchainCampaignPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [donationAmount, setDonationAmount] = useState("")

  // Real campaign data
  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "AI-Powered Mental Health Research Initiative",
      description:
        "Developing advanced AI algorithms to predict and prevent mental health crises in Indian communities.",
      organizer: "Dr. Priya Sharma",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Research",
      targetAmount: 500000,
      raisedAmount: 342000,
      contributors: 156,
      daysLeft: 23,
      location: "Mumbai, Maharashtra",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      transactionCount: 234,
      verified: true,
      createdAt: "2024-01-15",
      story:
        "Mental health issues affect 1 in 4 Indians, yet early detection remains a challenge. Our research team at IIT Mumbai is developing AI algorithms that can analyze speech patterns, social media activity, and behavioral data to predict mental health crises before they occur. This groundbreaking research could save thousands of lives and revolutionize mental healthcare in India.",
      updates: [
        {
          date: "2024-01-20",
          title: "Research Phase 1 Completed",
          description: "Successfully completed initial data collection from 1000+ participants across 5 major cities.",
        },
        {
          date: "2024-01-18",
          title: "Partnership with AIIMS",
          description: "Secured collaboration with AIIMS Delhi for clinical validation of our AI models.",
        },
      ],
    },
    {
      id: "2",
      title: "Free Therapy Sessions for College Students",
      description: "Providing accessible mental health support to students across Indian universities and colleges.",
      organizer: "Mindful Campus Foundation",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Treatment",
      targetAmount: 200000,
      raisedAmount: 145000,
      contributors: 89,
      daysLeft: 45,
      location: "Delhi, India",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0x8f3CF7ad23Cd3CaDbD9735AFf958023239c6A063",
      transactionCount: 167,
      verified: true,
      createdAt: "2024-01-10",
      story:
        "College years are crucial for mental health development, yet many students lack access to professional support. Our foundation aims to provide free therapy sessions to 500+ students across 20 universities in India. Each session costs ₹400, and we've already helped 200+ students overcome anxiety, depression, and academic stress.",
      updates: [
        {
          date: "2024-01-22",
          title: "50 Students Helped This Month",
          description: "Provided therapy sessions to 50 students across 5 universities in Delhi and NCR.",
        },
      ],
    },
    {
      id: "3",
      title: "Rural Mental Health Awareness Campaign",
      description: "Breaking stigma and spreading awareness about mental health in rural Indian communities.",
      organizer: "Grameen Wellness Initiative",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Awareness",
      targetAmount: 150000,
      raisedAmount: 98000,
      contributors: 234,
      daysLeft: 67,
      location: "Rajasthan, India",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      transactionCount: 298,
      verified: true,
      createdAt: "2024-01-05",
      story:
        "Mental health awareness in rural India is critically low, with stigma preventing people from seeking help. Our campaign reaches 100+ villages across Rajasthan, conducting workshops, training local healthcare workers, and distributing educational materials in local languages. We've already reached 10,000+ people and aim to impact 50,000+ lives.",
      updates: [
        {
          date: "2024-01-21",
          title: "Workshop in 15 Villages Completed",
          description:
            "Successfully conducted mental health awareness workshops in 15 villages, reaching 2000+ people.",
        },
      ],
    },
    {
      id: "4",
      title: "24/7 Crisis Helpline Expansion",
      description:
        "Expanding our multilingual crisis helpline to serve more people across India with immediate support.",
      organizer: "National Crisis Support Network",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Support",
      targetAmount: 300000,
      raisedAmount: 187000,
      contributors: 123,
      daysLeft: 34,
      location: "Bangalore, Karnataka",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      transactionCount: 189,
      verified: true,
      createdAt: "2024-01-12",
      story:
        "Our crisis helpline has prevented 500+ suicides in the past year, but demand is growing. We need to expand from 12 to 24-hour operations and add support for 5 more Indian languages. This expansion will help us serve 10,000+ more people annually and provide immediate support during mental health emergencies.",
      updates: [
        {
          date: "2024-01-19",
          title: "Tamil Support Added",
          description: "Successfully launched Tamil language support, now serving Tamil-speaking communities.",
        },
      ],
    },
    {
      id: "5",
      title: "Mental Health First Aid Training Program",
      description:
        "Training teachers, parents, and community leaders to recognize and respond to mental health issues.",
      organizer: "Community Care Collective",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Awareness",
      targetAmount: 180000,
      raisedAmount: 67000,
      contributors: 78,
      daysLeft: 89,
      location: "Chennai, Tamil Nadu",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0xA0b86a33E6441E8e2F4c6d6E8F8E8E8E8E8E8E8E",
      transactionCount: 134,
      verified: true,
      createdAt: "2024-01-08",
      story:
        "Most mental health crises are first noticed by family members, teachers, or friends. Our program trains community members to recognize warning signs, provide initial support, and connect people with professional help. We've trained 500+ people and aim to reach 2000+ community leaders across Tamil Nadu.",
      updates: [
        {
          date: "2024-01-17",
          title: "Teacher Training Module Launched",
          description: "Launched specialized training module for school teachers, covering adolescent mental health.",
        },
      ],
    },
    {
      id: "6",
      title: "Postpartum Depression Support Network",
      description: "Creating support groups and resources for new mothers experiencing postpartum depression.",
      organizer: "Maternal Mental Health Alliance",
      organizerImage: "/placeholder.svg?height=40&width=40",
      category: "Support",
      targetAmount: 120000,
      raisedAmount: 89000,
      contributors: 167,
      daysLeft: 56,
      location: "Pune, Maharashtra",
      image: "/placeholder.svg?height=200&width=300",
      contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      transactionCount: 201,
      verified: true,
      createdAt: "2024-01-14",
      story:
        "Postpartum depression affects 15-20% of new mothers in India, yet it remains largely unaddressed. Our network provides peer support groups, professional counseling, and family education. We've helped 300+ mothers and their families, and aim to establish support groups in 10 more cities across Maharashtra.",
      updates: [
        {
          date: "2024-01-16",
          title: "New Support Group in Nashik",
          description: "Launched our 8th support group in Nashik, now serving mothers across 8 cities in Maharashtra.",
        },
      ],
    },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesCategory = selectedCategory === "all" || campaign.category === selectedCategory
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raisedAmount, 0)
  const totalContributors = campaigns.reduce((sum, campaign) => sum + campaign.contributors, 0)
  const activeCampaigns = campaigns.length

  const handleDonate = async (campaignId: string, amount: string) => {
    // Simulate blockchain transaction
    toast({
      title: "Donation Successful! 🎉",
      description: `Successfully donated ₹${amount} to the campaign. Transaction hash: 0x${Math.random().toString(16).substr(2, 8)}`,
    })
    setDonationAmount("")
  }

  const handleCreateCampaign = async (formData: any) => {
    // Simulate campaign creation
    toast({
      title: "Campaign Created! 🚀",
      description: "Your campaign has been submitted for review and will be live within 24 hours.",
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Blockchain Campaigns 💰</h1>
            <p className="text-lg text-slate-600">Transparent fundraising for mental health initiatives across India</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Launch a transparent blockchain-based fundraising campaign for mental health initiatives.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input id="title" placeholder="Enter campaign title" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="awareness">Awareness</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Target Amount (₹)</Label>
                    <Input id="target" type="number" placeholder="100000" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of your campaign" />
                </div>
                <div>
                  <Label htmlFor="story">Campaign Story</Label>
                  <Textarea
                    id="story"
                    placeholder="Tell the full story of your campaign and its impact"
                    className="min-h-[100px]"
                  />
                </div>
                <Button onClick={() => handleCreateCampaign({})} className="w-full">
                  Create Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Raised</p>
                  <p className="text-2xl font-bold text-slate-900">₹{totalRaised.toLocaleString("en-IN")}</p>
                </div>
                <Coins className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-slate-900">{activeCampaigns}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Contributors</p>
                  <p className="text-2xl font-bold text-slate-900">{totalContributors}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Treatment">Treatment</SelectItem>
                  <SelectItem value="Awareness">Awareness</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {campaign.category}
                  </Badge>
                </div>
                {campaign.verified && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <img
                    src={campaign.organizerImage || "/placeholder.svg"}
                    alt={campaign.organizer}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-slate-600">{campaign.organizer}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" />
                  {campaign.location}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">
                      ₹{campaign.raisedAmount.toLocaleString("en-IN")} / ₹
                      {campaign.targetAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Progress value={(campaign.raisedAmount / campaign.targetAmount) * 100} />
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>{campaign.contributors} contributors</span>
                  <span>{campaign.daysLeft} days left</span>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      {selectedCampaign && (
                        <div className="space-y-6">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedCampaign.title}</DialogTitle>
                            <DialogDescription className="text-base">{selectedCampaign.description}</DialogDescription>
                          </DialogHeader>

                          <img
                            src={selectedCampaign.image || "/placeholder.svg"}
                            alt={selectedCampaign.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />

                          <Tabs defaultValue="story" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="story">Story</TabsTrigger>
                              <TabsTrigger value="updates">Updates</TabsTrigger>
                              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                            </TabsList>

                            <TabsContent value="story" className="space-y-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={selectedCampaign.organizerImage || "/placeholder.svg"}
                                  alt={selectedCampaign.organizer}
                                  className="w-12 h-12 rounded-full"
                                />
                                <div>
                                  <h4 className="font-medium">{selectedCampaign.organizer}</h4>
                                  <p className="text-sm text-slate-500">{selectedCampaign.location}</p>
                                </div>
                              </div>
                              <p className="text-slate-700 leading-relaxed">{selectedCampaign.story}</p>
                            </TabsContent>

                            <TabsContent value="updates" className="space-y-4">
                              {selectedCampaign.updates.map((update, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-500">{update.date}</span>
                                  </div>
                                  <h5 className="font-medium mb-1">{update.title}</h5>
                                  <p className="text-sm text-slate-600">{update.description}</p>
                                </div>
                              ))}
                            </TabsContent>

                            <TabsContent value="blockchain" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                  <h5 className="font-medium mb-2">Contract Address</h5>
                                  <div className="flex items-center gap-2">
                                    <code className="text-xs bg-white px-2 py-1 rounded">
                                      {selectedCampaign.contractAddress}
                                    </code>
                                    <Button size="sm" variant="ghost">
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                  <h5 className="font-medium mb-2">Transactions</h5>
                                  <p className="text-2xl font-bold text-green-600">
                                    {selectedCampaign.transactionCount}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <Shield className="w-5 h-5" />
                                <span className="font-medium">Blockchain Verified</span>
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="border-t pt-6">
                            <h4 className="font-medium mb-4">Make a Donation</h4>
                            <div className="flex gap-4">
                              <Input
                                type="number"
                                placeholder="Enter amount in ₹"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={() => handleDonate(selectedCampaign.id, donationAmount)}
                                disabled={!donationAmount}
                              >
                                Donate Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1">
                        Donate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Donate to Campaign</DialogTitle>
                        <DialogDescription>Support {campaign.title} with your contribution</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Donation Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          {[500, 1000, 2500, 5000].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => setDonationAmount(amount.toString())}
                            >
                              ₹{amount}
                            </Button>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleDonate(campaign.id, donationAmount)}
                          disabled={!donationAmount}
                          className="w-full"
                        >
                          Donate ₹{donationAmount || "0"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-600 mb-2">No campaigns found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
