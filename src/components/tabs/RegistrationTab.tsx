'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  AlertCircle,
  CheckCircle,
  School,
  User,
  Heart,
  Brain,
  Star
} from 'lucide-react'

export default function RegistrationTab() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    grade: '',
    school: '',
    schoolType: 'PRIMARY',
    subjects: [],
    careerGoals: '',
    strengths: '',
    weaknesses: '',
    learningStyle: '',
    emergencyContact: '',
    medicalInfo: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    parentOccupation: '',
    parentWorkplace: '',
    relationship: '',
    canVolunteer: false,
    availability: '',
    communication: 'EMAIL',
    
    // Address Information
    address: '',
    parish: '',
    transportation: '',
    
    // Assessment Information
    literacyScore: '',
    numeracyScore: '',
    readingLevel: '',
    comprehensionLevel: '',
    writingLevel: '',
    mathLevel: '',
    scienceLevel: '',
    socialStudiesLevel: '',
    attentionSpan: '',
    socialSkills: '',
    emotionalDevelopment: '',
    specialNeeds: '',
    goals: '',
    expectations: ''
  })

  const trinidadParishes = [
    'Port of Spain',
    'San Fernando',
    'Arima',
    'Point Fortin',
    'Couva',
    'Chaguanas',
    'Scarborough',
    'Princes Town',
    'Siparia',
    'Rio Claro',
    'Tunapuna',
    'Diego Martin',
    'San Juan',
    'Barataria'
  ]

  const primarySchools = [
    'St. Joseph\'s Convent POS',
    'Holy Name Convent',
    'St. Mary\'s College',
    'Queen\'s Royal College',
    'Fatima College',
    'St. Augustine Girls\' High School',
    'Bishop Anstey High School',
    'Naparima Girls\' College',
    'Presentation College',
    'Hillview College'
  ]

  const secondarySchools = [
    'St. Joseph\'s Convent POS',
    'Holy Name Convent',
    'St. Mary\'s College',
    'Queen\'s Royal College',
    'Fatima College',
    'St. Augustine Girls\' High School',
    'Bishop Anstey High School',
    'Naparima Girls\' College',
    'Presentation College',
    'Hillview College'
  ]

  const seaSubjects = [
    'Mathematics',
    'English Language Arts',
    'Science',
    'Social Studies',
    'Creative Writing',
    'Reading Comprehension',
    'Grammar',
    'Spelling',
    'Mental Mathematics',
    'Problem Solving'
  ]

  const csecSubjects = [
    'Mathematics',
    'English Language',
    'English Literature',
    'Physics',
    'Chemistry',
    'Biology',
    'Information Technology',
    'Principles of Business',
    'Principles of Accounts',
    'Economics',
    'Geography',
    'History',
    'Social Studies',
    'Spanish',
    'French',
    'Physical Education',
    'Visual Arts',
    'Music',
    'Drama',
    'Agricultural Science'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Registration submitted:', formData)
    // Handle form submission
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Student Information</h3>
              <p className="text-sm text-gray-600">Tell us about the student</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade Level *</Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard 1">Standard 1 (Age 6-7)</SelectItem>
                    <SelectItem value="Standard 2">Standard 2 (Age 7-8)</SelectItem>
                    <SelectItem value="Standard 3">Standard 3 (Age 8-9)</SelectItem>
                    <SelectItem value="Standard 4">Standard 4 (Age 9-10)</SelectItem>
                    <SelectItem value="Standard 5">Standard 5 (Age 10-11)</SelectItem>
                    <SelectItem value="Form 1">Form 1 (Age 11-12)</SelectItem>
                    <SelectItem value="Form 2">Form 2 (Age 12-13)</SelectItem>
                    <SelectItem value="Form 3">Form 3 (Age 13-14)</SelectItem>
                    <SelectItem value="Form 4">Form 4 (Age 14-15)</SelectItem>
                    <SelectItem value="Form 5">Form 5 (Age 15-16)</SelectItem>
                    <SelectItem value="Form 6">Form 6 (Age 16-17)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolType">School Type *</Label>
                <Select value={formData.schoolType} onValueChange={(value) => handleInputChange('schoolType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRIMARY">Primary School</SelectItem>
                    <SelectItem value="SECONDARY">Secondary School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="school">School Name *</Label>
                <Select value={formData.school} onValueChange={(value) => handleInputChange('school', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school" />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.schoolType === 'PRIMARY' ? primarySchools : secondarySchools).map((school) => (
                      <SelectItem key={school} value={school}>{school}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Subjects of Interest *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {(formData.schoolType === 'PRIMARY' ? seaSubjects : csecSubjects).map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={formData.subjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <Label htmlFor={subject} className="text-sm">{subject}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                placeholder="What does the student want to become?"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="strengths">Academic Strengths</Label>
                <Textarea
                  id="strengths"
                  value={formData.strengths}
                  onChange={(e) => handleInputChange('strengths', e.target.value)}
                  placeholder="What subjects does the student excel in?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="weaknesses">Areas for Improvement</Label>
                <Textarea
                  id="weaknesses"
                  value={formData.weaknesses}
                  onChange={(e) => handleInputChange('weaknesses', e.target.value)}
                  placeholder="What subjects need more focus?"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="learningStyle">Learning Style</Label>
              <Select value={formData.learningStyle} onValueChange={(value) => handleInputChange('learningStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual Learner</SelectItem>
                  <SelectItem value="auditory">Auditory Learner</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic Learner</SelectItem>
                  <SelectItem value="reading">Reading/Writing Learner</SelectItem>
                  <SelectItem value="mixed">Mixed Learning Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Emergency contact name and phone"
                />
              </div>
              <div>
                <Label htmlFor="medicalInfo">Medical Information</Label>
                <Input
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                  placeholder="Any medical conditions or allergies"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
              <p className="text-sm text-gray-600">Tell us about the parent or guardian</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentFirstName">Parent/Guardian First Name *</Label>
                <Input
                  id="parentFirstName"
                  value={formData.parentFirstName}
                  onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="parentLastName">Parent/Guardian Last Name *</Label>
                <Input
                  id="parentLastName"
                  value={formData.parentLastName}
                  onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentEmail">Email Address *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  placeholder="parent@example.com"
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Phone Number *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  placeholder="1-868-123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="relationship">Relationship to Student *</Label>
                <Select value={formData.relationship} onValueChange={(value) => handleInputChange('relationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Grandmother">Grandmother</SelectItem>
                    <SelectItem value="Grandfather">Grandfather</SelectItem>
                    <SelectItem value="Aunt">Aunt</SelectItem>
                    <SelectItem value="Uncle">Uncle</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="communication">Preferred Communication</Label>
                <Select value={formData.communication} onValueChange={(value) => handleInputChange('communication', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="PHONE">Phone</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentOccupation">Occupation</Label>
                <Input
                  id="parentOccupation"
                  value={formData.parentOccupation}
                  onChange={(e) => handleInputChange('parentOccupation', e.target.value)}
                  placeholder="Enter occupation"
                />
              </div>
              <div>
                <Label htmlFor="parentWorkplace">Workplace</Label>
                <Input
                  id="parentWorkplace"
                  value={formData.parentWorkplace}
                  onChange={(e) => handleInputChange('parentWorkplace', e.target.value)}
                  placeholder="Enter workplace"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="availability">Availability for Volunteering</Label>
              <Textarea
                id="availability"
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                placeholder="Days and times you are available to volunteer (optional)"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="canVolunteer"
                checked={formData.canVolunteer}
                onCheckedChange={(checked) => handleInputChange('canVolunteer', checked)}
              />
              <Label htmlFor="canVolunteer">I am interested in volunteering as a tutor</Label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Address & Location</h3>
              <p className="text-sm text-gray-600">Tell us where you're located</p>
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="parish">Parish *</Label>
              <Select value={formData.parish} onValueChange={(value) => handleInputChange('parish', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parish" />
                </SelectTrigger>
                <SelectContent>
                  {trinidadParishes.map((parish) => (
                    <SelectItem key={parish} value={parish}>{parish}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transportation">Transportation Arrangements</Label>
              <Textarea
                id="transportation"
                value={formData.transportation}
                onChange={(e) => handleInputChange('transportation', e.target.value)}
                placeholder="How will the student get to and from the homework center?"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Academic Assessment</h3>
              <p className="text-sm text-gray-600">Help us understand the student's current level</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="literacyScore">Literacy Assessment (1-10)</Label>
                <Input
                  id="literacyScore"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.literacyScore}
                  onChange={(e) => handleInputChange('literacyScore', e.target.value)}
                  placeholder="Rate literacy skills"
                />
              </div>
              <div>
                <Label htmlFor="numeracyScore">Numeracy Assessment (1-10)</Label>
                <Input
                  id="numeracyScore"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.numeracyScore}
                  onChange={(e) => handleInputChange('numeracyScore', e.target.value)}
                  placeholder="Rate numeracy skills"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="readingLevel">Reading Level</Label>
                <Select value={formData.readingLevel} onValueChange={(value) => handleInputChange('readingLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reading level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Below Grade Level">Below Grade Level</SelectItem>
                    <SelectItem value="At Grade Level">At Grade Level</SelectItem>
                    <SelectItem value="Above Grade Level">Above Grade Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="comprehensionLevel">Comprehension Level</Label>
                <Select value={formData.comprehensionLevel} onValueChange={(value) => handleInputChange('comprehensionLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select comprehension level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                    <SelectItem value="Developing">Developing</SelectItem>
                    <SelectItem value="Proficient">Proficient</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mathLevel">Mathematics Level</Label>
                <Select value={formData.mathLevel} onValueChange={(value) => handleInputChange('mathLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select math level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="scienceLevel">Science Level</Label>
                <Select value={formData.scienceLevel} onValueChange={(value) => handleInputChange('scienceLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select science level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="attentionSpan">Attention Span</Label>
              <Select value={formData.attentionSpan} onValueChange={(value) => handleInputChange('attentionSpan', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select attention span" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short (5-15 min)">Short (5-15 min)</SelectItem>
                  <SelectItem value="Medium (15-30 min)">Medium (15-30 min)</SelectItem>
                  <SelectItem value="Long (30+ min)">Long (30+ min)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="specialNeeds">Special Needs or Accommodations</Label>
              <Textarea
                id="specialNeeds"
                value={formData.specialNeeds}
                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                placeholder="Any special needs, learning disabilities, or accommodations required"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="goals">Learning Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="What are the student's specific learning goals?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="expectations">Expectations from Homework Center</Label>
              <Textarea
                id="expectations"
                value={formData.expectations}
                onChange={(e) => handleInputChange('expectations', e.target.value)}
                placeholder="What do you hope to achieve through our program?"
                rows={3}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student Registration</span>
          </CardTitle>
          <CardDescription>
            Register a new student for the Faith Tabernacle Homework Center
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-full h-1 mx-2 ${
                    currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <p className={`text-sm font-medium ${currentStep >= 1 ? 'text-red-600' : 'text-gray-500'}`}>
                Student Info
              </p>
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${currentStep >= 2 ? 'text-red-600' : 'text-gray-500'}`}>
                Parent Info
              </p>
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${currentStep >= 3 ? 'text-red-600' : 'text-gray-500'}`}>
                Location
              </p>
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${currentStep >= 4 ? 'text-red-600' : 'text-gray-500'}`}>
                Assessment
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex space-x-2">
              {currentStep < 4 ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">
                  Complete Registration
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="h-5 w-5" />
              <span>Our Programs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• SEA Preparation (Standards 1-5)</li>
              <li>• CSEC Preparation (Forms 1-6)</li>
              <li>• Homework Support</li>
              <li>• Study Skills Development</li>
              <li>• Exam Preparation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Our Values</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Faith-based education</li>
              <li>• Community support</li>
              <li>• Academic excellence</li>
              <li>• Personal development</li>
              <li>• Cultural awareness</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Learning Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• One-on-one tutoring</li>
              <li>• Group study sessions</li>
              <li>• Practice tests</li>
              <li>• Progress tracking</li>
              <li>• Parent consultations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}