'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Target,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Brain,
  Heart,
  Zap,
  Users,
  BarChart3,
  FileText,
  Clipboard,
  Lightbulb,
  GraduationCap,
  Activity
} from 'lucide-react'

export default function AssessmentsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [assessmentData, setAssessmentData] = useState({
    academicScore: 0,
    behaviorScore: 0,
    participationScore: 0,
    effortScore: 0,
    criteria: {}
  })

  // Sample assessment data
  const assessments = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      studentGrade: 'Standard 5',
      type: 'Comprehensive Assessment',
      date: '2024-01-15',
      assessor: 'Dr. Mary Thompson',
      academicScore: 92,
      behaviorScore: 88,
      participationScore: 95,
      effortScore: 90,
      overallScore: 91,
      status: 'completed',
      criteria: {
        academic: {
          'Mathematics': 95,
          'English': 88,
          'Science': 90,
          'Social Studies': 85
        },
        behavioral: {
          'Classroom Behavior': 90,
          'Respect for Others': 92,
          'Following Instructions': 85,
          'Self-Control': 88
        },
        personal: {
          'Confidence': 88,
          'Motivation': 95,
          'Independence': 85,
          'Responsibility': 90
        },
        social: {
          'Teamwork': 92,
          'Communication': 88,
          'Leadership': 85,
          'Empathy': 90
        },
        spiritual: {
          'Moral Values': 92,
          'Integrity': 90,
          'Faith Development': 88,
          'Service to Others': 95
        }
      },
      strengths: ['Excellent problem-solving skills', 'Strong leadership qualities', 'High motivation'],
      weaknesses: ['Needs improvement in creative writing', 'Sometimes rushes through work'],
      recommendations: ['Practice creative writing exercises', 'Focus on proofreading work', 'Take more time on assignments'],
      nextSteps: ['Advanced mathematics preparation', 'Leadership development program', 'Creative writing workshop'],
      notes: 'Sarah has shown exceptional progress this term. Her analytical skills are outstanding and she demonstrates strong leadership potential.'
    },
    {
      id: 2,
      studentName: 'Michael Brown',
      studentGrade: 'Form 4',
      type: 'Monthly Assessment',
      date: '2024-01-12',
      assessor: 'Mr. James Wilson',
      academicScore: 78,
      behaviorScore: 85,
      participationScore: 72,
      effortScore: 80,
      overallScore: 79,
      status: 'completed',
      criteria: {
        academic: {
          'Physics': 82,
          'Chemistry': 75,
          'Mathematics': 80,
          'English': 70
        },
        behavioral: {
          'Classroom Behavior': 85,
          'Respect for Others': 88,
          'Following Instructions': 80,
          'Self-Control': 85
        },
        personal: {
          'Confidence': 75,
          'Motivation': 70,
          'Independence': 82,
          'Responsibility': 85
        },
        social: {
          'Teamwork': 78,
          'Communication': 72,
          'Leadership': 70,
          'Empathy': 80
        },
        spiritual: {
          'Moral Values': 85,
          'Integrity': 82,
          'Faith Development': 78,
          'Service to Others': 88
        }
      },
      strengths: ['Strong logical reasoning', 'Good teamwork skills', 'Responsible'],
      weaknesses: ['Essay writing needs improvement', 'Procrastination issues'],
      recommendations: ['Writing workshops', 'Time management strategies', 'Essay structure practice'],
      nextSteps: ['Focus on essay planning', 'Practice with past CSEC papers', 'Develop time management skills'],
      notes: 'Michael is capable but needs to develop better time management skills and writing consistency.'
    },
    {
      id: 3,
      studentName: 'Emily Davis',
      studentGrade: 'Standard 3',
      type: 'Registration Assessment',
      date: '2024-01-10',
      assessor: 'Ms. Sarah Johnson',
      academicScore: 85,
      behaviorScore: 90,
      participationScore: 88,
      effortScore: 92,
      overallScore: 89,
      status: 'completed',
      criteria: {
        academic: {
          'Reading': 90,
          'Writing': 85,
          'Mathematics': 78,
          'Science': 88
        },
        behavioral: {
          'Classroom Behavior': 92,
          'Respect for Others': 90,
          'Following Instructions': 88,
          'Self-Control': 90,
          'Attention Span': 85
        },
        personal: {
          'Confidence': 85,
          'Motivation': 92,
          'Independence': 80,
          'Responsibility': 88
        },
        social: {
          'Teamwork': 90,
          'Communication': 85,
          'Leadership': 82,
          'Empathy': 92,
          'Social Skills': 88
        },
        spiritual: {
          'Moral Values': 90,
          'Integrity': 88,
          'Faith Development': 85,
          'Service to Others': 92,
          'Cultural Awareness': 87
        }
      },
      strengths: ['Excellent reading skills', 'Creative thinker', 'Kind and helpful', 'Strong social skills'],
      weaknesses: ['Mathematical concepts need work', 'Basic operations'],
      recommendations: ['Math games and practice', 'Number sense activities', 'Real-world math applications'],
      nextSteps: ['Focus on foundational math skills', 'Practice with manipulatives', 'Use everyday math examples'],
      notes: 'Emily is a bright student with great potential. She excels in reading and shows strong social development.'
    }
  ]

  const students = [
    { id: 1, name: 'Sarah Johnson', grade: 'Standard 5', avatar: '/avatars/sarah.jpg' },
    { id: 2, name: 'Michael Brown', grade: 'Form 4', avatar: '/avatars/michael.jpg' },
    { id: 3, name: 'Emily Davis', grade: 'Standard 3', avatar: '/avatars/emily.jpg' }
  ]

  const assessmentCriteria = {
    academic: [
      { name: 'Mathematics', description: 'Problem-solving and calculation skills' },
      { name: 'English Language', description: 'Reading, writing, grammar, and comprehension' },
      { name: 'Science', description: 'Scientific concepts and investigation skills' },
      { name: 'Social Studies', description: 'Historical knowledge and cultural understanding' }
    ],
    behavioral: [
      { name: 'Classroom Behavior', description: 'Conduct during lessons and activities' },
      { name: 'Respect for Others', description: 'Treatment of peers and authority figures' },
      { name: 'Following Instructions', description: 'Ability to follow directions and rules' },
      { name: 'Self-Control', description: 'Emotional regulation and impulse control' }
    ],
    personal: [
      { name: 'Confidence', description: 'Self-belief and assertiveness' },
      { name: 'Motivation', description: 'Drive to learn and achieve goals' },
      { name: 'Independence', description: 'Ability to work autonomously' },
      { name: 'Responsibility', description: 'Accountability for actions and decisions' }
    ],
    social: [
      { name: 'Teamwork', description: 'Collaboration with peers' },
      { name: 'Communication', description: 'Clear expression of ideas and thoughts' },
      { name: 'Leadership', description: 'Ability to guide and influence others' },
      { name: 'Empathy', description: 'Understanding and sharing others\' feelings' }
    ],
    spiritual: [
      { name: 'Moral Values', description: 'Understanding of right and wrong' },
      { name: 'Integrity', description: 'Honesty and strong moral principles' },
      { name: 'Faith Development', description: 'Spiritual growth and religious understanding' },
      { name: 'Service to Others', description: 'Willingness to help and serve community' }
    ]
  ]

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assessment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || assessment.type === filterType
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-blue-100 text-blue-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const calculateOverallScore = (assessment) => {
    return Math.round((assessment.academicScore + assessment.behaviorScore + assessment.participationScore + assessment.effortScore) / 4)
  }

  const handleCriteriaScore = (category, criterion, score) => {
    setAssessmentData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [category]: {
          ...prev.criteria[category],
          [criterion]: score
        }
      }
    }))
  }

  const handleCreateAssessment = () => {
    setShowCreateModal(true)
  }

  const handleViewAssessment = (assessmentId) => {
    // In a real app, this would navigate to assessment details
    console.log('Viewing assessment:', assessmentId)
  }

  const handleEditAssessment = (assessmentId) => {
    // In a real app, this would open edit modal
    console.log('Editing assessment:', assessmentId)
  }

  const handleDeleteAssessment = (assessmentId) => {
    // In a real app, this would show confirmation dialog
    console.log('Deleting assessment:', assessmentId)
  }

  const calculateProgress = (assessment) => {
    const overall = calculateOverallScore(assessment)
    const progress = overall >= 90 ? 'Excellent' : overall >= 80 ? 'Good' : overall >= 70 ? 'Satisfactory' : 'Needs Improvement'
    return { score: overall, progress, color: getScoreColor(overall) }
  }

  const getRiskLevel = (assessment) => {
    const overall = calculateOverallScore(assessment)
    if (overall >= 90) return { level: 'Low', color: 'bg-green-100 text-green-800' }
    if (overall >= 80) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    return { level: 'High', color: 'bg-red-100 text-red-800' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
          <p className="text-gray-600">Comprehensive student evaluation system with 25+ criteria</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateAssessment}>
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{assessments.length}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(assessments.reduce((sum, a) => sum + calculateOverallScore(a), 0) / assessments.length)}%
            </div>
            <p className="text-xs text-gray-600">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {assessments.filter(a => calculateOverallScore(a) >= 90).length}
            </div>
            <p className="text-xs text-gray-600">90%+ scores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Support</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {assessments.filter(a => calculateOverallScore(a) < 70).length}
            </div>
            <p className="text-xs text-gray-600">Below 70% scores</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter assessments by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Registration Assessment">Registration Assessment</SelectItem>
                <SelectItem value="Monthly Assessment">Monthly Assessment</SelectItem>
                <SelectItem value="Quarterly Assessment">Quarterly Assessment</SelectItem>
                <SelectItem value="Annual Assessment">Annual Assessment</SelectItem>
                <SelectItem value="Comprehensive Assessment">Comprehensive Assessment</SelectItem>
                <SelectItem value="SEA Practice">SEA Practice</SelectItem>
                <SelectItem value="CSEC Practice">CSEC Practice</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {assessment.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assessment.studentName}</h3>
                    <p className="text-sm text-gray-600">{assessment.studentGrade}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={getScoreBadge(calculateOverallScore(assessment))}>
                    {calculateOverallScore(assessment)}%
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className={getScoreColor(calculateOverallScore(assessment))}>
                      {calculateProgress(assessment).progress}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={getScoreBadge(assessment.academicScore)}>
                  Academic: {assessment.academicScore}%
                </Badge>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getScoreBadge(assessment.behaviorScore)}>
                  Behavioral: {assessment.behaviorScore}%
                </Badge>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getScoreBadge(assessment.participationScore)}>
                  Participation: {assessment.participationScore}%
                </Badge>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getScoreBadge(assessment.effortScore)}>
                  Effort: {assessment.effortScore}%
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{assessment.type}</p>
                  <p className="text-xs">{assessment.date}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <p className="font-medium">Assessor: {assessment.assessor}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <p className="font-medium">Status: <Badge variant={getScoreBadge(calculateOverallScore(assessment))}>{assessment.status}</Badge></p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Assessment Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Academic Performance</h5>
                  <div className="space-y-2">
                    {Object.entries(assessment.criteria.academic || {}).map(([subject, score]) => (
                      <div key={subject} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{subject}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Behavioral Development</h5>
                  <div className="space-y-2">
                    {Object.entries(assessment.criteria.behavioral || {}).map(([criterion, score]) => (
                      <div key={criterion} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{criterion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Personal Growth</h5>
                  <div className="space-y-2">
                    {Object.entries(assessment.criteria.personal || {}).map(([criterion, score]) => (
                      <div key={criterion} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{criterion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Social Skills</h5>
                  <div className="space-y-2">
                    {Object.entries(assessment.criteria.social || {}).map(([criterion, score]) => (
                      <div key={criterion} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{criterion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Spiritual Development</h5>
                  <div className="space-y-2">
                    {Object.entries(assessment.criteria.spiritual || {}).map(([criterion, score]) => (
                      <div key={criterion} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{criterion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24">
                            <Progress value={score} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Strengths</h5>
                <div className="flex flex-wrap gap-2">
                  {assessment.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="bg-green-100 text-green-800">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                <div className="flex flex-wrap gap-2">
                  {assessment.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h5>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{assessment.recommendations}</p>
                  <p className="text-sm text-gray-600">{assessment.nextSteps}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Next Steps</h5>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{assessment.notes}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <Button size="sm" variant="outline" onClick={() => handleViewAssessment(assessment.id)}>
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEditAssessment(assessment.id)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDeleteAssessment(assessment.id)}>
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
        ))}
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create New Assessment</CardTitle>
                <CardDescription>
                  Comprehensive student evaluation with 25+ criteria across 5 categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Student *
                    </label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.name}>
                            {student.name} ({student.grade})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Select>
                </div>

                <div>
                  <label htmlFor="assessment-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Type *
                  </label>
                  <Select value={assessmentData.type || 'Comprehensive Assessment'} onValueChange={(value) => setAssessmentData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select assessment type" />
                    </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="Registration Assessment">Registration Assessment</SelectItem>
                      <SelectItem value="Monthly Assessment">Monthly Assessment</SelectItem>
                      <SelectItem value="Quarterly Assessment">Quarterly Assessment</SelectItem>
                      <SelectItem value="Annual Assessment">Annual Assessment</SelectItem>
                      <SelectItem value="Comprehensive Assessment">Comprehensive Assessment</SelectItem>
                      <SelectItem value="SEA Practice">SEA Practice</SelectItem>
                      <SelectItem value="CSEC Practice">CSEC Practice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="academic-score" className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Score (1-100)
                    </label>
                    <Input
                      id="academic-score"
                      type="number"
                      min="1"
                      max="100"
                      value={assessmentData.academicScore}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, academicScore: parseInt(e.target.value) || 0 }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="behavior-score" className="block text-sm font-medium text-gray-700 mb-2">
                      Behavioral Score (1-100)
                    </label>
                    <Input
                      id="behavior-score"
                      type="number"
                      min="1"
                      max="100"
                      value={assessmentData.behaviorScore}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, behaviorScore: parseInt(e.target.value) || 0 }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="participation-score" className="block text-sm font-medium text-gray-700 mb-2">
                      Participation Score (1-100)
                    </label>
                    <Input
                      id="participation-score"
                      type="number"
                      min="1"
                      max="100"
                      value={assessmentData.participationScore}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, participationScore: parseInt(e.target.value) || 0 }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="effort-score" className="block text-sm font-medium text-gray-700 mb-2">
                      Effort Score (1-100)
                    </label>
                    <Input
                      id="effort-score"
                      type="number"
                      min="1"
                      max="100"
                      value={assessmentData.effortScore}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, effortScore: parseInt(e.target.value) || 0 }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-4">Assessment Criteria</h5>
                  <p className="text-xs text-gray-600 mb-2">
                    Rate each criterion from 1-5 scale
                  </p>
                </div>

                {assessmentCriteria.academic && Object.entries(assessmentCriteria.academic).map(([subject, criteria]) => (
                  <div key={subject} className="mb-4">
                    <h6 className="text-sm font-medium text-gray-900">{subject}</h6>
                    <div className="space-y-2">
                      {criteria.map((criterion, score) => (
                        <div key={criterion} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{criterion}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="1"
                              max="5"
                              value={score}
                              onChange={(e) => handleCriteriaScore('academic', criterion, parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-600 ml-2">{score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                {assessmentCriteria.behavioral && Object.entries(assessmentCriteria.behavioral).map(([criterion, score]) => (
                  <div key={criterion} className="mb-4">
                    <h6 className="text-sm font-medium text-gray-900">{criterion}</h6>
                    <div className="space-y-2">
                      {criteria.map((criterion, score) => (
                        <div key={criterion} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{criterion}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="1"
                              max="5"
                              value={score}
                              onChange={(e) => handleCriteriaScore('behavioral', criterion, parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-600 ml-2">{score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {assessmentCriteria.personal && Object.entries(assessmentCriteria.personal).map(([criterion, score]) => (
                  <div key={criterion} className="mb-4">
                    <h6 className="text-sm font-medium text-gray-900">{criterion}</h6>
                    <div className="space-y-2">
                      {criteria.map((criterion, score) => (
                        <div key={criterion} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{criterion}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="1"
                              max="5"
                              value={score}
                              onChange={(e) => handleCriteriaScore('personal', criterion, parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-600 ml-2">{score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>

                {assessmentCriteria.social && Object.entries(assessmentCriteria.social).map(([criterion, score]) => (
                  <div key={criterion} className="mb-4">
                    <h6 className="text-sm font-medium text-gray-900">{criterion}</h6>
                    <div className="space-y-2">
                      {criteria.map((criterion, score) => (
                        <div key={criterion} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{criterion}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="1"
                              max="5"
                              value={score}
                              onChange={(e) => handleCriteriaScore('social', criterion, parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-600 ml-2">{score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>

                {assessmentCriteria.spiritual && Object.entries(assessmentCriteria.spiritual).map(([criterion, score]) => (
                  <div key={criterion} className="mb-4">
                    <h6 className="text-sm font-medium text-gray-900">{criterion}</h6>
                    <div className="space-y-2">
                      {criteria.map((criterion, score) => (
                        <div key={criterion} className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{criterion}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="1"
                              max="5"
                              value={score}
                              onChange={(e) => handleCriteriaScore('spiritual', criterion, parseInt(e.target.value))}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-600 ml-2">{score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-2">
                Strengths (comma-separated)
              </label>
              <Textarea
                id="strengths"
                placeholder="List student's academic strengths..."
                value={assessmentData.strengths || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, strengths: e.target.value }))}
                className="w-full min-h-[100px]"
                rows={3}
              />
              </div>

              <div>
              <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700 mb-2">
                Areas for Improvement (comma-separated)
              </label>
              <Textarea
                id="weaknesses"
                placeholder="List areas needing improvement..."
                value={assessmentData.weaknesses || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, weaknesseses: e.target.value }))}
                className="w-full min-h-[100px]"
                rows={3}
              />
              </div>

              <div>
              <label htmlFor="recommendations" className="block text-sm font-medium text-gray-700 mb-2">
                Recommendations
              </label>
              <Textarea
                id="recommendations"
                placeholder="Provide specific recommendations..."
                value={assessmentData.recommendations || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, recommendations: e.target.value }))}
                className="w-full min-h-[100px]"
                rows={3}
              />
              </div>

              <div>
              <label htmlFor="next-steps" className="block text-sm font-medium text-gray-700 mb-2">
                Next Steps
              </label>
              <Textarea
                id="next-steps"
                placeholder="Outline next steps for student development..."
                value={assessmentData.nextSteps || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, nextSteps: e.target.value }))}
                className="w-full min-h-[100px]"
                rows={3}
              />
              </div>

              <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Any additional observations or notes..."
                value={assessmentData.notes || ''}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full min-h-[100px]"
                rows={4}
              />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
                // In a real app, this would save the assessment
                console.log('Creating assessment for:', selectedStudent)
                setShowCreateModal(false)
              }}>
                Create Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AssessmentsTab