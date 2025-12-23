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
  Calendar,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  UserX,
  TrendingUp,
  Target
} from 'lucide-react'

export default function VolunteersTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterExpertise, setFilterExpertise] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample volunteer data
  const volunteers = [
    {
      id: 1,
      firstName: 'Dr. Mary',
      lastName: 'Thompson',
      email: 'mary.thompson@email.com',
      phone: '1-868-123-4567',
      expertise: ['Mathematics', 'Physics', 'Chemistry'],
      experience: '15 years',
      qualifications: ['PhD in Mathematics', 'MSc in Physics'],
      availability: ['Monday', 'Wednesday', 'Friday'],
      backgroundCheck: true,
      rating: 4.8,
      totalSessions: 156,
      joinedAt: '2022-01-15',
      status: 'active',
      bio: 'Passionate educator with extensive experience in STEM subjects',
      specialties: 'Advanced Calculus, Quantum Physics',
      preferredGrades: ['Form 4', 'Form 5', 'Form 6'],
      languages: ['English', 'French'],
      location: 'Port of Spain'
    },
    {
      id: 2,
      firstName: 'Mr. James',
      lastName: 'Wilson',
      email: 'james.wilson@email.com',
      phone: '1-868-234-5678',
      expertise: ['English Language', 'Literature', 'Creative Writing'],
      experience: '10 years',
      qualifications: ['BA English Literature', 'Diploma in Education'],
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      backgroundCheck: true,
      rating: 4.6,
      totalSessions: 98,
      joinedAt: '2022-06-20',
      status: 'active',
      bio: 'Dedicated to helping students develop strong communication skills',
      specialties: 'Essay Writing, Poetry Analysis',
      preferredGrades: ['Standard 3', 'Standard 4', 'Standard 5'],
      languages: ['English', 'Spanish'],
      location: 'San Fernando'
    },
    {
      id: 3,
      firstName: 'Ms. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '1-868-345-6789',
      expertise: ['Science', 'Biology', 'Environmental Studies'],
      experience: '8 years',
      qualifications: ['BSc Biology', 'MSc Environmental Science'],
      availability: ['Monday', 'Wednesday', 'Thursday'],
      backgroundCheck: true,
      rating: 4.9,
      totalSessions: 124,
      joinedAt: '2023-02-10',
      status: 'active',
      bio: 'Making science engaging and accessible for all students',
      specialties: 'Marine Biology, Ecology',
      preferredGrades: ['Standard 4', 'Standard 5', 'Form 1', 'Form 2'],
      languages: ['English'],
      location: 'Arima'
    },
    {
      id: 4,
      firstName: 'Mr. Robert',
      lastName: 'Brown',
      email: 'robert.brown@email.com',
      phone: '1-868-456-7890',
      expertise: ['History', 'Social Studies', 'Geography'],
      experience: '12 years',
      qualifications: ['MA History', 'PGCE'],
      availability: ['Tuesday', 'Friday', 'Saturday'],
      backgroundCheck: true,
      rating: 4.5,
      totalSessions: 87,
      joinedAt: '2023-08-15',
      status: 'active',
      bio: 'Bringing history to life through storytelling and context',
      specialties: 'Caribbean History, World Geography',
      preferredGrades: ['Standard 3', 'Standard 4', 'Standard 5'],
      languages: ['English', 'French'],
      location: 'Couva'
    },
    {
      id: 5,
      firstName: 'Ms. Lisa',
      lastName: 'Davis',
      email: 'lisa.davis@email.com',
      phone: '1-868-567-8901',
      expertise: ['Information Technology', 'Computer Science', 'Digital Literacy'],
      experience: '6 years',
      qualifications: ['BSc Computer Science', 'Certified IT Professional'],
      availability: ['Wednesday', 'Thursday', 'Friday'],
      backgroundCheck: true,
      rating: 4.7,
      totalSessions: 76,
      joinedAt: '2023-11-20',
      status: 'active',
      bio: 'Preparing students for the digital future',
      specialties: 'Programming, Web Development',
      preferredGrades: ['Form 3', 'Form 4', 'Form 5', 'Form 6'],
      languages: ['English'],
      location: 'Tunapuna'
    }
  ]

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          volunteer.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesExpertise = filterExpertise === 'all' || volunteer.expertise.includes(filterExpertise)
    const matchesStatus = filterStatus === 'all' || volunteer.status === filterStatus
    
    return matchesSearch && matchesExpertise && matchesStatus
  })

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />)
    }
    
    return stars
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
          <p className="text-gray-600">Manage and coordinate volunteer tutors</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Users className="w-4 h-4 mr-2" />
          Add New Volunteer
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-gray-600">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteers.filter(v => v.status === 'active').length}
            </div>
            <p className="text-xs text-gray-600">Available for tutoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(volunteers.reduce((acc, v) => acc + v.rating, 0) / volunteers.length).toFixed(1)}
            </div>
            <p className="text-xs text-gray-600">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteers.reduce((acc, v) => acc + v.totalSessions, 0)}
            </div>
            <p className="text-xs text-gray-600">All time</p>
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
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterExpertise} onValueChange={setFilterExpertise}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English Language">English Language</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
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
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVolunteers.map((volunteer) => (
          <Card key={volunteer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {volunteer.firstName} {volunteer.lastName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(volunteer.status)}>
                        {volunteer.status}
                      </Badge>
                      {volunteer.backgroundCheck && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
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
                  <Mail className="w-4 h-4 mr-2" />
                  {volunteer.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {volunteer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {volunteer.location}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {getRatingStars(volunteer.rating)}
                  <span className="text-sm text-gray-600 ml-1">({volunteer.rating})</span>
                </div>
                <p className="text-xs text-gray-500">{volunteer.totalSessions} sessions completed</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Expertise</p>
                <div className="flex flex-wrap gap-1">
                  {volunteer.expertise.slice(0, 3).map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {volunteer.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{volunteer.expertise.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Availability</p>
                <div className="flex flex-wrap gap-1">
                  {volunteer.availability.map((day) => (
                    <Badge key={day} variant="outline" className="text-xs">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Experience:</strong> {volunteer.experience}</p>
                <p><strong>Joined:</strong> {new Date(volunteer.joinedAt).toLocaleDateString()}</p>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
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
              <UserCheck className="w-6 h-6" />
              <span className="text-xs">Background Checks</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Schedule Training</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Award className="w-6 h-6" />
              <span className="text-xs">Recognition</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs">Performance Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}