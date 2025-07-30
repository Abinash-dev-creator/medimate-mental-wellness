"use client"

import {
  Home,
  User,
  Stethoscope,
  Brain,
  Coins,
  Sparkles,
  Phone,
  AlertTriangle,
  Calendar,
  Lock,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "User Onboarding",
    url: "/onboarding",
    icon: User,
  },
  {
    title: "Health Assessment",
    url: "/assessment",
    icon: Stethoscope,
  },
  {
    title: "Mental Health",
    url: "/mental-health",
    icon: Brain,
  },
  {
    title: "Blockchain Campaign",
    url: "/blockchain",
    icon: Coins,
  },
  {
    title: "Recommendations",
    url: "/recommendations",
    icon: Sparkles,
  },
  {
    title: "Teleconsultation",
    url: "/teleconsultation",
    icon: Phone,
  },
  {
    title: "Emergency Protocol",
    url: "/emergency",
    icon: AlertTriangle,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
]

const bottomItems = [
  {
    title: "Login / Sign Up",
    url: "/auth",
    icon: Lock,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-blue-100">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-l2mHNeop5r1FYpkYMnp7lz68PGjgRO.png"
              alt="MediMate logo"
              className="w-6 h-6"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">MediMate</h1>
            <p className="text-sm text-blue-600">Mental Wellness</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="p-4 text-center">
          <p className="text-xs text-slate-500">v1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
