'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, MapPin, Phone, Mail, User, BookOpen, GraduationCap, Users, FileText, Heart, Brain, Eye, Hand, AlertTriangle, CheckCircle } from 'lucide-react'

const TRINIDAD_SCHOOLS = [
  'Trinidad Boys\' R.C.',
  'Trinidad Girls\' R.C.',
  'St. Mary\'s R.C.',
  'St. Joseph\'s Convent',
  'Naparima College',
  'Naparima Girls\' College',
  'Queen\'s Royal College',
  'Bishop Anstey High School',
  'Holy Name Convent',
  'St. Augustine Girls\' High School',
  'St. George\'s College',
  'Presentation College',
  'San Juan Secondary',
  'Five Rivers Secondary',
  'Tunapuna Secondary',
  'Arima Secondary',
  'Couva Secondary',
  'Princes Town Secondary'
]

const CSEC_SUBJECTS = [
  'Mathematics',
  'English Language',
  'English Literature',
  'Spanish',
  'French',
  'Physics',
  'Chemistry',
  'Biology',
  'Information Technology',
  'Principles of Accounts',
  'Principles of Business',
  'Economics',
  'Geography',
  'History',
  'Social Studies',
  'Agricultural Science',
  'Technical Drawing',
  'Visual Arts',
  'Music',
  'Physical Education'
]

const PARISHES = [
  'Port of Spain',
  'San Fernando',
  'Arima',
  'Chaguanas',
  'Couva',
  'Point Fortin',
  'Tunapuna',
  'Siparia',
  'Rio Claro',
  'Mayaro',
  'Princes Town',
  'Diego Martin',
  'San Juan',
  'Tobago'
]

export default function ComprehensiveStudentRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    address: '',
    parish: '',
    phoneNumber: '',
    email: '',
    
    // Step 2: Educational Information
    educationLevel: '',
    currentSchool: '',
    currentGrade: '',
    previousSchool: '',
    previousGrade: '',
    
    // Step 3: Academic Performance
    subjects: [],
    strengths: '',
    weaknesses: '',
    learningStyle: '',
    studyHabits: '',
    
    // Step 4: CSEC Subjects
    csecSubjects: [] as string[],
    preferredCareer: '',
    careerGoals: '',
    
    // Step 5: Health Information
    medicalConditions: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    
    // Step 6: Family Background
    parentName: '',
    parentOccupation: '',
    parentPhone: '',
    parentEmail: '',
    parentEducation: '',
    householdIncome: '',
    siblings: '',
    
    // Step 7: Extracurricular Activities
    sports: '',
    clubs: '',
    hobbies: '',
    skills: '',
    volunteerWork: '',
    
    // Step 8: Additional Information
    transportation: '',
    financialAssistance: '',
    specialNeeds: '',
    additionalNotes: '',
    consent: false
  })

  const { toast } = useToast()

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Registration Successful',
          description: 'Student has been registered successfully!',
        })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          age: '',
          gender: '',
          address: '',
          parish: '',
          phoneNumber: '',
          email: '',
          educationLevel: '',
          currentSchool: '',
          currentGrade: '',
          previousSchool: '',
          previousGrade: '',
          subjects: [],
          strengths: '',
          weaknesses: '',
          learningStyle: '',
          studyHabits: '',
          csecSubjects: [],
          preferredCareer: '',
          careerGoals: '',
          medicalConditions: '',
          allergies: '',
          medications: '',
          emergencyContact: '',
          emergencyPhone: '',
          emergencyRelationship: '',
          parentName: '',
          parentOccupation: '',
          parentPhone: '',
          parentEmail: '',
          parentEducation: '',
          householdIncome: '',
          siblings: '',
          sports: '',
          clubs: '',
          hobbies: '',
          skills: '',
          volunteerWork: '',
          transportation: '',
          financialAssistance: '',
          specialNeeds: '',
          additionalNotes: '',
          consent: false
        })
        setCurrentStep(1)
      } else {
        throw new Error('Failed to register student')
      }
    } catch (error) {
      toast({
        title: 'Registration Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      })
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic demographic and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    placeholder="Enter age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parish">Parish *</Label>
                  <Select value={formData.parish} onValueChange={(value) => updateFormData('parish', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parish" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARISHES.map(parish => (
                        <SelectItem key={parish} value={parish}>{parish}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Information
              </CardTitle>
              <CardDescription>
                Current and previous educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level *</Label>
                <RadioGroup value={formData.educationLevel} onValueChange={(value) => updateFormData('educationLevel', value)}>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="primary" id="primary">
                      <Label htmlFor="primary">Primary School</Label>
                    </RadioGroupItem>
                    <RadioGroupItem value="secondary" id="secondary">
                      <Label htmlFor="secondary">Secondary School</Label>
                    </RadioGroupItem>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSchool">Current School *</Label>
                  <Select value={formData.currentSchool} onValueChange={(value) => updateFormData('currentSchool', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current school" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRINIDAD_SCHOOLS.map(school => (
                        <SelectItem key={school} value={school}>{school}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentGrade">Current Grade *</Label>
                  <Input
                    id="currentGrade"
                    value={formData.currentGrade}
                    onChange={(e) => updateFormData('currentGrade', e.target.value)}
                    placeholder="Enter current grade"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Previous School</Label>
                  <Input
                    id="previousSchool"
                    value={formData.previousSchool}
                    onChange={(e) => updateFormData('previousSchool', e.target.value)}
                    placeholder="Enter previous school"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousGrade">Previous Grade</Label>
                  <Input
                    id="previousGrade"
                    value={formData.previousGrade}
                    onChange={(e) => updateFormData('previousGrade', e.target.value)}
                    placeholder="Enter previous grade"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Academic Performance
              </CardTitle>
              <CardDescription>
                Academic strengths, areas for improvement, and learning preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subjects">Current Subjects *</Label>
                <Select value={formData.subjects[0]} onValueChange={(value) => updateFormData('subjects', [value])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {CSEC_SUBJECTS.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strengths">Academic Strengths</Label>
                <Textarea
                  id="strengths"
                  value={formData.strengths}
                  onChange={(e) => updateFormData('strengths', e.target.value)}
                  placeholder="Describe academic strengths"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weaknesses">Areas for Improvement</Label>
                <Textarea
                  id="weaknesses"
                  value={formData.weaknesses}
                  onChange={(e) => updateFormData('weaknesses', e.target.value)}
                  placeholder="Describe areas needing improvement"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learningStyle">Learning Style</Label>
                <Select value={formData.learningStyle} onValueChange={(value) => updateFormData('learningStyle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select learning style" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="auditory">Auditory</SelectItem>
                      <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                      <SelectItem value="reading">Reading/Writing</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyHabits">Study Habits</Label>
                <Textarea
                  id="studyHabits"
                  value={formData.studyHabits}
                  onChange={(e) => updateFormData('studyHabits', e.target.value)}
                  placeholder="Describe study habits and routines"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                CSEC Subjects & Career Goals
              </CardTitle>
              <CardDescription>
                CSEC subject selections and future career aspirations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>CSEC Subjects *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {CSEC_SUBJECTS.map(subject => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={subject}
                        checked={formData.csecSubjects.includes(subject)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('csecSubjects', [...formData.csecSubjects, subject])
                          } else {
                            updateFormData('csecSubjects', formData.csecSubjects.filter(s => s !== subject))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={subject} className="text-sm">{subject}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredCareer">Preferred Career Field</Label>
                <Input
                  id="preferredCareer"
                  value={formData.preferredCareer}
                  onChange={(e) => updateFormData('preferredCareer', e.target.value)}
                  placeholder="Enter preferred career field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) => updateFormData('careerGoals', e.target.value)}
                  placeholder="Describe long-term career goals"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Information
              </CardTitle>
              <CardDescription>
                Medical information and emergency contacts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => updateFormData('medicalConditions', e.target.value)}
                  placeholder="List any medical conditions"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => updateFormData('allergies', e.target.value)}
                  placeholder="List any known allergies"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => updateFormData('medications', e.target.value)}
                  placeholder="List any current medications"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                    placeholder="Enter emergency phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyRelationship">Relationship to Student</Label>
                <Select value={formData.emergencyRelationship} onValueChange={(value) => updateFormData('emergencyRelationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="grandparent">Grandparent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Family Background
              </CardTitle>
              <CardDescription>
                Parent/guardian information and household details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => updateFormData('parentName', e.target.value)}
                    placeholder="Enter parent or guardian name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentOccupation">Parent Occupation</Label>
                  <Input
                    id="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={(e) => updateFormData('parentOccupation', e.target.value)}
                    placeholder="Enter parent occupation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent Phone *</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => updateFormData('parentPhone', e.target.value)}
                    placeholder="Enter parent phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => updateFormData('parentEmail', e.target.value)}
                    placeholder="Enter parent email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentEducation">Parent Education Level</Label>
                  <Select value={formData.parentEducation} onValueChange={(value) => updateFormData('parentEducation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="tertiary">Tertiary</SelectItem>
                      <SelectItem value="vocational">Vocational</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="householdIncome">Household Income Range</Label>
                  <Select value={formData.householdIncome} onValueChange={(value) => updateFormData('householdIncome', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-3000">Under $3,000</SelectItem>
                      <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                      <SelectItem value="5000-8000">$5,000 - $8,000</SelectItem>
                      <SelectItem value="8000-12000">$8,000 - $12,000</SelectItem>
                      <SelectItem value="12000-20000">$12,000 - $20,000</SelectItem>
                      <SelectItem value="over-20000">Over $20,000</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siblings">Number of Siblings</Label>
                <Input
                  id="siblings"
                  type="number"
                  value={formData.siblings}
                  onChange={(e) => updateFormData('siblings', e.target.value)}
                  placeholder="Enter number of siblings"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand className="h-5 w-5" />
                Extracurricular Activities
              </CardTitle>
              <CardDescription>
                Sports, clubs, hobbies, and other activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sports">Sports</Label>
                <Textarea
                  id="sports"
                  value={formData.sports}
                  onChange={(e) => updateFormData('sports', e.target.value)}
                  placeholder="List sports and physical activities"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clubs">Clubs & Organizations</Label>
                <Textarea
                  id="clubs"
                  value={formData.clubs}
                  onChange={(e) => updateFormData('clubs', e.target.value)}
                  placeholder="List clubs and organizations"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobbies">Hobbies</Label>
                <Textarea
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => updateFormData('hobbies', e.target.value)}
                  placeholder="List hobbies and interests"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Special Skills</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => updateFormData('skills', e.target.value)}
                  placeholder="List special skills and talents"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volunteerWork">Volunteer Work</Label>
                <Textarea
                  id="volunteerWork"
                  value={formData.volunteerWork}
                  onChange={(e) => updateFormData('volunteerWork', e.target.value)}
                  placeholder="Describe volunteer work experience"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 8:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Transportation, financial assistance, and special requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transportation">Transportation Method</Label>
                <Select value={formData.transportation} onValueChange={(value) => updateFormData('transportation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walk">Walk</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="taxi">Taxi</SelectItem>
                    <SelectItem value="parent">Parent Drop-off</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="financialAssistance">Financial Assistance Needed</Label>
                <Select value={formData.financialAssistance} onValueChange={(value) => updateFormData('financialAssistance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assistance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="partial">Partial Assistance</SelectItem>
                    <SelectItem value="full">Full Assistance</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="government">Government Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialNeeds">Special Needs or Requirements</Label>
                <Textarea
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => updateFormData('specialNeeds', e.target.value)}
                  placeholder="Describe any special needs or requirements"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                  placeholder="Any additional information or concerns"
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => updateFormData('consent', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="consent">
                    I consent to the terms and conditions of the Faith Tabernacle Homework Center
                  </Label>
                </div>
                <p className="text-sm text-gray-600">
                  By checking this box, you agree to our policies and procedures regarding student participation, 
                  data privacy, and communication protocols.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Faith Tabernacle Homework Center
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Education Committee Initiative - Student Registration
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i + 1 === currentStep
                      ? 'bg-blue-600 text-white'
                      : i + 1 < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of 8
            </div>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 8 ? (
            <Button onClick={handleNext}>
              Next Step
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Submit Registration
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}