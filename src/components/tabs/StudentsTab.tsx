'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  BookOpen,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  GraduationCap,
  Target,
  Activity
} from 'lucide-react'

export default function StudentsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample student data
  const students = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      grade: 'Standard 5',
      school: 'St. Joseph\'s Convent POS',
      parish: 'Port of Spain',
      subjects: ['Mathematics', 'English', 'Science'],
      progress: 92,
      attendance: 95,
      lastSession: '2024-01-15',
      status: 'active',
      avatar: '/avatars/sarah.jpg',
      parentName: 'Mary Johnson',
      parentPhone: '1-868-123-4567',
      parentEmail: 'mary.johnson@email.com',
      careerGoals: 'Doctor',
      strengths: 'Mathematics, Science',
      weaknesses: 'Creative Writing',
      nextAssessment: '2024-01-20',
      totalSessions: 45,
      averageScore: 88
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Brown',
      grade: 'Form 4',
      school: 'Queen\'s Royal College',
      parish: 'Port of Spain',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      progress: 78,
      attendance: 82,
      lastSession: '2024-01-14',
      status: 'active',
      avatar: '/avatars/michael.jpg',
      parentName: 'Robert Brown',
      parentPhone: '1-868-234-5678',
      parentEmail: 'robert.brown@email.com',
      careerGoals: 'Engineer',
      strengths: 'Physics, Problem Solving',
      weaknesses: 'Essay Writing',
      nextAssessment: '2024-01-22',
      totalSessions: 38,
      averageScore: 75
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Davis',
      grade: 'Standard 3',
      school: 'Holy Name Convent',
      parish: 'Port of Spain',
      subjects: ['English', 'Social Studies', 'Science'],
      progress: 85,
      attendance: 90,
      lastSession: '2024-01-16',
      status: 'active',
      avatar: '/avatars/emily.jpg',
      parentName: 'Jennifer Davis',
      parentPhone: '1-868-345-6789',
      parentEmail: 'jennifer.davis@email.com',
      careerGoals: 'Teacher',
      strengths: 'Reading, Creative Writing',
      weaknesses: 'Mathematics',
      nextAssessment: '2024-01-18',
      totalSessions: 28,
      averageScore: 82
    },
    {
      id: 4,
      firstName: 'James',
      lastName: 'Wilson',
      grade: 'Form 2',
      school: 'Fatima College',
      parish: 'Port of Spain',
      subjects: ['Mathematics', 'Information Technology', 'Business'],
      progress: 70,
      attendance: 75,
      lastSession: '2024-01-13',
      status: 'active',
      avatar: '/avatars/james.jpg',
      parentName: 'David Wilson',
      parentPhone: '1-868-456-7890',
      parentEmail: 'david.wilson@email.com',
      careerGoals: 'Software Developer',
      strengths: 'IT, Mathematics',
      weaknesses: 'Literature',
      nextAssessment: '2024-01-25',
      totalSessions: 22,
      averageScore: 68
    },
    {
      id: 5,
      firstName: 'Sophia',
      lastName: 'Taylor',
      grade: 'Standard 4',
      school: 'St. Augustine Girls\' High School',
      parish: 'St. Augustine',
      subjects: ['English', 'Social Studies', 'Creative Writing'],
      progress: 88,
      attendance: 92,
      lastSession: '2024-01-16',
      status: 'active',
      avatar: '/avatars/sophia.jpg',
      parentName: 'Lisa Taylor',
      parentPhone: '1-868-567-8901',
      parentEmail: 'lisa.taylor@email.com',
      careerGoals: 'Lawyer',
      strengths: 'English, Debate',
      weaknesses: 'Mathematics',
      nextAssessment: '2024-01-19',
      totalSessions: 35,
      averageScore: 85
    }
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.school.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    
    return matchesSearch && matchesGrade && matchesStatus
  })

  const getGradeColor = (grade) => {
    if (grade.includes('Standard')) return 'bg-blue-100 text-blue-800'
    if (grade.includes('Form')) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 80) return 'bg-blue-500'
    if (progress >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage and track student progress</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Users className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-gray-600">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primary Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.grade.includes('Standard')).length}
            </div>
            <p className="text-xs text-gray-600">Standards 1-5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secondary Students</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.grade.includes('Form')).length}
            </div>
            <p className="text-xs text-gray-600">Forms 1-6</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
            </div>
            <p className="text-xs text-gray-600">Across all students</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Standard 1">Standard 1</SelectItem>
                <SelectItem value="Standard 2">Standard 2</SelectItem>
                <SelectItem value="Standard 3">Standard 3</SelectItem>
                <SelectItem value="Standard 4">Standard 4</SelectItem>
                <SelectItem value="Standard 5">Standard 5</SelectItem>
                <SelectItem value="Form 1">Form 1</SelectItem>
                <SelectItem value="Form 2">Form 2</SelectItem>
                <SelectItem value="Form 3">Form 3</SelectItem>
                <SelectItem value="Form 4">Form 4</SelectItem>
                <SelectItem value="Form 5">Form 5</SelectItem>
                <SelectItem value="Form 6">Form 6</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar} alt={student.firstName} />
                    <AvatarFallback>
                      {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {student.firstName} {student.lastName}
                    </h3>
                    <Badge className={getGradeColor(student.grade)}>
                      {student.grade}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {student.school}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {student.parish}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  {student.careerGoals}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-600">{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-1">
                {student.subjects.slice(0, 3).map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
                {student.subjects.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{student.subjects.length - 3}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-gray-600">{student.totalSessions} sessions</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-gray-600">{student.averageScore}% avg</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Student View Modal would go here */}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Download className="w-6 h-6" />
              <span className="text-xs">Export Students</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Schedule Assessments</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Activity className="w-6 h-6" />
              <span className="text-xs">Generate Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Mail className="w-6 h-6" />
              <span className="text-xs">Send Notifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}