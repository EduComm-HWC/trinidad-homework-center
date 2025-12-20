'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { UserPlus, X } from 'lucide-react'

interface StudentRegistrationFormProps {
  onClose?: () => void
}

const PRIMARY_SCHOOLS = [
  'Trinidad Boys\' R.C.',
  'St. Mary\'s R.C.',
  'Arima Girls\' R.C.',
  'Diego Martin Girls\' R.C.',
  'St. Augustine Girls\' Primary',
  'Mucurapo Girls\' R.C.',
  'San Fernando Boys\' R.C.',
  'Tranquillity Government Primary',
]

const SECONDARY_SCHOOLS = [
  'Naparima College',
  'Holy Name Convent',
  'Bishop Anstey High School',
  'St. Joseph\'s Convent POS',
  'St. Mary\'s College',
  'Queen\'s Royal College',
  'Trinity College',
  'St. Augustine Girls\' High School',
  'Presentation College',
  'Fatima College',
]

const CSEC_SUBJECTS = [
  'Mathematics',
  'English Language',
  'Chemistry',
  'Physics',
  'Biology',
  'Spanish',
  'French',
  'Principles of Accounts',
  'Principles of Business',
  'Information Technology',
  'Social Studies',
  'Geography',
  'History',
  'Technical Drawing',
]

export default function StudentRegistrationForm({ onClose }: StudentRegistrationFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    educationLevel: '',
    school: '',
    grade: '',
    subjects: [] as string[],
    csecSubjects: [] as string[],
    careerGoals: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    emergencyContact: '',
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Calculate age from date of birth
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age,
        }),
      })

      if (!response.ok) throw new Error('Failed to register student')

      toast({
        title: 'Success!',
        description: 'Student registered successfully.',
      })

      if (onClose) onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register student. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const schools = formData.educationLevel === 'primary' ? PRIMARY_SCHOOLS : SECONDARY_SCHOOLS

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-green-600" />
            <div>
              <CardTitle>Student Registration</CardTitle>
              <CardDescription>Register a new student in the homework centre</CardDescription>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Education Level</Label>
                <RadioGroup
                  value={formData.educationLevel}
                  onValueChange={(value) => handleInputChange('educationLevel', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="primary" id="primary" />
                    <Label htmlFor="primary">Primary School (Standards 1-5)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="secondary" id="secondary" />
                    <Label htmlFor="secondary">Secondary School (Forms 1-6)</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.educationLevel && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="school">School</Label>
                    <Select value={formData.school} onValueChange={(value) => handleInputChange('school', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school" />
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map((school) => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">
                      {formData.educationLevel === 'primary' ? 'Standard' : 'Form'}
                    </Label>
                    <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${formData.educationLevel === 'primary' ? 'standard' : 'form'}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.educationLevel === 'primary' ? (
                          <>
                            <SelectItem value="Standard 1">Standard 1 (Ages 5-6)</SelectItem>
                            <SelectItem value="Standard 2">Standard 2 (Ages 6-7)</SelectItem>
                            <SelectItem value="Standard 3">Standard 3 (Ages 7-8)</SelectItem>
                            <SelectItem value="Standard 4">Standard 4 (Ages 8-9)</SelectItem>
                            <SelectItem value="Standard 5">Standard 5 (Ages 9-10)</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Form 1">Form 1 (Ages 11-12)</SelectItem>
                            <SelectItem value="Form 2">Form 2 (Ages 12-13)</SelectItem>
                            <SelectItem value="Form 3">Form 3 (Ages 13-14)</SelectItem>
                            <SelectItem value="Form 4">Form 4 (Ages 14-15)</SelectItem>
                            <SelectItem value="Form 5">Form 5 (Ages 15-16)</SelectItem>
                            <SelectItem value="Form 6">Form 6 (Ages 16-18)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Academic Information</h3>
              
              {formData.educationLevel === 'secondary' && (
                <div className="space-y-2">
                  <Label>CSEC Subjects (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                    {CSEC_SUBJECTS.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.csecSubjects.includes(subject)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('csecSubjects', [...formData.csecSubjects, subject])
                            } else {
                              handleInputChange('csecSubjects', formData.csecSubjects.filter(s => s !== subject))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals/Interests</Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                  placeholder="What career or field is the student interested in?"
                />
              </div>
            </div>
          )}

          {/* Step 3: Parent/Guardian Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Phone Number</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Email Address</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Name and phone number"
                  required
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="ml-auto bg-green-600 hover:bg-green-700"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="ml-auto bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </Button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full ${
                  step === currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
