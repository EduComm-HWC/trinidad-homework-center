'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BookOpen,
  Calendar,
  Star,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Users,
  Download,
  Filter,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Brain,
  Heart,
  Zap
} from 'lucide-react'

export default function ProgressTab() {
  const [selectedStudent, setSelectedStudent] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  // Sample progress data
  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      grade: 'Standard 5',
      avatar: '/avatars/sarah.jpg',
      overallProgress: 92,
      improvement: 15,
      subjects: [
        { name: 'Mathematics', score: 95, improvement: 18, trend: 'up' },
        { name: 'English', score: 88, improvement: 12, trend: 'up' },
        { name: 'Science', score: 90, improvement: 15, trend: 'up' },
        { name: 'Social Studies', score: 85, improvement: 10, trend: 'stable' }
      ],
      assessments: 12,
      sessions: 45,
      nextMilestone: 'SEA Exam Readiness',
      strengths: ['Problem Solving', 'Critical Thinking'],
      areasForImprovement: ['Creative Writing'],
      learningGoals: ['Master algebraic equations', 'Improve essay structure'],
      achievements: ['Math Competition Winner', 'Perfect Attendance'],
      riskFactors: ['Test anxiety'],
      recommendations: ['Practice relaxation techniques', 'Extra writing practice']
    },
    {
      id: 2,
      name: 'Michael Brown',
      grade: 'Form 4',
      avatar: '/avatars/michael.jpg',
      overallProgress: 78,
      improvement: 8,
      subjects: [
        { name: 'Physics', score: 82, improvement: 10, trend: 'up' },
        { name: 'Chemistry', score: 75, improvement: 5, trend: 'stable' },
        { name: 'Mathematics', score: 80, improvement: 8, trend: 'up' },
        { name: 'English', score: 70, improvement: 3, trend: 'down' }
      ],
      assessments: 8,
      sessions: 38,
      nextMilestone: 'CSEC Physics',
      strengths: ['Logical Reasoning', 'Mathematical Skills'],
      areasForImprovement: ['Essay Writing', 'Time Management'],
      learningGoals: ['Complete physics syllabus', 'Improve lab reports'],
      achievements: ['Science Fair Participant'],
      riskFactors: ['Procrastination', 'Poor time management'],
      recommendations: ['Structured study schedule', 'Writing workshops']
    },
    {
      id: 3,
      name: 'Emily Davis',
      grade: 'Standard 3',
      avatar: '/avatars/emily.jpg',
      overallProgress: 85,
      improvement: 12,
      subjects: [
        { name: 'English', score: 90, improvement: 15, trend: 'up' },
        { name: 'Science', score: 85, improvement: 10, trend: 'up' },
        { name: 'Mathematics', score: 78, improvement: 8, trend: 'stable' },
        { name: 'Social Studies', score: 88, improvement: 12, trend: 'up' }
      ],
      assessments: 10,
      sessions: 28,
      nextMilestone: 'Reading Fluency',
      strengths: ['Reading Comprehension', 'Creative Writing'],
      areasForImprovement: ['Mathematical Concepts'],
      learningGoals: ['Improve multiplication skills', 'Read chapter books'],
      achievements: ['Reading Champion', 'Best Story Writer'],
      riskFactors: ['Math anxiety'],
      recommendations: ['Math games', 'Peer tutoring']
    }
  ]

  const classProgress = [
    { grade: 'Standard 1', averageProgress: 75, totalStudents: 15 },
    { grade: 'Standard 2', averageProgress: 78, totalStudents: 18 },
    { grade: 'Standard 3', averageProgress: 82, totalStudents: 20 },
    { grade: 'Standard 4', averageProgress: 85, totalStudents: 22 },
    { grade: 'Standard 5', averageProgress: 88, totalStudents: 25 },
    { grade: 'Form 1', averageProgress: 72, totalStudents: 30 },
    { grade: 'Form 2', averageProgress: 76, totalStudents: 28 },
    { grade: 'Form 3', averageProgress: 80, totalStudents: 25 },
    { grade: 'Form 4', averageProgress: 83, totalStudents: 22 },
    { grade: 'Form 5', averageProgress: 86, totalStudents: 20 }
  ]

  const subjectProgress = [
    { name: 'Mathematics', averageScore: 82, improvement: 10, students: 45 },
    { name: 'English', averageScore: 85, improvement: 8, students: 50 },
    { name: 'Science', averageScore: 78, improvement: 12, students: 35 },
    { name: 'Social Studies', averageScore: 80, improvement: 6, students: 40 },
    { name: 'Information Technology', averageScore: 88, improvement: 15, students: 25 }
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 80) return 'bg-blue-500'
    if (progress >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getRiskLevel = (riskFactors) => {
    if (riskFactors.length === 0) return { level: 'Low', color: 'bg-green-100 text-green-800' }
    if (riskFactors.length <= 2) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    return { level: 'High', color: 'bg-red-100 text-red-800' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
          <p className="text-gray-600">Monitor student academic growth and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.name}>
                    {student.name} ({student.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Social Studies">Social Studies</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((acc, s) => acc + s.overallProgress, 0) / students.length)}%
            </div>
            <p className="text-xs text-gray-600">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.overallProgress < 80).length}
            </div>
            <p className="text-xs text-gray-600">Need intervention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.overallProgress >= 90).length}
            </div>
            <p className="text-xs text-gray-600">90%+ progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((acc, s) => acc + s.improvement, 0) / students.length)}%
            </div>
            <p className="text-xs text-gray-600">Average improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Student Progress */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Individual Student Progress</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.grade}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{student.overallProgress}%</div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon('up')}
                      <span className="text-sm text-green-600">+{student.improvement}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Subject Progress */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Subject Progress</h5>
                  <div className="space-y-2">
                    {student.subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700">{subject.name}</span>
                          {getTrendIcon(subject.trend)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={subject.score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{subject.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{student.assessments}</p>
                    <p className="text-xs text-gray-600">Assessments</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{student.sessions}</p>
                    <p className="text-xs text-gray-600">Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{student.improvement}%</p>
                    <p className="text-xs text-gray-600">Improvement</p>
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Next Milestone:</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">{student.nextMilestone}</p>
                </div>

                {/* Risk Assessment */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Risk Level:</span>
                    <Badge className={`ml-2 ${getRiskLevel(student.riskFactors).color}`}>
                      {getRiskLevel(student.riskFactors).level}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Class Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Class Progress Overview</span>
            </CardTitle>
            <CardDescription>Average progress by grade level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classProgress.map((classData) => (
                <div key={classData.grade} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">{classData.grade}</span>
                    <span className="text-xs text-gray-500">({classData.totalStudents} students)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24">
                      <Progress value={classData.averageProgress} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{classData.averageProgress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Subject Performance</span>
            </CardTitle>
            <CardDescription>Average scores by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon('up')}
                        <span className="text-xs text-green-600">+{subject.improvement}%</span>
                        <span className="text-xs text-gray-500">({subject.students} students)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24">
                      <Progress value={subject.averageScore} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{subject.averageScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <LineChart className="w-6 h-6" />
              <span className="text-xs">Generate Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="w-6 h-6" />
              <span className="text-xs">Set Goals</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <AlertCircle className="w-6 h-6" />
              <span className="text-xs">Risk Assessment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Award className="w-6 h-6" />
              <span className="text-xs">Achievements</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}