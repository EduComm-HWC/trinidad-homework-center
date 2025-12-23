'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  Users, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Eye,
  Download,
  Filter,
  Star,
  Heart,
  Target,
  Activity,
  FileText,
  LogOut
} from 'lucide-react'

interface Parent {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  relationship: string
  studentIds: string[]
  createdAt: string
}

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  grade: string
  educationLevel: string
  currentSchool: string
  subjects: string[]
  csecSubjects: string[]
  careerGoals: string
  parentName: string
  parentPhone: string
  parentEmail: string
  createdAt: string
}

interface Session {
  id: string
  studentId: string
  date: string
  startTime: string
  endTime: string
  subject: string
  topics: string[]
  status: string
  notes: string
  volunteerName: string
  location: string
}

interface Assessment {
  id: string
  studentId: string
  date: string
  type: string
  subject: string
  score: number
  maxScore: number
  percentage: number
  grade: string
  notes: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  content: string
  timestamp: string
  isRead: boolean
  type: 'parent_to_tutor' | 'tutor_to_parent' | 'parent_to_admin' | 'admin_to_parent'
}

export default function ParentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [parent, setParent] = useState<Parent | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { toast } = useToast()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [newMessage, setNewMessage] = useState('')
  const [messageRecipient, setMessageRecipient] = useState('')

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedParent = localStorage.getItem('parentUser')
    if (savedParent) {
      setParent(JSON.parse(savedParent))
      setIsLoggedIn(true)
      fetchParentData()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchParentData = async () => {
    try {
      // Fetch parent's students
      const studentsResponse = await fetch('/api/students')
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json()
        setStudents(studentsData)
      }

      // Fetch sessions for parent's students
      const sessionsResponse = await fetch('/api/sessions')
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json()
        // For now, just set all sessions
        setSessions(sessionsData)
      }

      // Fetch assessments for parent's students
      const assessmentsResponse = await fetch('/api/assessments')
      if (assessmentsResponse.ok) {
        const assessmentsData = await assessmentsResponse.json()
        // For now, just set all assessments
        setAssessments(assessmentsData)
      }

      // Fetch messages
      const messagesResponse = await fetch('/api/messages')
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json()
        const parentMessages = messagesData.filter((message: Message) => 
          message.receiverId === parent?.id || message.senderId === parent?.id
        )
        setMessages(parentMessages)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch parent data',
        variant: 'destructive',
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Simulate login - in real app, this would authenticate with backend
      const mockParent: Parent = {
        id: 'parent1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: loginForm.email,
        phone: '868-555-1234',
        relationship: 'mother',
        studentIds: ['student1', 'student2'],
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('parentUser', JSON.stringify(mockParent))
      setParent(mockParent)
      setIsLoggedIn(true)
      setShowLoginModal(false)
      fetchParentData()
      
      toast({
        title: 'Login Successful',
        description: 'Welcome to the Parent Portal',
      })
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('parentUser')
    setParent(null)
    setIsLoggedIn(false)
    setStudents([])
    setSessions([])
    setAssessments([])
    setMessages([])
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !messageRecipient) return

    try {
      const message: Message = {
        id: Date.now().toString(),
        senderId: parent?.id || '',
        senderName: parent?.firstName + ' ' + parent?.lastName || '',
        receiverId: messageRecipient,
        receiverName: 'Tutor', // This would be dynamic based on recipient
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false,
        type: 'parent_to_tutor'
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (response.ok) {
        setNewMessage('')
        setMessageRecipient('')
        fetchParentData()
        
        toast({
          title: 'Message Sent',
          description: 'Your message has been sent successfully',
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      })
    }
  }

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A': return 'text-green-600'
      case 'B': return 'text-blue-600'
      case 'C': return 'text-yellow-600'
      case 'D': return 'text-orange-600'
      case 'F': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-100 text-green-800'
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Faith Tabernacle Homework Center
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Parent Portal Login
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Parent Login
              </CardTitle>
              <CardDescription>
                Access your child's academic progress and communicate with tutors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login to Parent Portal
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Parent Portal
            </h1>
            <p className="text-lg text-gray-600">
              Welcome, {parent?.firstName} {parent?.lastName}!
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Children
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No students registered yet
                  </p>
                ) : (
                  students.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">
                          {student.firstName} {student.lastName}
                        </h3>
                        <Badge variant="outline">{student.grade}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Grade:</span> {student.grade}
                        </div>
                        <div>
                          <span className="font-medium">School:</span> {student.currentSchool || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {student.educationLevel}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {student.email}
                        </div>
                      </div>
                      {student.careerGoals && (
                        <div className="mt-3">
                          <span className="font-medium">Career Goals:</span>
                          <p className="text-sm text-gray-600 mt-1">{student.careerGoals}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No upcoming sessions scheduled
                  </p>
                ) : (
                  sessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{session.subject}</h4>
                        <Badge variant="outline">{session.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          {new Date(session.date).toLocaleDateString()} • {session.startTime} - {session.endTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Tutor: {session.volunteerName}
                        </div>
                        {session.location && (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            {session.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No assessments completed yet
                  </p>
                ) : (
                  <div>
                    {assessments.slice(0, 5).map((assessment) => (
                      <div key={assessment.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{assessment.subject}</h4>
                        <Badge className={getGradeColor(assessment.grade)}>
                          {assessment.grade} - {assessment.percentage}%
                        </Badge>
                      </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(assessment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {assessment.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          {assessment.score}/{assessment.maxScore}
                        </div>
                      </div>
                      {assessment.notes && (
                        <div className="mt-2">
                          <span className="font-medium">Notes:</span>
                          <p className="text-sm text-gray-600">{assessment.notes}</p>
                        </div>
                      )}
                    </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Send Message To</Label>
                    <Select value={messageRecipient} onValueChange={setMessageRecipient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutor1">Tutor 1</SelectItem>
                        <SelectItem value="tutor2">Tutor 2</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleSendMessage} className="w-full">
                  Send Message
                </Button>
                  </div>
                </div>

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  <h4 className="font-semibold mb-3">Recent Messages</h4>
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No messages yet
                    </p>
                  ) : (
                    messages.slice(0, 10).map((message) => (
                      <div key={message.id} className={`p-3 border rounded-lg mb-3 ${
                        !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{message.senderName}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          {!message.isRead && (
                            <Badge variant="outline">New</Badge>
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {sessions.length}
                    </div>
                    <p className="text-sm text-gray-600">Total Sessions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {assessments.length}
                    </div>
                    <p className="text-sm text-gray-600">Assessments Completed</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {assessments.reduce((sum, assessment) => sum + assessment.percentage, 0) / assessments.length || 0}%
                    </div>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {students.filter(s => s.educationLevel === 'secondary').length}
                    </div>
                    <p className="text-sm text-gray-600">Secondary Students</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Upcoming Session Reminder</h4>
                      <p className="text-sm text-yellow-700">
                        Math tutoring session for Sarah Johnson scheduled for tomorrow at 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Assessment Completed</h4>
                      <p className="text-sm text-green-700">
                        Sarah Johnson scored 85% on her Mathematics assessment
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Achievement Unlocked</h4>
                      <p className="text-sm text-blue-700">
                        Sarah Johnson has improved her grade from C to B in Mathematics!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}