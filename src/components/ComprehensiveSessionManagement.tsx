'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Clock, Users, BookOpen, MapPin, Plus, Edit, Trash2, Filter, Search, CheckCircle, AlertTriangle, X } from 'lucide-react'

const TRINIDAD_SCHOOLS = [
  'Trinidad Boys\' R.C.',
  'Trinidad Girls\' R.C.',
  'St. Mary\'s R.C.',
  'St. Joseph\'s Convent',
  'Naparima College',
  'Naparima Girls\' College',
  'Queen\'s Royal College',
  'Bishop Anstey High School',
  'Holy Name Convent',
  'St. Augustine Girls\' High School',
  'St. George\'s College',
  'Presentation College',
  'San Juan Secondary',
  'Five Rivers Secondary',
  'Tunapuna Secondary',
  'Arima Secondary',
  'Couva Secondary',
  'Princes Town Secondary'
]

const CSEC_SUBJECTS = [
  'Mathematics',
  'English Language',
  'English Literature',
  'Spanish',
  'French',
  'Physics',
  'Chemistry',
  'Biology',
  'Information Technology',
  'Principles of Accounts',
  'Principles of Business',
  'Economics',
  'Geography',
  'History',
  'Social Studies',
  'Agricultural Science',
  'Technical Drawing',
  'Visual Arts',
  'Music',
  'Physical Education'
]

const SESSION_STATUS = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  no_show: { label: 'No Show', color: 'bg-gray-100 text-gray-800' }
}

interface Session {
  id: string
  studentId: string
  studentName: string
  volunteerId: string
  volunteerName: string
  date: string
  startTime: string
  endTime: string
  subject: string
  topics: string[]
  status: keyof typeof SESSION_STATUS
  notes: string
  location: string
  createdAt: string
}

export default function ComprehensiveSessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    studentId: '',
    volunteerId: '',
    date: '',
    startTime: '',
    endTime: '',
    subject: '',
    topics: '',
    location: '',
    notes: '',
    status: 'scheduled'
  })

  useEffect(() => {
    fetchSessions()
  }, [])

  useEffect(() => {
    filterSessions()
  }, [sessions, searchTerm, statusFilter, subjectFilter])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data)
      } else {
        throw new Error('Failed to fetch sessions')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load sessions',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterSessions = () => {
    let filtered = sessions

    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter)
    }

    if (subjectFilter !== 'all') {
      filtered = filtered.filter(session => session.subject === subjectFilter)
    }

    setFilteredSessions(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingSession ? `/api/sessions/${editingSession.id}` : '/api/sessions'
      const method = editingSession ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          topics: formData.topics.split(',').map(t => t.trim()).filter(t => t),
          date: new Date(formData.date).toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: editingSession ? 'Session updated successfully' : 'Session created successfully',
        })
        
        setFormData({
          studentId: '',
          volunteerId: '',
          date: '',
          startTime: '',
          endTime: '',
          subject: '',
          topics: '',
          location: '',
          notes: '',
          status: 'scheduled'
        })
        setEditingSession(null)
        setShowCreateForm(false)
        fetchSessions()
      } else {
        throw new Error('Failed to save session')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return

    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Session deleted successfully',
        })
        fetchSessions()
      } else {
        throw new Error('Failed to delete session')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (session: Session) => {
    setEditingSession(session)
    setFormData({
      studentId: session.studentId,
      volunteerId: session.volunteerId,
      date: session.date.split('T')[0],
      startTime: session.startTime,
      endTime: session.endTime,
      subject: session.subject,
      topics: session.topics.join(', '),
      location: session.location || '',
      notes: session.notes || '',
      status: session.status
    })
    setShowCreateForm(true)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: string) => {
    return SESSION_STATUS[status as keyof typeof SESSION_STATUS]?.color || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    return SESSION_STATUS[status as keyof typeof SESSION_STATUS]?.label || status
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Session Management
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Schedule and track tutoring sessions
          </p>
        </div>

        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Sessions</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by student, volunteer, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {Object.entries(SESSION_STATUS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {CSEC_SUBJECTS.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Schedule New Session
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{session.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{session.studentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{session.volunteerName}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(session)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(session.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{session.startTime} - {session.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{session.location || 'TBD'}</span>
                  </div>
                  <div>
                    <Badge className={getStatusColor(session.status)}>
                      {getStatusLabel(session.status)}
                    </Badge>
                  </div>
                </div>

                {session.topics.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Topics:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {session.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {session.notes && (
                  <div>
                    <Label className="text-sm font-medium">Notes:</Label>
                    <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    Created: {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {session.status === 'scheduled' && (
                      <Button size="sm" onClick={() => handleStatusUpdate(session.id, 'in_progress')}>
                        Start Session
                      </Button>
                    )}
                    {session.status === 'in_progress' && (
                      <Button size="sm" onClick={() => handleStatusUpdate(session.id, 'completed')}>
                        Complete Session
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingSession ? 'Edit Session' : 'Schedule New Session'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCreateForm(false)
                      setEditingSession(null)
                      setFormData({
                        studentId: '',
                        volunteerId: '',
                        date: '',
                        startTime: '',
                        endTime: '',
                        subject: '',
                        topics: '',
                        location: '',
                        notes: '',
                        status: 'scheduled'
                      })
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student *</Label>
                      <Select value={formData.studentId} onValueChange={(value) => updateFormData('studentId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* This would be populated from actual students API */}
                          <SelectItem value="student1">Student 1</SelectItem>
                          <SelectItem value="student2">Student 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteerId">Volunteer *</Label>
                      <Select value={formData.volunteerId} onValueChange={(value) => updateFormData('volunteerId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volunteer" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* This would be populated from actual volunteers API */}
                          <SelectItem value="volunteer1">Volunteer 1</SelectItem>
                          <SelectItem value="volunteer2">Volunteer 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData('date', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => updateFormData('startTime', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => updateFormData('endTime', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => updateFormData('subject', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {CSEC_SUBJECTS.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        placeholder="Enter location (e.g., Library, Classroom A)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topics">Topics (comma-separated)</Label>
                    <Textarea
                      id="topics"
                      value={formData.topics}
                      onChange={(e) => updateFormData('topics', e.target.value)}
                      placeholder="Enter topics to be covered"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Session Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      placeholder="Enter any additional notes"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSession ? 'Update Session' : 'Schedule Session'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

const handleStatusUpdate = async (sessionId: string, newStatus: string) => {
  try {
    const response = await fetch(`/api/sessions/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (response.ok) {
      // Refresh the sessions list
      window.location.reload()
    }
  } catch (error) {
    console.error('Failed to update session status:', error)
  }
}