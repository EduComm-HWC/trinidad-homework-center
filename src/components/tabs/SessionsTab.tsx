'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer,
  BookOpen,
  User,
  VideoIcon,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Target,
  Award
} from 'lucide-react'

export default function SessionsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Sample session data
  const sessions = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      studentGrade: 'Standard 5',
      volunteerName: 'Dr. Mary Thompson',
      subject: 'Mathematics',
      topic: 'Advanced Algebra',
      date: '2024-01-16',
      time: '3:00 PM',
      duration: 60,
      status: 'scheduled',
      location: 'Virtual',
      meetingUrl: 'https://meet.jit.si/faith-tabernacle-math-session-1',
      notes: 'Focus on quadratic equations and word problems',
      homework: 'Complete exercises 1-15 on page 245',
      nextSession: '2024-01-18',
      studentAvatar: '/avatars/sarah.jpg',
      volunteerAvatar: '/avatars/mary.jpg',
      materialLinks: ['https://example.com/math-notes.pdf', 'https://example.com/practice-problems.pdf'],
      assessmentCompleted: false,
      rating: null
    },
    {
      id: 2,
      studentName: 'Michael Brown',
      studentGrade: 'Form 4',
      volunteerName: 'Mr. James Wilson',
      subject: 'English Language',
      topic: 'Essay Writing',
      date: '2024-01-16',
      time: '4:00 PM',
      duration: 45,
      status: 'completed',
      location: 'In-Person',
      meetingUrl: null,
      notes: 'Student showed significant improvement in thesis statements',
      homework: 'Write a 500-word essay on climate change',
      nextSession: '2024-01-20',
      studentAvatar: '/avatars/michael.jpg',
      volunteerAvatar: '/avatars/james.jpg',
      materialLinks: ['https://example.com/essay-guide.pdf'],
      assessmentCompleted: true,
      rating: 4.5
    },
    {
      id: 3,
      studentName: 'Emily Davis',
      studentGrade: 'Standard 3',
      volunteerName: 'Ms. Sarah Johnson',
      subject: 'Science',
      topic: 'Ecosystems and Food Chains',
      date: '2024-01-17',
      time: '2:00 PM',
      duration: 50,
      status: 'scheduled',
      location: 'Virtual',
      meetingUrl: 'https://meet.jit.si/faith-tabernacle-science-session-3',
      notes: 'Introduction to Caribbean ecosystems',
      homework: 'Draw a food web for a local ecosystem',
      nextSession: '2024-01-19',
      studentAvatar: '/avatars/emily.jpg',
      volunteerAvatar: '/avatars/sarah.jpg',
      materialLinks: ['https://example.com/ecosystem-notes.pdf'],
      assessmentCompleted: false,
      rating: null
    },
    {
      id: 4,
      studentName: 'James Wilson',
      studentGrade: 'Form 2',
      volunteerName: 'Ms. Lisa Davis',
      subject: 'Information Technology',
      topic: 'Introduction to Programming',
      date: '2024-01-15',
      time: '3:30 PM',
      duration: 60,
      status: 'completed',
      location: 'Virtual',
      meetingUrl: 'https://meet.jit.si/faith-tabernacle-it-session-2',
      notes: 'Student grasped basic programming concepts quickly',
      homework: 'Complete coding exercises 1-10',
      nextSession: '2024-01-22',
      studentAvatar: '/avatars/james.jpg',
      volunteerAvatar: '/avatars/lisa.jpg',
      materialLinks: ['https://example.com/python-basics.pdf'],
      assessmentCompleted: true,
      rating: 4.8
    },
    {
      id: 5,
      studentName: 'Sophia Taylor',
      studentGrade: 'Standard 4',
      volunteerName: 'Mr. Robert Brown',
      subject: 'Social Studies',
      topic: 'Caribbean History',
      date: '2024-01-14',
      time: '2:30 PM',
      duration: 45,
      status: 'cancelled',
      location: 'In-Person',
      meetingUrl: null,
      notes: 'Volunteer unavailable due to emergency',
      homework: 'Read chapters 5-7',
      nextSession: '2024-01-21',
      studentAvatar: '/avatars/sophia.jpg',
      volunteerAvatar: '/avatars/robert.jpg',
      materialLinks: ['https://example.com/caribbean-history.pdf'],
      assessmentCompleted: false,
      rating: null
    }
  ]

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && session.date === new Date().toISOString().split('T')[0]) ||
                       (filterDate === 'week' && new Date(session.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (filterDate === 'month' && new Date(session.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Calendar className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'in-progress': return <Timer className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const startVideoSession = (sessionId) => {
    setShowVideoModal(true)
    // In a real app, this would open the video conference
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Management</h2>
          <p className="text-gray-600">Schedule and track tutoring sessions</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.filter(s => s.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <p className="text-xs text-gray-600">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.filter(s => new Date(s.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <p className="text-xs text-gray-600">Sessions this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((sessions.filter(s => s.status === 'completed').length / sessions.length) * 100)}%
            </div>
            <p className="text-xs text-gray-600">Sessions completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Virtual Sessions</CardTitle>
            <Video className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.filter(s => s.location === 'Virtual').length}
            </div>
            <p className="text-xs text-gray-600">Online tutoring</p>
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
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.studentAvatar} alt={session.studentName} />
                      <AvatarFallback>
                        {session.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.studentName}</h3>
                      <p className="text-sm text-gray-600">{session.studentGrade}</p>
                    </div>
                  </div>
                  
                  <div className="h-8 w-px bg-gray-200" />
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.volunteerAvatar} alt={session.volunteerName} />
                      <AvatarFallback>
                        {session.volunteerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{session.volunteerName}</p>
                      <p className="text-sm text-gray-600">Volunteer</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(session.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(session.status)}
                        <span>{session.status.charAt(0).toUpperCase() + session.status.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.subject}</p>
                    <p className="text-xs text-gray-600">{session.topic}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.date}</p>
                    <p className="text-xs text-gray-600">{session.time} ({session.duration} min)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.location}</p>
                    {session.meetingUrl && (
                      <p className="text-xs text-blue-600">Virtual meeting</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {session.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{session.rating}</span>
                    </div>
                  )}
                  {session.nextSession && (
                    <div>
                      <p className="text-xs text-gray-600">Next: {session.nextSession}</p>
                    </div>
                  )}
                </div>
              </div>

              {session.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {session.notes}
                  </p>
                </div>
              )}

              {session.homework && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Homework:</strong> {session.homework}
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {session.status === 'scheduled' && session.location === 'Virtual' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Video className="w-4 h-4 mr-1" />
                      Start Session
                    </Button>
                  )}
                </div>
                
                {session.materialLinks && session.materialLinks.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {session.materialLinks.length} material(s)
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Bulk Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Video className="w-6 h-6" />
              <span className="text-xs">Start Video Room</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Award className="w-6 h-6" />
              <span className="text-xs">Session Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span className="text-xs">Parent Notifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Conference Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Video Conference</CardTitle>
              <CardDescription>Join the virtual tutoring session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <Video className="w-16 h-16 text-gray-400" />
                </div>
                <div className="flex space-x-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Video className="w-4 h-4 mr-2" />
                    Join Session
                  </Button>
                  <Button variant="outline" onClick={() => setShowVideoModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}