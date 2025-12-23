'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  X
} from 'lucide-react'

interface Volunteer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  expertise: string[]
  availability: string
  backgroundCheck: string
  joinDate: string
  status: string
}

export default function VolunteersTab() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    expertise: [] as string[],
    availability: '',
    backgroundCheck: 'pending'
  })

  const expertiseAreas = [
    'Mathematics', 'English Language', 'English Literature', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Social Studies', 'Spanish', 'French',
    'Information Technology', 'Economics', 'Principles of Accounts', 'Principles of Business',
    'Visual Arts', 'Music', 'Physical Education', 'Technical Drawing', 'Home Economics'
  ]

  const availabilityOptions = [
    'Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings',
    'Saturday Mornings', 'Saturday Afternoons', 'Sunday Mornings', 'Sunday Afternoons',
    'Flexible', 'Weekends Only', 'Weekdays Only'
  ]

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('/api/volunteers')
      if (response.ok) {
        const data = await response.json()
        setVolunteers(data)
      } else {
        throw new Error('Failed to fetch volunteers')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch volunteers',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingVolunteer 
        ? `/api/volunteers/${editingVolunteer.id}`
        : '/api/volunteers'

      const response = await fetch(url, {
        method: editingVolunteer ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Volunteer ${editingVolunteer ? 'updated' : 'registered'} successfully`,
        })
        setShowForm(false)
        setEditingVolunteer(null)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          expertise: [] as string[],
          availability: '',
          backgroundCheck: 'pending'
        })
        fetchVolunteers()
      } else {
        throw new Error(`Failed to ${editingVolunteer ? 'update' : 'register'} volunteer`)
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

  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer)
    setFormData({
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      phone: volunteer.phone,
      address: volunteer.address,
      expertise: volunteer.expertise,
      availability: volunteer.availability,
      backgroundCheck: volunteer.backgroundCheck
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this volunteer?')) return

    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Volunteer deleted successfully',
        })
        fetchVolunteers()
      } else {
        throw new Error('Failed to delete volunteer')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      })
    }
  }

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesExpertise = !selectedExpertise || volunteer.expertise.includes(selectedExpertise)

    return matchesSearch && matchesExpertise
  })

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBackgroundCheckColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Volunteers</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Expertise</SelectItem>
              {expertiseAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Volunteer
          </Button>
        </div>
      </div>

      {/* Volunteer Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingVolunteer ? 'Edit Volunteer' : 'Register New Volunteer'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowForm(false)
                setEditingVolunteer(null)
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  address: '',
                  expertise: [] as string[],
                  availability: '',
                  backgroundCheck: 'pending'
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
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Expertise Areas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {expertiseAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.expertise.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({ ...prev, expertise: [...prev.expertise, area] }))
                          } else {
                            setFormData(prev => ({ ...prev, expertise: prev.expertise.filter(a => a !== area) }))
                          }
                        }}
                      />
                      <Label htmlFor={area} className="text-sm font-normal">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundCheck">Background Check Status</Label>
                <Select value={formData.backgroundCheck} onValueChange={(value) => setFormData(prev => ({ ...prev, backgroundCheck: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                      {editingVolunteer ? 'Updating...' : 'Registering...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {editingVolunteer ? 'Update Volunteer' : 'Register Volunteer'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVolunteers.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Volunteers Found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedExpertise 
                    ? 'Try adjusting your filters' 
                    : 'Start by registering your first volunteer'}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {volunteer.firstName} {volunteer.lastName}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getStatusColor(volunteer.status)}>
                        {volunteer.status}
                      </Badge>
                      <Badge className={getBackgroundCheckColor(volunteer.backgroundCheck)}>
                        BG Check: {volunteer.backgroundCheck}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="h-4 w-4" />
                      {volunteer.email}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4" />
                      {volunteer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined: {new Date(volunteer.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div className="mb-2">
                    <span className="font-medium">Address:</span>
                    <p>{volunteer.address}</p>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Availability:</span>
                    <p>{volunteer.availability}</p>
                  </div>
                </div>

                {volunteer.expertise && volunteer.expertise.length > 0 && (
                  <div className="mb-4">
                    <span className="font-medium">Expertise:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {volunteer.expertise.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}