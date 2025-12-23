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
  Trash2,
  Edit,
  Eye,
  Download,
  Mail,
  Phone,
  BookOpen,
  Target,
  Calendar
} from 'lucide-react'

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

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const grades = ['Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5', 'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6']
  const educationLevels = ['Primary', 'Secondary']
  
  const csecSubjects = [
    'Mathematics', 'English Language', 'English Literature', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Social Studies', 'Spanish', 'French',
    'Information Technology', 'Economics', 'Principles of Accounts', 'Principles of Business',
    'Visual Arts', 'Music', 'Physical Education', 'Technical Drawing', 'Home Economics'
  ]

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        throw new Error('Failed to fetch students')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch students',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Student deleted successfully',
        })
        fetchStudents()
      } else {
        throw new Error('Failed to delete student')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      })
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGrade = !selectedGrade || student.grade === selectedGrade
    const matchesLevel = !selectedLevel || student.educationLevel === selectedLevel

    return matchesSearch && matchesGrade && matchesLevel
  })

  const getGradeColor = (grade: string): string => {
    if (grade.includes('Standard')) return 'bg-blue-100 text-blue-800'
    if (grade.includes('Form')) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getLevelColor = (level: string): string => {
    if (level === 'Primary') return 'bg-purple-100 text-purple-800'
    if (level === 'Secondary') return 'bg-orange-100 text-orange-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedGrade || selectedLevel 
                    ? 'Try adjusting your filters' 
                    : 'Start by registering your first student'}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getGradeColor(student.grade)}>
                      {student.grade}
                    </Badge>
                    <Badge className={getLevelColor(student.educationLevel)}>
                      {student.educationLevel}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">School:</span>
                    <p className="text-gray-600">{student.currentSchool || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Parent:</span>
                    <p className="text-gray-600">{student.parentName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>
                    <p className="text-gray-600">{student.parentPhone}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-600">{student.parentEmail}</p>
                  </div>
                </div>

                {student.careerGoals && (
                  <div className="mt-4">
                    <span className="font-medium">Career Goals:</span>
                    <p className="text-sm text-gray-600 mt-1">{student.careerGoals}</p>
                  </div>
                )}

                {student.csecSubjects && student.csecSubjects.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium">CSEC Subjects:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {student.csecSubjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
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