'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
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
  Globe,
  Activity,
  DollarSign,
  UserCheck,
  BookMarked,
  GraduationCap
} from 'lucide-react'

export default function OverviewTab() {
  // Sample data for demonstration
  const recentActivity = [
    { id: 1, type: 'session', title: 'Math Tutoring - John Smith', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'registration', title: 'New Student: Sarah Johnson', time: '3 hours ago', status: 'success' },
    { id: 3, type: 'assessment', title: 'SEA Practice Test Completed', time: '5 hours ago', status: 'completed' },
    { id: 4, type: 'volunteer', title: 'New Volunteer: Michael Brown', time: '1 day ago', status: 'success' },
  ]

  const upcomingSessions = [
    { id: 1, student: 'Emily Davis', subject: 'English Language', time: 'Today, 3:00 PM', volunteer: 'Ms. Wilson' },
    { id: 2, student: 'James Wilson', subject: 'Mathematics', time: 'Today, 4:00 PM', volunteer: 'Mr. Johnson' },
    { id: 3, student: 'Sophia Taylor', subject: 'Science', time: 'Tomorrow, 2:00 PM', volunteer: 'Dr. Brown' },
  ]

  const topPerformers = [
    { id: 1, name: 'Amanda Roberts', grade: 'Standard 5', progress: 95, subjects: ['Math', 'English'] },
    { id: 2, name: 'David Martinez', grade: 'Form 4', progress: 88, subjects: ['Physics', 'Chemistry'] },
    { id: 3, name: 'Lisa Chen', grade: 'Standard 4', progress: 82, subjects: ['English', 'Social Studies'] },
  ]

  const trinidadSchools = [
    'St. Joseph\'s Convent POS',
    'Queen\'s Royal College',
    'St. Mary\'s College',
    'Holy Faith Convent',
    'Naparima Girls\' College',
    'Presentation College',
    'St. Augustine Girls\' High School',
    'Bishop Anstey High School'
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Active Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">247</div>
            <p className="text-xs text-blue-700">127 Primary, 120 Secondary</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Volunteer Tutors</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">38</div>
            <p className="text-xs text-green-700">32 Active, 6 On Leave</p>
            <div className="flex items-center mt-2">
              <UserCheck className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">94% satisfaction rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Monthly Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">892</div>
            <p className="text-xs text-purple-700">22.3 per day average</p>
            <div className="flex items-center mt-2">
              <Activity className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-xs text-purple-600">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">87%</div>
            <p className="text-xs text-orange-700">Students meeting grade level</p>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates from homework center</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Sessions</span>
            </CardTitle>
            <CardDescription>Next scheduled tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{session.student}</p>
                  <Badge variant="outline" className="text-xs">{session.time}</Badge>
                </div>
                <p className="text-xs text-gray-600">{session.subject}</p>
                <p className="text-xs text-gray-500">with {session.volunteer}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Top Performers</span>
            </CardTitle>
            <CardDescription>Students showing exceptional progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((student) => (
              <div key={student.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {student.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-500">{student.grade}</p>
                  <div className="flex items-center mt-1">
                    <Progress value={student.progress} className="flex-1 h-1" />
                    <span className="text-xs text-gray-600 ml-2">{student.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Students
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Trinidad & Tobago Context */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Trinidad & Tobago Schools</span>
            </CardTitle>
            <CardDescription>Represented schools in our program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {trinidadSchools.map((school, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-xs text-gray-700">{school}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Schools Represented:</span>
                <Badge variant="secondary">24</Badge>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Parishes Covered:</span>
                <Badge variant="secondary">8/14</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>SEA & CSEC Preparation</span>
            </CardTitle>
            <CardDescription>National exam preparation progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">SEA Students Ready</span>
                <span className="text-sm text-gray-600">68/85</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">CSEC Students Ready</span>
                <span className="text-sm text-gray-600">45/62</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">92%</div>
                <div className="text-xs text-blue-700">Math Pass Rate</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">88%</div>
                <div className="text-xs text-green-700">English Pass Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-xs">Register Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Schedule Session</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BookMarked className="h-6 w-6" />
              <span className="text-xs">Generate Test</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Video className="h-6 w-6" />
              <span className="text-xs">Start Video Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}