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
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  BookOpen, 
  Target, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Star,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Download,
  Filter,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const ASSESSMENT_CATEGORIES = {
  behavioral: {
    title: 'Behavioral Assessment',
    icon: Users,
    criteria: [
      { name: 'Attention Span', weight: 10 },
      { name: 'Participation Level', weight: 10 },
      { name: 'Peer Interaction', weight: 8 },
      { name: 'Rules Following', weight: 8 },
      { name: 'Self Control', weight: 8 },
      { name: 'Time Management', weight: 6 }
    ]
  },
  educational: {
    title: 'Educational Assessment',
    icon: BookOpen,
    criteria: [
      { name: 'Reading Level', weight: 10 },
      { name: 'Writing Skills', weight: 10 },
      { name: 'Math Skills', weight: 10 },
      { name: 'Science Interest', weight: 8 },
      { name: 'English Proficiency', weight: 8 },
      { name: 'Study Habits', weight: 6 },
      { name: 'Homework Completion', weight: 6 }
    ]
  },
  social: {
    title: 'Social Assessment',
    icon: Users,
    criteria: [
      { name: 'Teamwork Skills', weight: 10 },
      { name: 'Communication Skills', weight: 10 },
      { name: 'Leadership Potential', weight: 8 },
      { name: 'Conflict Resolution', weight: 8 },
      { name: 'Friendships', weight: 6 },
      { name: 'Social Confidence', weight: 6 }
    ]
  },
  family: {
    title: 'Family & Home Life',
    icon: Users,
    criteria: [
      { name: 'Breakfast Frequency', weight: 8 },
      { name: 'Homework Support', weight: 10 },
      { name: 'Study Environment', weight: 10 },
      { name: 'Family Structure', weight: 8 },
      { name: 'Parental Involvement', weight: 8 }
    ]
  },
  health: {
    title: 'Health & Wellness',
    icon: Users,
    criteria: [
      { name: 'Sleep Quality', weight: 8 },
      { name: 'Energy Levels', weight: 8 },
      { name: 'Vision/Hearing', weight: 6 },
      { name: 'Physical Activity', weight: 6 }
    ]
  }
}

interface Assessment {
  id: string
  studentId: string
  studentName: string
  date: string
  type: 'quiz' | 'test' | 'exam' | 'mock_exam' | 'csec_practice'
  subject: string
  scores: {
    behavioral: number
    educational: number
    social: number
    family: number
    health: number
    overall: number
  }
  maxScores: {
    behavioral: number
    educational: number
    social: number
    family: number
    health: number
    overall: number
  }
  grades: {
    behavioral: string
    educational: string
    social: string
    family: string
    health: string
    overall: string
  }
  notes: string
  createdAt: string
}

interface NewAssessment {
  studentId: string
  type: 'quiz' | 'test' | 'exam' | 'mock_exam' | 'csec_practice'
  subject: string
  date: string
}

export default function ComprehensiveAssessmentDashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null)
  const [newAssessment, setNewAssessment] = useState<NewAssessment>({
    studentId: '',
    type: 'quiz',
    subject: '',
    date: ''
  })
  const [assessmentScores, setAssessmentScores] = useState<any>({})
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const { toast } = useToast()

  useEffect(() => {
    fetchAssessments()
    fetchStudents()
  }, [])

  const fetchAssessments = async () => {
    try {
      const response = await fetch('/api/assessments')
      if (response.ok) {
        const data = await response.json()
        setAssessments(data)
      } else {
        throw new Error('Failed to fetch assessments')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load assessments',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  const calculateGrade = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  const getScoreColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingAssessment ? `/api/assessments/${editingAssessment.id}` : '/api/assessments'
      const method = editingAssessment ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newAssessment,
          ...assessmentScores,
          grades: {
            behavioral: calculateGrade(assessmentScores.behavioral, getMaxScore('behavioral')),
            educational: calculateGrade(assessmentScores.educational, getMaxScore('educational')),
            social: calculateGrade(assessmentScores.social, getMaxScore('social')),
            family: calculateGrade(assessmentScores.family, getMaxScore('family')),
            health: calculateGrade(assessmentScores.health, getMaxScore('health')),
            overall: calculateGrade(assessmentScores.overall, getMaxScore('overall'))
          },
          maxScores: {
            behavioral: getMaxScore('behavioral'),
            educational: getMaxScore('educational'),
            social: getMaxScore('social'),
            family: getMaxScore('family'),
            health: getMaxScore('health'),
            overall: getMaxScore('overall')
          }
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: editingAssessment ? 'Assessment updated successfully' : 'Assessment created successfully',
        })
        
        setShowCreateForm(false)
        setEditingAssessment(null)
        setNewAssessment({
          studentId: '',
          type: 'quiz',
          subject: '',
          date: ''
        })
        setAssessmentScores({})
        fetchAssessments()
      } else {
        throw new Error('Failed to save assessment')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const getMaxScore = (category: string): number => {
    const categoryData = ASSESSMENT_CATEGORIES[category as keyof typeof ASSESSMENT_CATEGORIES]
    if (!categoryData) return 100
    return categoryData.criteria.reduce((total, criterion) => total + criterion.weight, 0)
  }

  const handleEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment)
    setNewAssessment({
      studentId: assessment.studentId,
      type: assessment.type,
      subject: assessment.subject,
      date: assessment.date.split('T')[0]
    })
    setAssessmentScores(assessment.scores)
    setShowCreateForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assessment?')) return

    try {
      const response = await fetch(`/api/assessments/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Assessment deleted successfully',
        })
        fetchAssessments()
      } else {
        throw new Error('Failed to delete assessment')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const getOverallStats = () => {
    if (assessments.length === 0) return { avgScore: 0, totalAssessments: 0 }
    
    const totalScore = assessments.reduce((sum, assessment) => sum + assessment.scores.overall, 0)
    const avgScore = totalScore / assessments.length
    
    return {
      avgScore: Math.round(avgScore),
      totalAssessments: assessments.length
    }
  }

  const getSubjectStats = () => {
    const subjectCounts: { [key: string]: number } = {}
    assessments.forEach(assessment => {
      subjectCounts[assessment.subject] = (subjectCounts[assessment.subject] || 0) + 1
    })
    return subjectCounts
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const overallStats = getOverallStats()
  const subjectStats = getSubjectStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Track student progress with detailed assessments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Total Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {overallStats.totalAssessments}
              </div>
              <p className="text-sm text-gray-600">
                Assessments conducted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {overallStats.avgScore}%
              </div>
              <p className="text-sm text-gray-600">
                Overall performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Improvement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                +12%
              </div>
              <p className="text-sm text-gray-600">
                Month over month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                Sarah J.
              </div>
              <p className="text-sm text-gray-600">
                Mathematics - 95% avg
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Students" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Students</SelectItem>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {Object.keys(subjectStats).map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Assessment Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="mock_exam">Mock Exam</SelectItem>
                    <SelectItem value="csec_practice">CSEC Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Subject Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(subjectStats).map(([subject, count]) => (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Assessment List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {assessments
                .filter(assessment => 
                  (selectedStudent === '' || assessment.studentId === selectedStudent) &&
                  (selectedSubject === '' || assessment.subject === selectedSubject) &&
                  (selectedType === '' || assessment.type === selectedType)
                )
                .map((assessment) => (
                  <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{assessment.subject}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{assessment.studentName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(assessment.date).toLocaleDateString()}</span>
                            </div>
                            <Badge variant="outline">{assessment.type}</Badge>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(assessment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(assessment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(assessment.scores).map(([category, score]) => (
                          <div key={category} className="text-center">
                            <div className="text-sm font-medium capitalize mb-2">
                              {category}
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(score, assessment.maxScores[category as keyof typeof assessment.maxScores])}`}>
                              {score}/{assessment.maxScores[category as keyof typeof assessment.maxScores]}
                            </div>
                            <div className="text-sm">
                              <Badge className={assessment.grades[category as keyof typeof assessment.grades]}>
                                {assessment.grades[category as keyof typeof assessment.grades]}
                              </Badge>
                            </div>
                            <Progress 
                              value={(score / assessment.maxScores[category as keyof typeof assessment.maxScores]) * 100} 
                              className="mt-2" 
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Overall Score</div>
                          <div className={`text-3xl font-bold ${getScoreColor(assessment.scores.overall, assessment.maxScores.overall)}`}>
                            {assessment.scores.overall}/{assessment.maxScores.overall}
                          </div>
                          <div className="text-sm">
                            <Badge className={assessment.grades.overall}>
                              {assessment.grades.overall}
                            </Badge>
                          </div>
                          <Progress 
                            value={(assessment.scores.overall / assessment.maxScores.overall) * 100} 
                            className="mt-2" 
                          />
                        </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-sm font-medium mb-2">Notes</div>
                          <p className="text-sm text-gray-600">
                            {assessment.notes || 'No notes available'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(ASSESSMENT_CATEGORIES).map(([category, data]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <data.icon className="h-5 w-5" />
                      {data.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.criteria.map((criterion, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{criterion.name}</span>
                          <Badge variant="outline">{criterion.weight}pts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingAssessment ? 'Edit Assessment' : 'Create New Assessment'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCreateForm(false)
                      setEditingAssessment(null)
                      setNewAssessment({
                        studentId: '',
                        type: 'quiz',
                        subject: '',
                        date: ''
                      })
                      setAssessmentScores({})
                    }}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student *</Label>
                      <Select value={newAssessment.studentId} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, studentId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Assessment Type *</Label>
                      <Select value={newAssessment.type} onValueChange={(value) => setNewAssessment(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="test">Test</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="mock_exam">Mock Exam</SelectItem>
                          <SelectItem value="csec_practice">CSEC Practice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={newAssessment.subject}
                        onChange={(e) => setNewAssessment(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAssessment.date}
                        onChange={(e) => setNewAssessment(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Assessment Scores</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(ASSESSMENT_CATEGORIES).map(([category, data]) => (
                        <div key={category} className="space-y-3">
                          <div className="text-sm font-medium mb-2">{data.title}</div>
                          <div className="space-y-2">
                            {data.criteria.map((criterion, index) => (
                              <div key={index} className="flex items-center gap-4">
                                <span className="text-sm flex-1">{criterion.name}</span>
                                <Input
                                  type="number"
                                  min="0"
                                  max={getMaxScore(category)}
                                  value={assessmentScores[category] || 0}
                                  onChange={(e) => setAssessmentScores(prev => ({ ...prev, [category]: parseInt(e.target.value) || 0 }))}
                                  placeholder="0"
                                  className="w-20"
                                />
                                <span className="text-sm text-gray-500">/{getMaxScore(category)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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
                      {editingAssessment ? 'Update Assessment' : 'Create Assessment'}
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