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
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Brain, 
  Heart, 
  Activity, 
  Users, 
  Lightbulb, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText
} from "lucide-react"
import { toast } from "sonner"
import {
  CSEC_SUBJECTS,
  ASSESSMENT_SCALES,
  STRESS_INDICATORS,
  SUPPORT_NEEDS,
  CSEC_FOCUS_AREAS
} from "@/lib/constants"

interface SessionAssessmentData {
  // Session Information
  sessionId: string
  studentId: string
  tutorId: string
  sessionDate: string
  subject: string
  sessionType: string
  duration: number
  
  // Academic Assessment
  preparationScore: number
  homeworkScore: number
  participationScore: number
  understandingScore: number
  topicsCovered: string[]
  homeworkTopics: string[]
  materialsUsed: string[]
  learningObjectives: string[]
  
  // Behavioral Assessment
  behaviorScore: number
  focusScore: number
  cooperationScore: number
  attitudeScore: number
  peerInteractionScore: number
  
  // Emotional Assessment
  emotionalStateScore: number
  confidenceScore: number
  motivationScore: number
  stressIndicators: string[]
  
  // Physical Assessment
  energyLevelScore: number
  wellbeingScore: number
  nutritionScore: number
  
  // Social Assessment
  communicationScore: number
  teamworkScore: number
  conflictResolutionScore: number
  
  // Cognitive Assessment
  problemSolvingScore: number
  criticalThinkingScore: number
  creativityScore: number
  memoryScore: number
  
  // Support Needs
  immediateSupport: string[]
  resourcesNeeded: string[]
  familyInvolvement: string[]
  
  // Overall Assessment
  goals: string[]
  achievements: string[]
  concerns: string[]
  tutorNotes: string
  recommendations: string
  followUpActions: string[]
  nextSessionFocus: string
  
  // Calculated Fields
  overallScore: number
  riskLevel: string
}

export function SessionAssessmentForm() {
  const [currentTab, setCurrentTab] = useState("academic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<SessionAssessmentData>({
    sessionId: "",
    studentId: "",
    tutorId: "",
    sessionDate: new Date().toISOString().split('T')[0],
    subject: "",
    sessionType: "HOMEWORK",
    duration: 60,
    
    // Academic Assessment
    preparationScore: 3,
    homeworkScore: 3,
    participationScore: 3,
    understandingScore: 3,
    topicsCovered: [],
    homeworkTopics: [],
    materialsUsed: [],
    learningObjectives: [],
    
    // Behavioral Assessment
    behaviorScore: 3,
    focusScore: 3,
    cooperationScore: 3,
    attitudeScore: 3,
    peerInteractionScore: 3,
    
    // Emotional Assessment
    emotionalStateScore: 3,
    confidenceScore: 3,
    motivationScore: 3,
    stressIndicators: [],
    
    // Physical Assessment
    energyLevelScore: 3,
    wellbeingScore: 3,
    nutritionScore: 3,
    
    // Social Assessment
    communicationScore: 3,
    teamworkScore: 3,
    conflictResolutionScore: 3,
    
    // Cognitive Assessment
    problemSolvingScore: 3,
    criticalThinkingScore: 3,
    creativityScore: 3,
    memoryScore: 3,
    
    // Support Needs
    immediateSupport: [],
    resourcesNeeded: [],
    familyInvolvement: [],
    
    // Overall Assessment
    goals: [],
    achievements: [],
    concerns: [],
    tutorNotes: "",
    recommendations: "",
    followUpActions: [],
    nextSessionFocus: "",
    
    // Calculated Fields
    overallScore: 0,
    riskLevel: "LOW"
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      // Calculate overall score whenever scores change
      if (field.includes('Score')) {
        const scores = [
          newData.preparationScore,
          newData.homeworkScore,
          newData.participationScore,
          newData.understandingScore,
          newData.behaviorScore,
          newData.focusScore,
          newData.cooperationScore,
          newData.attitudeScore,
          newData.peerInteractionScore,
          newData.emotionalStateScore,
          newData.confidenceScore,
          newData.motivationScore,
          newData.energyLevelScore,
          newData.wellbeingScore,
          newData.nutritionScore,
          newData.communicationScore,
          newData.teamworkScore,
          newData.conflictResolutionScore,
          newData.problemSolvingScore,
          newData.criticalThinkingScore,
          newData.creativityScore,
          newData.memoryScore
        ].filter(score => score > 0)
        
        const overallScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
        newData.overallScore = Math.round(overallScore * 10) / 10
        
        // Determine risk level
        if (overallScore >= 4) {
          newData.riskLevel = "LOW"
        } else if (overallScore >= 3) {
          newData.riskLevel = "MEDIUM"
        } else if (overallScore >= 2) {
          newData.riskLevel = "HIGH"
        } else {
          newData.riskLevel = "CRITICAL"
        }
      }
      return newData
    })
  }

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof SessionAssessmentData] as string[]), value]
        : (prev[field as keyof SessionAssessmentData] as string[]).filter(item => item !== value)
    }))
  }

  const addArrayItem = (field: string, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof SessionAssessmentData] as string[]), value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof SessionAssessmentData] as string[]).filter((_, i) => i !== index)
    }))
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600"
    if (score >= 3) return "text-yellow-600"
    if (score >= 2) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "Excellent"
    if (score >= 3) return "Good"
    if (score >= 2) return "Needs Improvement"
    return "Critical"
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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Session assessment completed successfully!")
        // Reset form or redirect
      } else {
        throw new Error('Failed to submit assessment')
      }
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "behavioral", label: "Behavioral", icon: Users },
    { id: "emotional", label: "Emotional", icon: Heart },
    { id: "physical", label: "Physical", icon: Activity },
    { id: "social", label: "Social", icon: Users },
    { id: "cognitive", label: "Cognitive", icon: Brain },
    { id: "support", label: "Support", icon: Target },
    { id: "overall", label: "Overall", icon: FileText },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Comprehensive Session Assessment
              </CardTitle>
              <CardDescription>
                Holistic assessment of student progress across multiple development areas
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Overall Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(formData.overallScore)}`}>
                  {formData.overallScore.toFixed(1)}
                </span>
              </div>
              <Badge className={getRiskLevelColor(formData.riskLevel)}>
                {formData.riskLevel} Risk
              </Badge>
            </div>
          </div>
          <Progress value={(formData.overallScore / 5) * 100} className="w-full" />
        </CardHeader>
      </Card>

      {/* Session Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Session Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.sessionDate}
                onChange={(e) => updateFormData("sessionDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => updateFormData("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {CSEC_SUBJECTS.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Session Type</Label>
              <Select value={formData.sessionType} onValueChange={(value) => updateFormData("sessionType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOMEWORK">Homework Help</SelectItem>
                  <SelectItem value="TUTORING">Tutoring</SelectItem>
                  <SelectItem value="ASSESSMENT">Assessment</SelectItem>
                  <SelectItem value="CSEC_PREP">CSEC Preparation</SelectItem>
                  <SelectItem value="REMEDIAL">Remedial Work</SelectItem>
                  <SelectItem value="ENRICHMENT">Enrichment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => updateFormData("duration", parseInt(e.target.value) || 60)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
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

            {/* Academic Assessment */}
            <TabsContent value="academic" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { field: "preparationScore", label: "Preparation", icon: BookOpen },
                    { field: "homeworkScore", label: "Homework Completion", icon: FileText },
                    { field: "participationScore", label: "Participation", icon: Users },
                    { field: "understandingScore", label: "Understanding", icon: Lightbulb }
                  ].map(({ field, label, icon: Icon }) => (
                    <Card key={field} className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5" />
                        <Label className="font-medium">{label}</Label>
                        <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                          {formData[field as keyof SessionAssessmentData] as number}/5
                        </span>
                      </div>
                      <RadioGroup
                        value={formData[field as keyof SessionAssessmentData]?.toString()}
                        onValueChange={(value) => updateFormData(field, parseInt(value))}
                      >
                        {[1, 2, 3, 4, 5].map((score) => (
                          <div key={score} className="flex items-center space-x-2">
                            <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                            <Label htmlFor={`${field}-${score}`} className="text-sm">
                              {score} - {ASSESSMENT_SCALES.BEHAVIOR[score as keyof typeof ASSESSMENT_SCALES.BEHAVIOR]}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Topics Covered</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add topic covered"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem("topicsCovered", e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = e.currentTarget.parentElement?.querySelector('input')
                          if (input) {
                            addArrayItem("topicsCovered", input.value)
                            input.value = ''
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.topicsCovered.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem("topicsCovered", index)}>
                          {topic} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Homework Topics</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add homework topic"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addArrayItem("homeworkTopics", e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = e.currentTarget.parentElement?.querySelector('input')
                          if (input) {
                            addArrayItem("homeworkTopics", input.value)
                            input.value = ''
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.homeworkTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem("homeworkTopics", index)}>
                          {topic} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Behavioral Assessment */}
            <TabsContent value="behavioral" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: "behaviorScore", label: "Overall Behavior", icon: Users },
                  { field: "focusScore", label: "Focus & Attention", icon: Target },
                  { field: "cooperationScore", label: "Cooperation", icon: Users },
                  { field: "attitudeScore", label: "Attitude", icon: Heart },
                  { field: "peerInteractionScore", label: "Peer Interaction", icon: Users }
                ].map(({ field, label, icon: Icon }) => (
                  <Card key={field} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <Label className="font-medium">{label}</Label>
                      <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                        {formData[field as keyof SessionAssessmentData] as number}/5
                      </span>
                    </div>
                    <RadioGroup
                      value={formData[field as keyof SessionAssessmentData]?.toString()}
                      onValueChange={(value) => updateFormData(field, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="flex items-center space-x-2">
                          <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                          <Label htmlFor={`${field}-${score}`} className="text-sm">
                            {score} - {ASSESSMENT_SCALES.BEHAVIOR[score as keyof typeof ASSESSMENT_SCALES.BEHAVIOR]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Emotional Assessment */}
            <TabsContent value="emotional" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: "emotionalStateScore", label: "Emotional State", icon: Heart },
                  { field: "confidenceScore", label: "Confidence Level", icon: TrendingUp },
                  { field: "motivationScore", label: "Motivation", icon: Target }
                ].map(({ field, label, icon: Icon }) => (
                  <Card key={field} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <Label className="font-medium">{label}</Label>
                      <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                        {formData[field as keyof SessionAssessmentData] as number}/5
                      </span>
                    </div>
                    <RadioGroup
                      value={formData[field as keyof SessionAssessmentData]?.toString()}
                      onValueChange={(value) => updateFormData(field, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="flex items-center space-x-2">
                          <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                          <Label htmlFor={`${field}-${score}`} className="text-sm">
                            {score} - {ASSESSMENT_SCALES.CONFIDENCE[score as keyof typeof ASSESSMENT_SCALES.CONFIDENCE]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Stress Indicators Observed</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {STRESS_INDICATORS.map((indicator) => (
                    <div key={indicator} className="flex items-center space-x-2">
                      <Checkbox
                        id={`stress-${indicator}`}
                        checked={formData.stressIndicators.includes(indicator)}
                        onCheckedChange={(checked) => updateArrayField("stressIndicators", indicator, checked as boolean)}
                      />
                      <Label htmlFor={`stress-${indicator}`} className="text-sm">
                        {indicator}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Physical Assessment */}
            <TabsContent value="physical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: "energyLevelScore", label: "Energy Level", icon: Activity },
                  { field: "wellbeingScore", label: "Overall Wellbeing", icon: Heart },
                  { field: "nutritionScore", label: "Nutrition Status", icon: Activity }
                ].map(({ field, label, icon: Icon }) => (
                  <Card key={field} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <Label className="font-medium">{label}</Label>
                      <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                        {formData[field as keyof SessionAssessmentData] as number}/5
                      </span>
                    </div>
                    <RadioGroup
                      value={formData[field as keyof SessionAssessmentData]?.toString()}
                      onValueChange={(value) => updateFormData(field, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="flex items-center space-x-2">
                          <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                          <Label htmlFor={`${field}-${score}`} className="text-sm">
                            {score} - {ASSESSMENT_SCALES.BEHAVIOR[score as keyof typeof ASSESSMENT_SCALES.BEHAVIOR]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Social Assessment */}
            <TabsContent value="social" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: "communicationScore", label: "Communication Skills", icon: Users },
                  { field: "teamworkScore", label: "Teamwork", icon: Users },
                  { field: "conflictResolutionScore", label: "Conflict Resolution", icon: Heart }
                ].map(({ field, label, icon: Icon }) => (
                  <Card key={field} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <Label className="font-medium">{label}</Label>
                      <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                        {formData[field as keyof SessionAssessmentData] as number}/5
                      </span>
                    </div>
                    <RadioGroup
                      value={formData[field as keyof SessionAssessmentData]?.toString()}
                      onValueChange={(value) => updateFormData(field, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="flex items-center space-x-2">
                          <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                          <Label htmlFor={`${field}-${score}`} className="text-sm">
                            {score} - {ASSESSMENT_SCALES.PARTICIPATION[score as keyof typeof ASSESSMENT_SCALES.PARTICIPATION]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cognitive Assessment */}
            <TabsContent value="cognitive" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: "problemSolvingScore", label: "Problem Solving", icon: Brain },
                  { field: "criticalThinkingScore", label: "Critical Thinking", icon: Brain },
                  { field: "creativityScore", label: "Creativity", icon: Lightbulb },
                  { field: "memoryScore", label: "Memory & Recall", icon: Brain }
                ].map(({ field, label, icon: Icon }) => (
                  <Card key={field} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5" />
                      <Label className="font-medium">{label}</Label>
                      <span className={`ml-auto font-bold ${getScoreColor(formData[field as keyof SessionAssessmentData] as number)}`}>
                        {formData[field as keyof SessionAssessmentData] as number}/5
                      </span>
                    </div>
                    <RadioGroup
                      value={formData[field as keyof SessionAssessmentData]?.toString()}
                      onValueChange={(value) => updateFormData(field, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((score) => (
                        <div key={score} className="flex items-center space-x-2">
                          <RadioGroupItem value={score.toString()} id={`${field}-${score}`} />
                          <Label htmlFor={`${field}-${score}`} className="text-sm">
                            {score} - {ASSESSMENT_SCALES.UNDERSTANDING[score as keyof typeof ASSESSMENT_SCALES.UNDERSTANDING]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Support Needs */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Immediate Support Needed</Label>
                  <div className="space-y-2">
                    {SUPPORT_NEEDS.map((need) => (
                      <div key={need} className="flex items-center space-x-2">
                        <Checkbox
                          id={`support-${need}`}
                          checked={formData.immediateSupport.includes(need)}
                          onCheckedChange={(checked) => updateArrayField("immediateSupport", need, checked as boolean)}
                        />
                        <Label htmlFor={`support-${need}`} className="text-sm">
                          {need}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Resources Needed</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add resource needed"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addArrayItem("resourcesNeeded", e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input')
                        if (input) {
                          addArrayItem("resourcesNeeded", input.value)
                          input.value = ''
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.resourcesNeeded.map((resource, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem("resourcesNeeded", index)}>
                        {resource} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Family Involvement</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add family involvement need"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addArrayItem("familyInvolvement", e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input')
                        if (input) {
                          addArrayItem("familyInvolvement", input.value)
                          input.value = ''
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.familyInvolvement.map((item, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem("familyInvolvement", index)}>
                        {item} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Overall Assessment */}
            <TabsContent value="overall" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Goals Achieved</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add goal achieved"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addArrayItem("achievements", e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input')
                        if (input) {
                          addArrayItem("achievements", input.value)
                          input.value = ''
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeArrayItem("achievements", index)}>
                        {achievement} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Concerns</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add concern"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addArrayItem("concerns", e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input')
                        if (input) {
                          addArrayItem("concerns", input.value)
                          input.value = ''
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.concerns.map((concern, index) => (
                      <Badge key={index} variant="destructive" className="cursor-pointer" onClick={() => removeArrayItem("concerns", index)}>
                        {concern} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Tutor Notes</Label>
                  <Textarea
                    value={formData.tutorNotes}
                    onChange={(e) => updateFormData("tutorNotes", e.target.value)}
                    placeholder="Detailed observations and notes about the session..."
                    rows={6}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Recommendations</Label>
                  <Textarea
                    value={formData.recommendations}
                    onChange={(e) => updateFormData("recommendations", e.target.value)}
                    placeholder="Recommendations for improvement and next steps..."
                    rows={6}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Next Session Focus</Label>
                <Textarea
                  value={formData.nextSessionFocus}
                  onChange={(e) => updateFormData("nextSessionFocus", e.target.value)}
                  placeholder="What should be the focus for the next session?"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Follow-up Actions</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add follow-up action"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem("followUpActions", e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input')
                      if (input) {
                        addArrayItem("followUpActions", input.value)
                        input.value = ''
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.followUpActions.map((action, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeArrayItem("followUpActions", index)}>
                      {action} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                const tabs = ["academic", "behavioral", "emotional", "physical", "social", "cognitive", "support", "overall"]
                const currentIndex = tabs.indexOf(currentTab)
                if (currentIndex > 0) {
                  setCurrentTab(tabs[currentIndex - 1])
                }
              }}
              disabled={currentTab === "academic"}
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

            {currentTab === "overall" ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Assessment"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const tabs = ["academic", "behavioral", "emotional", "physical", "social", "cognitive", "support", "overall"]
                  const currentIndex = tabs.indexOf(currentTab)
                  if (currentIndex < tabs.length - 1) {
                    setCurrentTab(tabs[currentIndex + 1])
                  }
                }}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}