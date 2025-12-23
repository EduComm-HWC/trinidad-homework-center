'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award, 
  Video, 
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Target,
  Star,
  MapPin,
  Globe
} from 'lucide-react'

// Import tab components
import OverviewTab from '@/components/tabs/OverviewTab'
import RegistrationTab from '@/components/tabs/RegistrationTab'
import StudentsTab from '@/components/tabs/StudentsTab'
import VolunteersTab from '@/components/tabs/VolunteersTab'
import SessionsTab from '@/components/tabs/SessionsTab'
import ProgressTab from '@/components/tabs/ProgressTab'
import AssessmentsTab from '@/components/tabs/AssessmentsTab'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeVolunteers: 0,
    weeklySessions: 0,
    averageProgress: 0
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 3),
        activeVolunteers: prev.activeVolunteers + Math.floor(Math.random() * 2),
        weeklySessions: prev.weeklySessions + Math.floor(Math.random() * 5),
        averageProgress: Math.min(100, prev.averageProgress + Math.random() * 2)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-black-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Faith Tabernacle Homework Center</h1>
                <p className="text-sm text-gray-500">Education Committee Initiative</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Trinidad & Tobago</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Caribbean Context</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.totalStudents}</div>
              <p className="text-xs text-blue-700">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Active Volunteers</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stats.activeVolunteers}</div>
              <p className="text-xs text-green-700">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Weekly Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.weeklySessions}</div>
              <p className="text-xs text-purple-700">+15% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{stats.averageProgress.toFixed(1)}%</div>
              <Progress value={stats.averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="registration" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Registration</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <RegistrationTab />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <VolunteersTab />
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <SessionsTab />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressTab />
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <AssessmentsTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Faith Tabernacle Homework Center - Education Committee Initiative
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Serving Trinidad & Tobago students with excellence in education
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}