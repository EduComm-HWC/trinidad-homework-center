'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Users,
  BarChart3,
  FileText,
  Clipboard,
  Lightbulb,
  Zap,
  GraduationCap,
  Activity,
  Settings
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
  const students = [
    { id: 1, name: 'Sarah Johnson', grade: 'Standard 5', avatar: '/avatars/sarah.jpg' },
    { id: 2, name: 'Michael Brown', grade: 'Form 4', avatar: '/avatars/michael.jpg' },
    { id: 3, name: 'Emily Davis', grade: 'Standard 3', avatar: '/avatars/emily.jpg' },
    { id: 4, name: 'James Wilson', grade: 'Form 2', avatar: '/avatars/james.jpg' },
    { id: 5, name: 'Sophia Taylor', grade: 'Standard 4', avatar: '/avatars/sophia.jpg' }
  ]

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
          'English Language': 88,
          'Science': 92,
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
      recommendations: ['Practice creative writing exercises', 'Focus on proofreading work'],
      nextSteps: ['Advanced mathematics preparation', 'Leadership development program'],
      notes: 'Sarah has shown exceptional progress this term. Her analytical skills are outstanding.'
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
          'Service to Others': 80
        }
      },
      strengths: ['Strong logical reasoning', 'Good teamwork skills', 'Responsible'],
      weaknesses: ['Lacks confidence in speaking', 'Procrastination issues'],
      recommendations: ['Public speaking practice', 'Time management workshops'],
      nextSteps: ['Build confidence through presentations', 'Develop study schedule'],
      notes: 'Michael is capable but needs encouragement to participate more actively.'
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
          'Self-Control': 90
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
          'Empathy': 92
        },
        spiritual: {
          'Moral Values': 90,
          'Integrity': 88,
          'Faith Development': 85,
          'Service to Others': 92
        }
      },
      strengths: ['Excellent reading skills', 'Creative thinker', 'Kind and helpful'],
      weaknesses: ['Basic math concepts need work', 'Shy in large groups'],
      recommendations: ['Math games and practice', 'Group activities to build confidence'],
      nextSteps: ['Focus on foundational math skills', 'Encourage group participation'],
      notes: 'Emily is a bright student with great potential. Needs support in mathematics.'
    }
  ]

  const assessmentCriteria = {
    academic: [
      { name: 'Mathematics', description: 'Problem-solving, calculations, mathematical reasoning' },
      { name: 'English Language', description: 'Reading, writing, grammar, comprehension' },
      { name: 'Science', description: 'Scientific concepts, experiments, critical thinking' },
      { name: 'Social Studies', description: 'History, geography, cultural awareness' }
    ],
    behavioral: [
      { name: 'Classroom Behavior', description: 'Conduct during lessons, following rules' },
      { name: 'Respect for Others', description: 'Treatment of peers and teachers' },
      { name: 'Following Instructions', description: 'Ability to follow directions' },
      { name: 'Self-Control', description: 'Emotional regulation and impulse control' }
    ],
    personal: [
      { name: 'Confidence', description: 'Self-esteem and belief in abilities' },
      { name: 'Motivation', description: 'Drive to learn and succeed' },
      { name: 'Independence', description: 'Ability to work autonomously' },
      { name: 'Responsibility', description: 'Accountability for actions and work' }
    ],
    social: [
      { name: 'Teamwork', description: 'Collaboration with peers' },
      { name: 'Communication', description: 'Expression of ideas and listening' },
      { name: 'Leadership', description: 'Ability to lead and guide others' },
      { name: 'Empathy', description: 'Understanding and sharing others\' feelings' }
    ],
    spiritual: [
      { name: 'Moral Values', description: 'Understanding of right and wrong' },
      { name: 'Integrity', description: 'Honesty and strong moral principles' },
      { name: 'Faith Development', description: 'Spiritual growth and understanding' },
      { name: 'Service to Others', description: 'Willingness to help and serve' }
    ]
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
          <p className="text-gray-600">Comprehensive student evaluation system</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Clipboard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(assessments.reduce((acc, a) => acc + calculateOverallScore(a), 0) / assessments.length)}%
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
            <div className="text-2xl font-bold">
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
            <div className="text-2xl font-bold">
              {assessments.filter(a => calculateOverallScore(a) < 70).length}
            </div>
            <p className="text-xs text-gray-600">Below 70%</p>
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
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Assessment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Registration Assessment">Registration Assessment</SelectItem>
                <SelectItem value="Monthly Assessment">Monthly Assessment</SelectItem>
                <SelectItem value="Quarterly Assessment">Quarterly Assessment</SelectItem>
                <SelectItem value="Annual Assessment">Annual Assessment</SelectItem>
                <SelectItem value="Comprehensive Assessment">Comprehensive Assessment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
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
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {assessment.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assessment.studentName}</h3>
                    <p className="text-sm text-gray-600">{assessment.studentGrade}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getScoreBadge(calculateOverallScore(assessment))}>
                      {calculateOverallScore(assessment)}%
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">Overall Score</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.academicScore)}`}>
                    {assessment.academicScore}%
                  </div>
                  <p className="text-xs text-gray-600">Academic</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.behaviorScore)}`}>
                    {assessment.behaviorScore}%
                  </div>
                  <p className="text-xs text-gray-600">Behavioral</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.participationScore)}`}>
                    {assessment.participationScore}%
                  </div>
                  <p className="text-xs text-gray-600">Participation</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.effortScore)}`}>
                    {assessment.effortScore}%
                  </div>
                  <p className="text-xs text-gray-600">Effort</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Assessment Details</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Type:</strong> {assessment.type}</p>
                    <p><strong>Date:</strong> {assessment.date}</p>
                    <p><strong>Assessor:</strong> {assessment.assessor}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Key Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(assessment.criteria).slice(0, 3).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {assessment.strengths && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">Strengths</p>
                  <div className="flex flex-wrap gap-1">
                    {assessment.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {assessment.weaknesses && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">Areas for Improvement</p>
                  <div className="flex flex-wrap gap-1">
                    {assessment.weaknesses.map((weakness, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {assessment.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {assessment.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Assessment</CardTitle>
              <CardDescription>Comprehensive student evaluation with 25+ criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Selection */}
              <div>
                <label className="text-sm font-medium text-gray-900">Select Student *</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
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
              </div>

              {/* Assessment Criteria */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Assessment Criteria</h3>
                
                {Object.entries(assessmentCriteria).map(([category, criteria]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-gray-900 capitalize">
                      {category} Development
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {criteria.map((criterion) => (
                        <div key={criterion.name} className="space-y-2">
                          <div>
                            <label className="text-sm font-medium text-gray-900">
                              {criterion.name}
                            </label>
                            <p className="text-xs text-gray-500">{criterion.description}</p>
                          </div>
                          <Select 
                            onValueChange={(value) => handleCriteriaScore(category, criterion.name, parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Score (1-5)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Needs Significant Improvement</SelectItem>
                              <SelectItem value="2">2 - Needs Improvement</SelectItem>
                              <SelectItem value="3">3 - Meets Expectations</SelectItem>
                              <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                              <SelectItem value="5">5 - Outstanding</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">Strengths</label>
                  <Textarea placeholder="List the student's key strengths..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Areas for Improvement</label>
                  <Textarea placeholder="List areas that need work..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Recommendations</label>
                  <Textarea placeholder="Provide specific recommendations..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Next Steps</label>
                  <Textarea placeholder="Outline next steps for development..." rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Additional Notes</label>
                  <Textarea placeholder="Any additional observations or notes..." rows={3} />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  Create Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Assessment Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="w-6 h-6" />
              <span className="text-xs">Set Goals</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span className="text-xs">Parent Meetings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Settings className="w-6 h-6" />
              <span className="text-xs">Assessment Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}