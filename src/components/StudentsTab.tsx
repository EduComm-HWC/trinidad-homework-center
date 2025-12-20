'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Users, Mail, Phone, School, Trash2 } from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastName: string
  age: number
  educationLevel: string
  school: string
  grade: string
  csecSubjects: string[]
  careerGoals: string | null
  parentName: string
  parentPhone: string
  parentEmail: string
  createdAt: string
}

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      if (!response.ok) throw new Error('Failed to fetch students')
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load students',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete student')

      toast({
        title: 'Success',
        description: 'Student deleted successfully',
      })

      fetchStudents()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete student',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading students...</p>
        </CardContent>
      </Card>
    )
  }

  if (students.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>No students registered yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Start by registering your first student using the Registration tab
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            {students.length} student{students.length !== 1 ? 's' : ''} registered
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card key={student.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {student.firstName} {student.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Age {student.age} • {student.grade}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(student.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 mt-2">
                <Badge variant={student.educationLevel === 'primary' ? 'secondary' : 'default'}>
                  {student.educationLevel === 'primary' ? 'Primary' : 'Secondary'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <School className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.school}</span>
              </div>

              {student.csecSubjects && student.csecSubjects.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">CSEC Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.csecSubjects.slice(0, 3).map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {student.csecSubjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{student.csecSubjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {student.careerGoals && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Career Goals:</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {student.careerGoals}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Parent/Guardian:</p>
                <p className="text-sm font-medium">{student.parentName}</p>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{student.parentPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{student.parentEmail}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
