"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Users, Heart, Book, Brain, Clock, MapPin, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import {
  TRINIDAD_PARISHES,
  LOCAL_SCHOOLS,
  BREAKFAST_OPTIONS,
  BEHAVIOR_PATTERNS,
  INTERESTS,
  LEARNING_DIFFICULTIES,
  MEDICAL_CONDITIONS,
  ALLERGY_TYPES,
  LIVING_ARRANGEMENTS,
  GUARDIAN_RELATIONSHIPS,
  SCREEN_TIME_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  BEDTIME_OPTIONS,
  CSEC_SUBJECTS
} from "@/lib/constants"

interface ChildRegistrationData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  nationality: string
  parish: string
  address: string
  phone: string
  email: string
  
  // Family Information
  livingArrangement: string
  guardians: Array<{
    name: string
    relationship: string
    phone: string
    email: string
    occupation: string
  }>
  siblings: Array<{
    name: string
    age: number
    school: string
  }>
  
  // Emergency Information
  emergencyContact: string
  emergencyPhone: string
  emergencyRelation: string
  
  // Health Information
  medicalConditions: string[]
  allergies: string[]
  medicalNotes: string
  
  // Educational Background
  previousSchool: string
  specialEducation: boolean
  specialNeeds: string[]
  currentGrade: string
  favoriteSubjects: string[]
  challengingSubjects: string[]
  
  // Social & Behavioral
  behaviorPatterns: string[]
  interests: string[]
  strengths: string[]
  challenges: string[]
  socialSkills: string
  
  // Daily Routine
  breakfast: string
  bedtime: string
  screenTime: string
  physicalActivity: string
  studyHabits: string
  
  // Consent
  photoConsent: boolean
  medicalConsent: boolean
  assessmentConsent: boolean
  dataProcessingConsent: boolean
  guardianName: string
  guardianSignature: string
  consentDate: string
}

export function ChildRegistrationForm() {
  const [currentTab, setCurrentTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ChildRegistrationData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Trinidad & Tobago",
    parish: "",
    address: "",
    phone: "",
    email: "",
    livingArrangement: "",
    guardians: [{ name: "", relationship: "", phone: "", email: "", occupation: "" }],
    siblings: [],
    emergencyContact: "",
    emergencyPhone: "",
    emergencyRelation: "",
    medicalConditions: [],
    allergies: [],
    medicalNotes: "",
    previousSchool: "",
    specialEducation: false,
    specialNeeds: [],
    currentGrade: "",
    favoriteSubjects: [],
    challengingSubjects: [],
    behaviorPatterns: [],
    interests: [],
    strengths: [],
    challenges: [],
    socialSkills: "",
    breakfast: "",
    bedtime: "",
    screenTime: "",
    physicalActivity: "",
    studyHabits: "",
    photoConsent: false,
    medicalConsent: false,
    assessmentConsent: false,
    dataProcessingConsent: false,
    guardianName: "",
    guardianSignature: "",
    consentDate: new Date().toISOString().split('T')[0]
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof ChildRegistrationData] as string[]), value]
        : (prev[field as keyof ChildRegistrationData] as string[]).filter(item => item !== value)
    }))
  }

  const addGuardian = () => {
    setFormData(prev => ({
      ...prev,
      guardians: [...prev.guardians, { name: "", relationship: "", phone: "", email: "", occupation: "" }]
    }))
  }

  const updateGuardian = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      guardians: prev.guardians.map((guardian, i) => 
        i === index ? { ...guardian, [field]: value } : guardian
      )
    }))
  }

  const removeGuardian = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guardians: prev.guardians.filter((_, i) => i !== index)
    }))
  }

  const addSibling = () => {
    setFormData(prev => ({
      ...prev,
      siblings: [...prev.siblings, { name: "", age: 0, school: "" }]
    }))
  }

  const updateSibling = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      siblings: prev.siblings.map((sibling, i) => 
        i === index ? { ...sibling, [field]: value } : sibling
      )
    }))
  }

  const removeSibling = (index: number) => {
    setFormData(prev => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index)
    }))
  }

  const validateCurrentTab = () => {
    switch (currentTab) {
      case "personal":
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.gender && formData.parish
      case "family":
        return formData.livingArrangement && formData.guardians.some(g => g.name && g.phone) && 
               formData.emergencyContact && formData.emergencyPhone
      case "health":
        return true // Health is optional
      case "education":
        return formData.previousSchool && formData.currentGrade
      case "social":
        return true // Social is optional but recommended
      case "routine":
        return formData.breakfast && formData.bedtime
      case "consent":
        return formData.guardianName && formData.guardianSignature && 
               formData.photoConsent && formData.medicalConsent && formData.assessmentConsent
      default:
        return true
    }
  }

  const nextTab = () => {
    if (validateCurrentTab()) {
      const tabs = ["personal", "family", "health", "education", "social", "routine", "consent"]
      const currentIndex = tabs.indexOf(currentTab)
      if (currentIndex < tabs.length - 1) {
        setCurrentTab(tabs[currentIndex + 1])
      }
    } else {
      toast.error("Please fill in all required fields before proceeding.")
    }
  }

  const prevTab = () => {
    const tabs = ["personal", "family", "health", "education", "social", "routine", "consent"]
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentTab()) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Child registration completed successfully!")
        // Reset form or redirect
      } else {
        throw new Error('Failed to submit registration')
      }
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: Users },
    { id: "family", label: "Family", icon: Heart },
    { id: "health", label: "Health", icon: FileText },
    { id: "education", label: "Education", icon: Book },
    { id: "social", label: "Social", icon: Brain },
    { id: "routine", label: "Daily Routine", icon: Clock },
    { id: "consent", label: "Consent", icon: CheckCircle },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Child Registration Form - First Day Intake
          </CardTitle>
          <CardDescription>
            Comprehensive registration for Trinidad & Tobago Homework Center students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex flex-col gap-1 p-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData("gender", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="OTHER" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => updateFormData("nationality", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parish">Parish *</Label>
                  <Select value={formData.parish} onValueChange={(value) => updateFormData("parish", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parish" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRINIDAD_PARISHES.map((parish) => (
                        <SelectItem key={parish} value={parish}>
                          {parish}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="Enter full address"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="868-XXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="student@email.com"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Family Information Tab */}
            <TabsContent value="family" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Living Arrangement *</Label>
                  <Select value={formData.livingArrangement} onValueChange={(value) => updateFormData("livingArrangement", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select living arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Both parents">Both parents</SelectItem>
                      <SelectItem value="Single mother">Single mother</SelectItem>
                      <SelectItem value="Single father">Single father</SelectItem>
                      <SelectItem value="Guardian">Guardian (grandparent, aunt/uncle)</SelectItem>
                      <SelectItem value="Foster care">Foster care</SelectItem>
                      <SelectItem value="Group home">Group home</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Guardians Information *</Label>
                    <Button onClick={addGuardian} variant="outline" size="sm">
                      Add Guardian
                    </Button>
                  </div>
                  
                  {formData.guardians.map((guardian, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Guardian Name *</Label>
                          <Input
                            value={guardian.name}
                            onChange={(e) => updateGuardian(index, "name", e.target.value)}
                            placeholder="Full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Relationship *</Label>
                          <Select value={guardian.relationship} onValueChange={(value) => updateGuardian(index, "relationship", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              {GUARDIAN_RELATIONSHIPS.map((rel) => (
                                <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Phone *</Label>
                          <Input
                            type="tel"
                            value={guardian.phone}
                            onChange={(e) => updateGuardian(index, "phone", e.target.value)}
                            placeholder="868-XXX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={guardian.email}
                            onChange={(e) => updateGuardian(index, "email", e.target.value)}
                            placeholder="guardian@email.com"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Occupation</Label>
                          <Input
                            value={guardian.occupation}
                            onChange={(e) => updateGuardian(index, "occupation", e.target.value)}
                            placeholder="Job title/occupation"
                          />
                        </div>
                      </div>
                      {formData.guardians.length > 1 && (
                        <Button
                          onClick={() => removeGuardian(index)}
                          variant="destructive"
                          size="sm"
                          className="mt-2"
                        >
                          Remove Guardian
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Siblings</Label>
                    <Button onClick={addSibling} variant="outline" size="sm">
                      Add Sibling
                    </Button>
                  </div>
                  
                  {formData.siblings.map((sibling, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={sibling.name}
                            onChange={(e) => updateSibling(index, "name", e.target.value)}
                            placeholder="Sibling name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Age</Label>
                          <Input
                            type="number"
                            value={sibling.age || ""}
                            onChange={(e) => updateSibling(index, "age", parseInt(e.target.value) || 0)}
                            placeholder="Age"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>School</Label>
                          <Input
                            value={sibling.school}
                            onChange={(e) => updateSibling(index, "school", e.target.value)}
                            placeholder="School name"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => removeSibling(index)}
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                      >
                        Remove Sibling
                      </Button>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Emergency Contact *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Contact Name *</Label>
                      <Input
                        value={formData.emergencyContact}
                        onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                        placeholder="Emergency contact name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                        placeholder="868-XXX-XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Select value={formData.emergencyRelation} onValueChange={(value) => updateFormData("emergencyRelation", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {GUARDIAN_RELATIONSHIPS.map((rel) => (
                            <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Health Information Tab */}
            <TabsContent value="health" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Medical Conditions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MEDICAL_CONDITIONS.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={`condition-${condition}`}
                          checked={formData.medicalConditions.includes(condition)}
                          onCheckedChange={(checked) => updateArrayField("medicalConditions", condition, checked as boolean)}
                        />
                        <Label htmlFor={`condition-${condition}`} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Allergies</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ALLERGY_TYPES.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={`allergy-${allergy}`}
                          checked={formData.allergies.includes(allergy)}
                          onCheckedChange={(checked) => updateArrayField("allergies", allergy, checked as boolean)}
                        />
                        <Label htmlFor={`allergy-${allergy}`} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalNotes">Additional Medical Information</Label>
                  <Textarea
                    id="medicalNotes"
                    value={formData.medicalNotes}
                    onChange={(e) => updateFormData("medicalNotes", e.target.value)}
                    placeholder="Please provide any additional medical information that would be important for us to know..."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Educational Background Tab */}
            <TabsContent value="education" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Previous School *</Label>
                    <Select value={formData.previousSchool} onValueChange={(value) => updateFormData("previousSchool", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select previous school" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCAL_SCHOOLS.map((school) => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Homeschooled">Homeschooled</SelectItem>
                        <SelectItem value="New to school">New to school</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentGrade">Current Grade *</Label>
                    <Select value={formData.currentGrade} onValueChange={(value) => updateFormData("currentGrade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                        <SelectItem value="Grade 1">Grade 1</SelectItem>
                        <SelectItem value="Grade 2">Grade 2</SelectItem>
                        <SelectItem value="Grade 3">Grade 3</SelectItem>
                        <SelectItem value="Grade 4">Grade 4</SelectItem>
                        <SelectItem value="Grade 5">Grade 5</SelectItem>
                        <SelectItem value="Grade 6">Grade 6</SelectItem>
                        <SelectItem value="Form 1">Form 1</SelectItem>
                        <SelectItem value="Form 2">Form 2</SelectItem>
                        <SelectItem value="Form 3">Form 3</SelectItem>
                        <SelectItem value="Form 4">Form 4</SelectItem>
                        <SelectItem value="Form 5">Form 5</SelectItem>
                        <SelectItem value="Form 6">Form 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="specialEducation"
                      checked={formData.specialEducation}
                      onCheckedChange={(checked) => updateFormData("specialEducation", checked as boolean)}
                    />
                    <Label htmlFor="specialEducation">Has the student received special education services?</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Learning Difficulties / Special Needs</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {LEARNING_DIFFICULTIES.map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty}`}
                          checked={formData.specialNeeds.includes(difficulty)}
                          onCheckedChange={(checked) => updateArrayField("specialNeeds", difficulty, checked as boolean)}
                        />
                        <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                          {difficulty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Favorite Subjects</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {CSEC_SUBJECTS.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`favorite-${subject}`}
                            checked={formData.favoriteSubjects.includes(subject)}
                            onCheckedChange={(checked) => updateArrayField("favoriteSubjects", subject, checked as boolean)}
                          />
                          <Label htmlFor={`favorite-${subject}`} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Challenging Subjects</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {CSEC_SUBJECTS.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`challenging-${subject}`}
                            checked={formData.challengingSubjects.includes(subject)}
                            onCheckedChange={(checked) => updateArrayField("challengingSubjects", subject, checked as boolean)}
                          />
                          <Label htmlFor={`challenging-${subject}`} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Social & Behavioral Tab */}
            <TabsContent value="social" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Behavior Patterns (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {BEHAVIOR_PATTERNS.map((pattern) => (
                      <div key={pattern} className="flex items-center space-x-2">
                        <Checkbox
                          id={`behavior-${pattern}`}
                          checked={formData.behaviorPatterns.includes(pattern)}
                          onCheckedChange={(checked) => updateArrayField("behaviorPatterns", pattern, checked as boolean)}
                        />
                        <Label htmlFor={`behavior-${pattern}`} className="text-sm">
                          {pattern}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Interests & Hobbies (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {INTERESTS.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => updateArrayField("interests", interest, checked as boolean)}
                        />
                        <Label htmlFor={`interest-${interest}`} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Strengths</Label>
                    <Textarea
                      value={formData.strengths.join('\n')}
                      onChange={(e) => updateFormData("strengths", e.target.value.split('\n').filter(s => s.trim()))}
                      placeholder="Enter each strength on a new line..."
                      rows={6}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Challenges</Label>
                    <Textarea
                      value={formData.challenges.join('\n')}
                      onChange={(e) => updateFormData("challenges", e.target.value.split('\n').filter(s => s.trim()))}
                      placeholder="Enter each challenge on a new line..."
                      rows={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialSkills">Social Skills Development</Label>
                  <Textarea
                    id="socialSkills"
                    value={formData.socialSkills}
                    onChange={(e) => updateFormData("socialSkills", e.target.value)}
                    placeholder="Describe the student's social skills, ability to make friends, work in groups, etc."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Daily Routine Tab */}
            <TabsContent value="routine" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Typical Breakfast *</Label>
                    <Select value={formData.breakfast} onValueChange={(value) => updateFormData("breakfast", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select typical breakfast" />
                      </SelectTrigger>
                      <SelectContent>
                        {BREAKFAST_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Typical Bedtime *</Label>
                    <Select value={formData.bedtime} onValueChange={(value) => updateFormData("bedtime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select typical bedtime" />
                      </SelectTrigger>
                      <SelectContent>
                        {BEDTIME_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Screen Time</Label>
                    <Select value={formData.screenTime} onValueChange={(value) => updateFormData("screenTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select screen time" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCREEN_TIME_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Physical Activity</Label>
                    <Select value={formData.physicalActivity} onValueChange={(value) => updateFormData("physicalActivity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select physical activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {PHYSICAL_ACTIVITY_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studyHabits">Study Habits & Homework Routine</Label>
                  <Textarea
                    id="studyHabits"
                    value={formData.studyHabits}
                    onChange={(e) => updateFormData("studyHabits", e.target.value)}
                    placeholder="Describe the student's study habits, homework routine, preferred study environment, etc."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Consent Tab */}
            <TabsContent value="consent" className="space-y-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Consent for Treatment and Services</CardTitle>
                    <CardDescription>
                      Please review and provide consent for the following items
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="photoConsent"
                          checked={formData.photoConsent}
                          onCheckedChange={(checked) => updateFormData("photoConsent", checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="photoConsent" className="font-medium">
                            Photo/Video Consent *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I consent to have my child photographed or videotaped for educational purposes, 
                            promotional materials, and social media of the Trinidad & Tobago Homework Center.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="medicalConsent"
                          checked={formData.medicalConsent}
                          onCheckedChange={(checked) => updateFormData("medicalConsent", checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="medicalConsent" className="font-medium">
                            Medical Emergency Consent *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            In the event of a medical emergency, I authorize the staff of the Homework Center 
                            to seek emergency medical treatment for my child.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="assessmentConsent"
                          checked={formData.assessmentConsent}
                          onCheckedChange={(checked) => updateFormData("assessmentConsent", checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="assessmentConsent" className="font-medium">
                            Assessment Consent *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I consent to have my child participate in academic, behavioral, and developmental 
                            assessments to help create appropriate learning plans.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="dataProcessingConsent"
                          checked={formData.dataProcessingConsent}
                          onCheckedChange={(checked) => updateFormData("dataProcessingConsent", checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="dataProcessingConsent" className="font-medium">
                            Data Processing Consent
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I consent to the collection and processing of my child's personal information 
                            for educational and administrative purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guardian Declaration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="guardianName">Guardian Full Name *</Label>
                        <Input
                          id="guardianName"
                          value={formData.guardianName}
                          onChange={(e) => updateFormData("guardianName", e.target.value)}
                          placeholder="Enter full legal name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guardianSignature">Electronic Signature *</Label>
                        <Input
                          id="guardianSignature"
                          value={formData.guardianSignature}
                          onChange={(e) => updateFormData("guardianSignature", e.target.value)}
                          placeholder="Type your full name as signature"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consentDate">Date *</Label>
                        <Input
                          id="consentDate"
                          type="date"
                          value={formData.consentDate}
                          onChange={(e) => updateFormData("consentDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        By signing this form, I declare that the information provided is true and accurate 
                        to the best of my knowledge. I understand that this information will be used to 
                        provide appropriate educational support for my child.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevTab}
              disabled={currentTab === "personal"}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`w-2 h-2 rounded-full ${
                    currentTab === tab.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentTab === "consent" ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            ) : (
              <Button onClick={nextTab}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}