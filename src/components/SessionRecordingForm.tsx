'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  Calendar,
  Clock,
  Users,
  BookOpen,
  Plus,
  Trash2,
  Save,
  X
} from 'lucide-react'

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

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  grade: string
  educationLevel: string
  subjects: string[]
  csecSubjects: string[]
  careerGoals: string
  parentName: string
  parentPhone: string
  parentEmail: string
  createdAt: string
}

export default function SessionRecordingForm() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    startTime: '',
    endTime: '',
    subject: '',
    topics: '',
    status: 'scheduled',
    notes: '',
    volunteerName: '',
    location: ''
  })

  const subjects = [
    'Mathematics', 'English Language', 'English Literature', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Social Studies', 'Spanish', 'French',
    'Information Technology', 'Economics', 'Principles of Accounts', 'Principles of Business'
  ]

  const sessionStatuses = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'no-show', label: 'No Show' }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [sessionsResponse, studentsResponse] = await Promise.all([
        fetch('/api/sessions'),
        fetch('/api/students')
      ])

      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json()
        setSessions(sessionsData)
      }

      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json()
        setStudents(studentsData)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingSession 
        ? `/api/sessions/${editingSession.id}`
        : '/api/sessions'

      const response = await fetch(url, {
        method: editingSession ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Session ${editingSession ? 'updated' : 'created'} successfully`,
        })
        setShowForm(false)
        setEditingSession(null)
        setFormData({
          studentId: '',
          date: '',
          startTime: '',
          endTime: '',
          subject: '',
          topics: '',
          status: 'scheduled',
          notes: '',
          volunteerName: '',
          location: ''
        })
        fetchData()
      } else {
        throw new Error(`Failed to ${editingSession ? 'update' : 'create'} session`)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (session: Session) => {
    setEditingSession(session)
    setFormData({
      studentId: session.studentId,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      subject: session.subject,
      topics: session.topics.join(', '),
      status: session.status,
      notes: session.notes,
      volunteerName: session.volunteerName,
      location: session.location || ''
    })
    setShowForm(true)
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
        fetchData()
      } else {
        throw new Error('Failed to delete session')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'no-show': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Session Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>

      {/* Session Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSession ? 'Edit Session' : 'Create New Session'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowForm(false)
                setEditingSession(null)
                setFormData({
                  studentId: '',
                  date: '',
                  startTime: '',
                  endTime: '',
                  subject: '',
                  topics: '',
                  status: 'scheduled',
                  notes: '',
                  volunteerName: '',
                  location: ''
                })
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student *</Label>
                  <Select value={formData.studentId} onValueChange={(value) => setFormData(prev => ({ ...prev, studentId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location (optional)"
                />
              </div>
            </div>

              <div className="space-y-2">
                <Label htmlFor="volunteerName">Volunteer Name</Label>
                <Input
                  id="volunteerName"
                  value={formData.volunteerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, volunteerName: e.target.value }))}
                  placeholder="Enter volunteer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topics">Topics</Label>
                <Textarea
                  id="topics"
                  value={formData.topics}
                  onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
                  placeholder="Enter topics covered (comma separated)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter session notes"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingSession ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {editingSession ? 'Update Session' : 'Create Session'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sessions Yet</h3>
              <p className="text-gray-600">
                Start by creating your first tutoring session.
              </p>
            </CardContent>
          </Card>
        ) : (
          sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{session.subject}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString()} • {session.startTime} - {session.endTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(session)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {session.volunteerName && (
                  <div className="mb-4">
                    <span className="text-sm font-medium">Volunteer: </span>
                    <span className="text-sm text-gray-600">{session.volunteerName}</span>
                  </div>
                )}

                {session.location && (
                  <div className="mb-4">
                    <span className="text-sm font-medium">Location: </span>
                    <span className="text-sm text-gray-600">{session.location}</span>
                  </div>
                )}

                {session.topics && (
                  <div className="mb-4">
                    <span className="text-sm font-medium">Topics: </span>
                    <span className="text-sm text-gray-600">{session.topics}</span>
                  </div>
                )}

                {session.notes && (
                  <div>
                    <span className="text-sm font-medium">Notes: </span>
                    <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}