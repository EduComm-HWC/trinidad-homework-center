'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  BookOpen, 
  FileText, 
  Brain, 
  Heart, 
  Activity, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  Star,
  BarChart3,
  Settings,
  PlusCircle,
  UserPlus,
  ClipboardList,
  GraduationCap
} from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalStudents: 156,
    activeTutors: 12,
    totalSessions: 2340,
    averageScore: 3.8,
    highRiskStudents: 8,
    recentAssessments: 45
  }

  const recentActivity = [
    { id: 1, type: "assessment", student: "Sarah Johnson", subject: "Mathematics", score: 4.2, time: "2 hours ago" },
    { id: 2, type: "registration", student: "Michael Brown", subject: "New Student", score: null, time: "3 hours ago" },
    { id: 3, type: "session", student: "Emma Davis", subject: "English", score: 3.8, time: "5 hours ago" },
    { id: 4, type: "assessment", student: "James Wilson", subject: "Science", score: 3.5, time: "6 hours ago" },
    { id: 5, type: "session", student: "Olivia Martinez", subject: "History", score: 4.0, time: "8 hours ago" }
  ]

  const quickActions = [
    {
      title: "Child Registration",
      description: "Register a new student with comprehensive intake form",
      icon: UserPlus,
      color: "bg-blue-500",
      href: "/register"
    },
    {
      title: "Session Assessment",
      description: "Complete detailed assessment for tutoring session",
      icon: ClipboardList,
      color: "bg-green-500",
      href: "/assessment"
    },
    {
      title: "Assessment Dashboard",
      description: "View student progress and analytics",
      icon: BarChart3,
      color: "bg-purple-500",
      href: "/dashboard"
    },
    {
      title: "Student Management",
      description: "Manage student profiles and records",
      icon: Users,
      color: "bg-orange-500",
      href: "/students"
    },
    {
      title: "Tutor Assignment",
      description: "Assign tutors to students and sessions",
      icon: GraduationCap,
      color: "bg-indigo-500",
      href: "/tutors"
    },
    {
      title: "Parent Portal",
      description: "Parent communication and updates",
      icon: Heart,
      color: "bg-pink-500",
      href: "/parents"
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment": return <Brain className="h-4 w-4" />
      case "registration": return <UserPlus className="h-4 w-4" />
      case "session": return <BookOpen className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "assessment": return "bg-blue-100 text-blue-800"
      case "registration": return "bg-green-100 text-green-800"
      case "session": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trinidad & Tobago Homework Center</h1>
                <p className="text-sm text-gray-500">Holistic Student Support System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Dashboard</h2>
          <p className="text-gray-600">Comprehensive assessment and tracking system for student holistic development</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTutors}</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                +156 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}/5.0</div>
              <Progress value={(stats.averageScore / 5) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used tasks and features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Button
                          key={action.title}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                          onClick={() => window.location.href = action.href}
                        >
                          <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-sm">{action.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{activity.student}</span>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{activity.subject}</span>
                            {activity.score && (
                              <Badge variant="outline" className="text-xs">
                                {activity.score}/5.0
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Alert */}
            {stats.highRiskStudents > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    High Risk Students Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 mb-4">
                    {stats.highRiskStudents} students require immediate attention based on recent assessments.
                  </p>
                  <Button variant="destructive" size="sm">
                    View High Risk Students
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Assessment Features</CardTitle>
                  <CardDescription>Comprehensive assessment tools for holistic student development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Brain className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Academic Assessment</h4>
                        <p className="text-sm text-gray-600">Track preparation, homework, participation, and understanding</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div>
                        <h4 className="font-medium">Emotional Assessment</h4>
                        <p className="text-sm text-gray-600">Monitor confidence, motivation, and emotional state</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Users className="h-8 w-8 text-green-500" />
                      <div>
                        <h4 className="font-medium">Social Assessment</h4>
                        <p className="text-sm text-gray-600">Evaluate communication, teamwork, and peer interaction</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Activity className="h-8 w-8 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Physical Assessment</h4>
                        <p className="text-sm text-gray-600">Assess energy levels, wellbeing, and nutrition</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Assessment</CardTitle>
                  <CardDescription>Start a new assessment session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    New Session Assessment
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Assessment Dashboard
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Assessment Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Comprehensive student profiles and registration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <UserPlus className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Child Registration</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete intake form with 8 comprehensive sections</p>
                    <Button size="sm">Register New Student</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Student Profiles</h3>
                    <p className="text-sm text-gray-600 mb-4">View and manage existing student records</p>
                    <Button size="sm" variant="outline">View All Students</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Parent Portal</h3>
                    <p className="text-sm text-gray-600 mb-4">Parent communication and updates</p>
                    <Button size="sm" variant="outline">Parent Portal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Comprehensive data analysis and reporting tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <BarChart3 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Assessment Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">Real-time progress tracking and analytics</p>
                    <Button size="sm">View Dashboard</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <TrendingUp className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Progress Reports</h3>
                    <p className="text-sm text-gray-600 mb-4">Detailed student progress analysis</p>
                    <Button size="sm" variant="outline">Generate Reports</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}