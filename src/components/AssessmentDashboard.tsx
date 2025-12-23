"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  BookOpen,
  Target,
  Brain,
  Heart,
  Activity,
  Download,
  Filter,
  Search
} from "lucide-react"
import { toast } from "sonner"

interface Assessment {
  id: string
  studentId: string
  student: {
    firstName: string
    lastName: string
    parish: string
  }
  session: {
    subject: string
    sessionDate: string
    sessionType: string
  }
  tutor: {
    user: {
      name: string
    }
  }
  assessmentDate: string
  overallScore: number
  riskLevel: string
  preparationScore: number
  homeworkScore: number
  participationScore: number
  understandingScore: number
  behaviorScore: number
  focusScore: number
  cooperationScore: number
  attitudeScore: number
  peerInteractionScore: number
  emotionalStateScore: number
  confidenceScore: number
  motivationScore: number
  energyLevelScore: number
  wellbeingScore: number
  nutritionScore: number
  communicationScore: number
  teamworkScore: number
  conflictResolutionScore: number
  problemSolvingScore: number
  criticalThinkingScore: number
  creativityScore: number
  memoryScore: number
  stressIndicators: string[]
  immediateSupport: string[]
  concerns: string[]
  achievements: string[]
}

interface Student {
  id: string
  firstName: string
  lastName: string
  parish: string
  _count: {
    sessions: number
    assessments: number
  }
}

export function AssessmentDashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<string>("all")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [assessmentsResponse, studentsResponse] = await Promise.all([
        fetch('/api/assessments'),
        fetch('/api/students')
      ])

      if (assessmentsResponse.ok && studentsResponse.ok) {
        const assessmentsData = await assessmentsResponse.json()
        const studentsData = await studentsResponse.json()
        
        setAssessments(assessmentsData)
        setStudents(studentsData)
      }
    } catch (error) {
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "LOW": return "bg-green-100 text-green-800"
      case "MEDIUM": return "bg-yellow-100 text-yellow-800"
      case "HIGH": return "bg-orange-100 text-orange-800"
      case "CRITICAL": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const filteredAssessments = assessments.filter(assessment => {
    const matchesStudent = selectedStudent === "all" || assessment.studentId === selectedStudent
    const matchesSubject = selectedSubject === "all" || assessment.session.subject === selectedSubject
    const matchesSearch = assessment.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStudent && matchesSubject && matchesSearch
  })

  // Calculate statistics
  const totalAssessments = filteredAssessments.length
  const averageScore = filteredAssessments.length > 0 
    ? filteredAssessments.reduce((sum, a) => sum + a.overallScore, 0) / filteredAssessments.length 
    : 0
  const highRiskCount = filteredAssessments.filter(a => a.riskLevel === "HIGH" || a.riskLevel === "CRITICAL").length
  const recentAssessments = filteredAssessments.filter(a => {
    const assessmentDate = new Date(a.assessmentDate)
    const daysDiff = (new Date().getTime() - assessmentDate.getTime()) / (1000 * 3600 * 24)
    return daysDiff <= parseInt(selectedTimeRange)
  })

  // Prepare chart data
  const progressData = filteredAssessments
    .sort((a, b) => new Date(a.assessmentDate).getTime() - new Date(b.assessmentDate).getTime())
    .map(assessment => ({
      date: new Date(assessment.assessmentDate).toLocaleDateString(),
      overallScore: assessment.overallScore,
      academicScore: (assessment.preparationScore + assessment.homeworkScore + assessment.participationScore + assessment.understandingScore) / 4,
      behavioralScore: (assessment.behaviorScore + assessment.focusScore + assessment.cooperationScore + assessment.attitudeScore + assessment.peerInteractionScore) / 5,
      emotionalScore: (assessment.emotionalStateScore + assessment.confidenceScore + assessment.motivationScore) / 3
    }))

  const riskDistribution = [
    { name: "Low", value: filteredAssessments.filter(a => a.riskLevel === "LOW").length, color: "#10b981" },
    { name: "Medium", value: filteredAssessments.filter(a => a.riskLevel === "MEDIUM").length, color: "#f59e0b" },
    { name: "High", value: filteredAssessments.filter(a => a.riskLevel === "HIGH").length, color: "#f97316" },
    { name: "Critical", value: filteredAssessments.filter(a => a.riskLevel === "CRITICAL").length, color: "#ef4444" }
  ]

  const subjectPerformance = Object.entries(
    filteredAssessments.reduce((acc, assessment) => {
      const subject = assessment.session.subject
      if (!acc[subject]) {
        acc[subject] = { total: 0, count: 0 }
      }
      acc[subject].total += assessment.overallScore
      acc[subject].count += 1
      return acc
    }, {} as Record<string, { total: number; count: number }>)
  ).map(([subject, data]) => ({
    subject,
    averageScore: Math.round((data.total / data.count) * 10) / 10,
    assessmentCount: data.count
  })).sort((a, b) => b.averageScore - a.averageScore)

  const exportToCSV = () => {
    const headers = [
      'Student Name', 'Assessment Date', 'Subject', 'Overall Score', 'Risk Level',
      'Preparation', 'Homework', 'Participation', 'Understanding',
      'Behavior', 'Focus', 'Cooperation', 'Attitude', 'Peer Interaction',
      'Emotional State', 'Confidence', 'Motivation',
      'Energy Level', 'Wellbeing', 'Nutrition',
      'Communication', 'Teamwork', 'Conflict Resolution',
      'Problem Solving', 'Critical Thinking', 'Creativity', 'Memory'
    ]

    const csvData = filteredAssessments.map(assessment => [
      `${assessment.student.firstName} ${assessment.student.lastName}`,
      assessment.assessmentDate,
      assessment.session.subject,
      assessment.overallScore,
      assessment.riskLevel,
      assessment.preparationScore,
      assessment.homeworkScore,
      assessment.participationScore,
      assessment.understandingScore,
      assessment.behaviorScore,
      assessment.focusScore,
      assessment.cooperationScore,
      assessment.attitudeScore,
      assessment.peerInteractionScore,
      assessment.emotionalStateScore,
      assessment.confidenceScore,
      assessment.motivationScore,
      assessment.energyLevelScore,
      assessment.wellbeingScore,
      assessment.nutritionScore,
      assessment.communicationScore,
      assessment.teamworkScore,
      assessment.conflictResolutionScore,
      assessment.problemSolvingScore,
      assessment.criticalThinkingScore,
      assessment.creativityScore,
      assessment.memoryScore
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `assessment_data_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assessment Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive student progress tracking and analytics</p>
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search Student</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {Array.from(new Set(assessments.map(a => a.session.subject))).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground">
              {recentAssessments.length} in last {selectedTimeRange} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
            <Progress value={(averageScore / 5) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalAssessments > 0 ? Math.round((highRiskCount / totalAssessments) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              With assessment data
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress">Progress Trends</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="details">Assessment Details</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Student performance trends across different assessment areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="overallScore" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="academicScore" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="behavioralScore" stroke="#ffc658" />
                  <Line type="monotone" dataKey="emotionalScore" stroke="#ff7c7c" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Level Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskDistribution.map((risk) => (
                    <div key={risk.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                        <span className="font-medium">{risk.name}</span>
                      </div>
                      <Badge variant="outline">{risk.value} students</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Average scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="averageScore" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>Detailed assessment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssessments.slice(0, 10).map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {assessment.student.firstName} {assessment.student.lastName}
                        </span>
                        <Badge variant="outline">{assessment.session.subject}</Badge>
                        <Badge className={getRiskLevelColor(assessment.riskLevel)}>
                          {assessment.riskLevel}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(assessment.assessmentDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Overall:</span> {assessment.overallScore.toFixed(1)}/5
                      </div>
                      <div>
                        <span className="font-medium">Academic:</span> {(
                          (assessment.preparationScore + assessment.homeworkScore + 
                           assessment.participationScore + assessment.understandingScore) / 4
                        ).toFixed(1)}/5
                      </div>
                      <div>
                        <span className="font-medium">Behavioral:</span> {(
                          (assessment.behaviorScore + assessment.focusScore + 
                           assessment.cooperationScore + assessment.attitudeScore + 
                           assessment.peerInteractionScore) / 5
                        ).toFixed(1)}/5
                      </div>
                      <div>
                        <span className="font-medium">Emotional:</span> {(
                          (assessment.emotionalStateScore + assessment.confidenceScore + 
                           assessment.motivationScore) / 3
                        ).toFixed(1)}/5
                      </div>
                    </div>
                    {assessment.concerns.length > 0 && (
                      <div className="mt-2">
                        <span className="font-medium text-sm">Concerns: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {JSON.parse(assessment.concerns as string).map((concern: string, index: number) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}