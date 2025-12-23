import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const AI_RECOMMENDATIONS_SCHEMA = z.object({
  studentId: z.string().optional(),
  type: z.enum(['TUTOR_MATCH', 'STUDY_PLAN', 'INTERVENTION', 'RESOURCE', 'SESSION_SCHEDULING', 'PERFORMANCE_ALERT']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
  context: z.object({
    currentGrade: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    performance: z.object({
      overall: z.number().optional(),
      subjects: z.record(z.number()).optional()
    }).optional(),
    learningStyle: z.string().optional(),
    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    goals: z.array(z.string()).optional(),
    recentSessions: z.array(z.string()).optional(),
    timeAvailable: z.string().optional()
  }).optional()
})

// Trinidad & Tobago educational context
const TT_EDUCATIONAL_CONTEXT = {
  schools: [
    'St. Joseph\'s Convent POS', 'Queen\'s Royal College', 'St. Mary\'s College',
    'Holy Faith Convent', 'Naparima Girls\' College', 'Presentation College',
    'St. Augustine Girls\' High School', 'Bishop Anstey High School',
    'Fatima College', 'Hillview College', 'St. Francis College',
    'Trinity College', 'St. Anthony\'s College', 'ASJA Girls\' College'
  ],
  subjects: {
    'SEA': ['Mathematics', 'English Language Arts', 'Science', 'Social Studies'],
    'CSEC': ['Mathematics', 'English Language', 'English Literature', 'Physics', 'Chemistry', 'Biology', 'Information Technology', 'Principles of Business', 'Principles of Accounts', 'Economics', 'Geography', 'History', 'Social Studies', 'Spanish', 'French', 'Physical Education', 'Visual Arts', 'Music', 'Agricultural Science']
  },
  parishes: [
    'Port of Spain', 'San Fernando', 'Arima', 'Couva', 'Point Fortin', 'Scarborough',
    'Princes Town', 'Siparia', 'Rio Claro', 'Tunapuna', 'Diego Martin',
    'San Juan', 'Barataria', 'Mayaro', 'Penal', 'Siparia', 'Tobago'
  ],
  culturalContext: [
    'Carnival traditions', 'Divali celebrations', 'Eid festivities', 'Christmas traditions',
    'Steelpan music', 'Calypso and Soca', 'Caribbean literature', 'Local cuisine',
    'Historical landmarks', 'Natural environment', 'Agricultural heritage', 'Marine life'
  ],
  learningChallenges: [
    'Language barriers', 'Socio-economic factors', 'Access to resources',
    'Classroom size', 'Technology access', 'Transportation issues',
    'Study environment', 'Family responsibilities', 'Part-time work', 'Health issues'
  ]
}

// Volunteer expertise database
const VOLUNTEER_EXPERTISE = {
  'Mathematics': {
    levels: ['Primary', 'Secondary', 'CSEC', 'CAPE'],
    specializations: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
    teachingMethods: ['Visual learning', 'Problem-based learning', 'Step-by-step approach', 'Real-world applications']
  },
  'English Language': {
    levels: ['Primary', 'Secondary', 'CSEC'],
    specializations: ['Grammar', 'Comprehension', 'Essay Writing', 'Creative Writing', 'Literature'],
    teachingMethods: ['Phonics', 'Reading strategies', 'Writing workshops', 'Caribbean literature focus']
  },
  'Science': {
    levels: ['Primary', 'Secondary', 'CSEC'],
    specializations: ['Biology', 'Chemistry', 'Physics', 'Environmental Science'],
    teachingMethods: ['Hands-on experiments', 'Local examples', 'Field trips', 'Practical applications']
  },
  'Information Technology': {
    levels: ['Primary', 'Secondary', 'CSEC'],
    specializations: ['Programming', 'Web Development', 'Database Management', 'Digital Literacy'],
    teachingMethods: ['Project-based learning', 'Coding exercises', 'Real-world projects', 'Industry connections']
  }
}

// Study plan templates
const STUDY_PLAN_TEMPLATES = {
  'SEA_Preparation': {
    duration: '12 weeks',
    structure: {
      'Weeks 1-4': 'Foundation building and concept review',
      'Weeks 5-8': 'Practice tests and skill development',
      'Weeks 9-12': 'Exam preparation and mock tests'
    },
    subjects: ['Mathematics', 'English Language Arts', 'Science', 'Social Studies'],
    dailySchedule: '2 hours per day, 4 days per week',
    caribbeanFocus: 'Local examples in all subjects, TT context in problem-solving'
  },
  'CSEC_Preparation': {
    duration: '16 weeks',
    structure: {
      'Weeks 1-6': 'Syllabus coverage and concept understanding',
      'Weeks 7-12': 'Practice questions and skill development',
      'Weeks 13-16': 'Exam techniques and mock examinations'
    },
    subjects: ['Mathematics', 'English Language', 'Sciences', 'Business Studies'],
    dailySchedule: '3 hours per day, 5 days per week',
    caribbeanFocus: 'CXC past papers, regional examples, case studies from TT'
  }
}

// Intervention strategies
const INTERVENTION_STRATEGIES = {
  'Academic_Support': {
    strategies: [
      'One-on-one tutoring sessions',
      'Peer tutoring programs',
      'Study groups formation',
      'Extra practice materials',
      'Weekend workshops'
    ],
    timeline: '4-6 weeks for noticeable improvement',
    success_indicators: ['Grade improvement', 'Increased confidence', 'Better participation']
  },
  'Behavioral_Intervention': {
    strategies: [
      'Counseling sessions',
      'Mentorship programs',
      'Parent-teacher meetings',
      'Behavior modification plans',
      'Positive reinforcement systems'
    ],
    timeline: '6-8 weeks for behavioral changes',
    success_indicators: ['Improved focus', 'Better social skills', 'Reduced disruptions']
  },
  'Learning_Difficulties': {
    strategies: [
      'Educational assessment',
      'Individualized Education Plans (IEP)',
      'Specialized teaching methods',
      'Assistive technology',
      'Multi-sensory learning approaches'
    ],
    timeline: '8-12 weeks for skill development',
    success_indicators: ['Improved comprehension', 'Better retention', 'Increased engagement']
  }
}

function generateAIRecommendations(type, context, priority) {
  const recommendations = []
  
  switch (type) {
    case 'TUTOR_MATCH':
      recommendations.push(...generateTutorMatches(context))
      break
    case 'STUDY_PLAN':
      recommendations.push(...generateStudyPlans(context))
      break
    case 'INTERVENTION':
      recommendations.push(...generateInterventions(context))
      break
    case 'RESOURCE':
      recommendations.push(...generateResources(context))
      break
    case 'SESSION_SCHEDULING':
      recommendations.push(...generateSessionSchedules(context))
      break
    case 'PERFORMANCE_ALERT':
      recommendations.push(...generatePerformanceAlerts(context))
      break
  }
  
  return recommendations.map(rec => ({
    ...rec,
    id: `ai-rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    confidence: calculateConfidence(rec, context),
    priority: priority || rec.priority,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    trinidadContext: addTrinidadContext(rec),
    implementationSteps: generateImplementationSteps(rec)
  }))
}

function generateTutorMatches(context) {
  const matches = []
  const { subjects, weaknesses, learningStyle, currentGrade } = context || {}
  
  if (!subjects || subjects.length === 0) return matches
  
  subjects.forEach(subject => {
    const expertise = VOLUNTEER_EXPERTISE[subject]
    if (!expertise) return
    
    // Find best match based on grade level and subject
    const gradeLevel = currentGrade?.includes('Standard') ? 'Primary' : 'Secondary'
    const suitableLevel = expertise.levels.includes(gradeLevel) || expertise.levels.includes('CSEC')
    
    if (suitableLevel) {
      matches.push({
        type: 'TUTOR_MATCH',
        title: `${subject} Tutor Recommendation`,
        description: `Match with expert ${subject} tutor for ${currentGrade} level`,
        metadata: {
          subject: subject,
          gradeLevel: gradeLevel,
          specializations: expertise.specializations,
          teachingMethods: expertise.teachingMethods,
          availability: 'Weekdays after school, weekends',
          location: 'Virtual and in-person options',
          ttContext: `Familiar with ${TT_EDUCATIONAL_CONTEXT.schools.slice(0, 3).join(', ')} curriculum`
        },
        priority: 'HIGH'
      })
    }
  })
  
  return matches
}

function generateStudyPlans(context) {
  const plans = []
  const { currentGrade, goals, timeAvailable } = context || {}
  
  if (!currentGrade) return plans
  
  const planType = currentGrade.includes('Standard') ? 'SEA_Preparation' : 'CSEC_Preparation'
  const template = STUDY_PLAN_TEMPLATES[planType]
  
  if (template) {
    plans.push({
      type: 'STUDY_PLAN',
      title: `${currentGrade} Study Plan`,
      description: `Personalized ${currentGrade} study plan with Trinidad & Tobago context`,
      metadata: {
        duration: template.duration,
        structure: template.structure,
        subjects: template.subjects,
        dailySchedule: template.dailySchedule,
        caribbeanFocus: template.caribbeanFocus,
        goals: goals || ['Improve grades', 'Prepare for exams', 'Build confidence'],
        timeCommitment: timeAvailable || '2 hours daily',
        resources: ['CSEC past papers', 'Local textbooks', 'Online resources'],
        milestones: generateMilestones(currentGrade)
      },
      priority: 'MEDIUM'
    })
  }
  
  return plans
}

function generateInterventions(context) {
  const interventions = []
  const { weaknesses, performance } = context || {}
  
  if (!weaknesses || weaknesses.length === 0) return interventions
  
  weaknesses.forEach(weakness => {
    const strategy = INTERVENTION_STRATEGIES['Academic_Support']
    
    if (strategy) {
      interventions.push({
        type: 'INTERVENTION',
        title: `Intervention for ${weakness}`,
        description: `Targeted support to improve ${weakness} skills`,
        metadata: {
          strategies: strategy.strategies,
          timeline: strategy.timeline,
          successIndicators: strategy.success_indicators,
          ttContext: `Using local resources and support systems in ${TT_EDUCATIONAL_CONTEXT.parishes.slice(0, 3).join(', ')}`,
          supportTeam: ['Teachers', 'Parents', 'Counselors', 'Peer tutors'],
          monitoring: 'Weekly progress checks',
          adjustments: 'Plan modifications based on progress'
        },
        priority: performance?.overall < 60 ? 'HIGH' : 'MEDIUM'
      })
    }
  })
  
  return interventions
}

function generateResources(context) {
  const resources = []
  const { subjects, learningStyle, currentGrade } = context || {}
  
  if (!subjects || subjects.length === 0) return resources
  
  subjects.forEach(subject => {
    resources.push({
      type: 'RESOURCE',
      title: `${subject} Learning Resources`,
      description: `Curated ${subject} resources for ${currentGrade} students`,
      metadata: {
        subject: subject,
        resources: generateSubjectResources(subject, currentGrade),
        learningStyle: learningStyle || 'Visual',
        ttContext: `Resources featuring Trinidad & Tobago examples and Caribbean content`,
        accessibility: 'Free and paid options available',
        formats: ['Digital', 'Print', 'Video', 'Interactive'],
        localAvailability: 'Available at National Library and local bookstores'
      },
      priority: 'LOW'
    })
  })
  
  return resources
}

function generateSessionSchedules(context) {
  const schedules = []
  const { subjects, timeAvailable, weaknesses } = context || {}
  
  if (!subjects || subjects.length === 0) return schedules
  
  subjects.forEach(subject => {
    schedules.push({
      type: 'SESSION_SCHEDULING',
      title: `${subject} Tutorial Schedule`,
      description: `Optimal tutoring schedule for ${subject} improvement`,
      metadata: {
        subject: subject,
        recommendedFrequency: '2-3 times per week',
        sessionDuration: '60 minutes',
        bestTimes: 'After school hours, weekends',
        location: 'Virtual or local community centers',
        ttContext: `Sessions incorporating ${TT_EDUCATIONAL_CONTEXT.culturalContext.slice(0, 2).join(' and ')}`,
        materials: 'Subject-specific materials and local examples',
        goals: weaknesses?.length > 0 ? 'Address specific weaknesses' : 'General improvement',
        tracking: 'Progress monitoring and adjustment'
      },
      priority: 'MEDIUM'
    })
  })
  
  return schedules
}

function generatePerformanceAlerts(context) {
  const alerts = []
  const { performance, subjects } = context || {}
  
  if (!performance) return alerts
  
  Object.entries(performance.subjects || {}).forEach(([subject, score]) => {
    if (score < 50) {
      alerts.push({
        type: 'PERFORMANCE_ALERT',
        title: `Critical: ${subject} Performance Alert`,
        description: `Immediate attention needed for ${subject} - Score: ${score}%`,
        metadata: {
          subject: subject,
          score: score,
          riskLevel: 'CRITICAL',
          urgency: 'Immediate action required',
          ttContext: `Connecting with ${TT_EDUCATIONAL_CONTEXT.schools.slice(0, 2).join(' and ')} support services`,
          interventions: ['Parent meeting', 'Tutor assignment', 'Study plan adjustment'],
          monitoring: 'Weekly progress checks',
          support: 'Counselor and teacher collaboration'
        },
        priority: 'CRITICAL'
      })
    } else if (score < 70) {
      alerts.push({
        type: 'PERFORMANCE_ALERT',
        title: `${subject} Performance Concern`,
        description: `Additional support needed for ${subject} - Score: ${score}%`,
        metadata: {
          subject: subject,
          score: score,
          riskLevel: 'MEDIUM',
          urgency: 'Action recommended within 2 weeks',
          ttContext: `Utilizing ${TT_EDUCATIONAL_CONTEXT.learningChallenges.slice(0, 2).join(' and ')} support strategies`,
          interventions: ['Extra practice', 'Peer tutoring', 'Teacher consultation'],
          monitoring: 'Bi-weekly progress checks'
        },
        priority: 'HIGH'
      })
    }
  })
  
  return alerts
}

function generateSubjectResources(subject, grade) {
  const resourceMap = {
    'Mathematics': {
      primary: ['Math workbooks', 'Manipulatives', 'Educational games', 'Online math platforms'],
      secondary: ['CSEC math textbooks', 'Past papers', 'Graphing calculators', 'Math software']
    },
    'English Language': {
      primary: ['Phonics books', 'Reading materials', 'Grammar workbooks', 'Story books'],
      secondary: ['CSEC English textbooks', 'Literature anthologies', 'Writing guides', 'Vocabulary builders']
    },
    'Science': {
      primary: ['Science kits', 'Nature guides', 'Experiment books', 'Educational videos'],
      secondary: ['CSEC science textbooks', 'Lab manuals', 'Field guides', 'Scientific calculators']
    }
  }
  
  const level = grade?.includes('Standard') ? 'primary' : 'secondary'
  return resourceMap[subject]?.[level] || ['General educational resources']
}

function generateMilestones(grade) {
  const isSEA = grade?.includes('Standard')
  
  if (isSEA) {
    return [
      'Week 4: Complete foundation review',
      'Week 8: Achieve 70% in practice tests',
      'Week 12: SEA exam readiness assessment'
    ]
  } else {
    return [
      'Month 4: Complete syllabus coverage',
      'Month 8: Achieve 75% in mock exams',
      'Month 12: CSEC exam preparation complete',
      'Month 16: Final exam readiness'
    ]
  }
}

function calculateConfidence(recommendation, context) {
  let confidence = 0.75 // Base confidence
  
  // Increase confidence based on data quality
  if (context?.performance) confidence += 0.1
  if (context?.subjects && context.subjects.length > 0) confidence += 0.05
  if (context?.learningStyle) confidence += 0.05
  if (context?.goals && context.goals.length > 0) confidence += 0.05
  
  // Adjust based on recommendation type
  const typeMultipliers = {
    'TUTOR_MATCH': 0.9,
    'STUDY_PLAN': 0.85,
    'INTERVENTION': 0.8,
    'RESOURCE': 0.7,
    'SESSION_SCHEDULING': 0.75,
    'PERFORMANCE_ALERT': 0.95
  }
  
  confidence *= typeMultipliers[recommendation.type] || 0.75
  
  return Math.min(0.95, confidence)
}

function addTrinidadContext(recommendation) {
  const contextAdditions = {
    localSchools: TT_EDUCATIONAL_CONTEXT.schools.slice(0, 3),
    culturalElements: TT_EDUCATIONAL_CONTEXT.culturalContext.slice(0, 2),
    parishes: TT_EDUCATIONAL_CONTEXT.parishes.slice(0, 3),
    challenges: TT_EDUCATIONAL_CONTEXT.learningChallenges.slice(0, 2)
  }
  
  return {
    ...recommendation,
    trinidadContext: {
      ...recommendation.trinidadContext,
      ...contextAdditions
    }
  }
}

function generateImplementationSteps(recommendation) {
  const baseSteps = [
    'Review recommendation details',
    'Consult with teachers/parents',
    'Create action plan',
    'Implement changes',
    'Monitor progress',
    'Adjust as needed'
  ]
  
  const typeSpecificSteps = {
    'TUTOR_MATCH': [
      'Contact recommended tutor',
      'Schedule initial consultation',
      'Discuss learning goals',
      'Set up tutoring schedule',
      'Monitor student progress'
    ],
    'STUDY_PLAN': [
      'Review study plan structure',
      'Gather recommended materials',
      'Set up study schedule',
      'Begin implementation',
      'Track daily progress'
    ],
    'INTERVENTION': [
      'Schedule assessment meeting',
      'Develop intervention plan',
      'Implement support strategies',
      'Regular progress monitoring',
      'Plan adjustments as needed'
    ]
  }
  
  return typeSpecificSteps[recommendation.type] || baseSteps
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AI_RECOMMENDATIONS_SCHEMA.parse(body)
    
    const { studentId, type, priority, context } = validatedData
    
    // Generate AI recommendations
    const recommendations = generateAIRecommendations(type, context, priority)
    
    // Add student ID if provided
    if (studentId) {
      recommendations.forEach(rec => {
        rec.studentId = studentId
      })
    }
    
    return NextResponse.json({
      success: true,
      recommendations: recommendations,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'Faith Tabernacle AI Recommendation Engine v2.0',
        context: 'Trinidad & Tobago Educational System',
        confidence: recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length,
        totalRecommendations: recommendations.length
      }
    })
    
  } catch (error) {
    console.error('AI Recommendations Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate AI recommendations',
      message: error.message
    }, { status: 500 })
  }
}

// GET endpoint to retrieve available recommendation types
export async function GET() {
  return NextResponse.json({
    success: true,
    options: {
      types: ['TUTOR_MATCH', 'STUDY_PLAN', 'INTERVENTION', 'RESOURCE', 'SESSION_SCHEDULING', 'PERFORMANCE_ALERT'],
      priorities: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      subjects: TT_EDUCATIONAL_CONTEXT.subjects.CSEC,
      schools: TT_EDUCATIONAL_CONTEXT.schools,
      parishes: TT_EDUCATIONAL_CONTEXT.parishes
    },
    context: {
      educationalSystem: 'Trinidad & Tobago',
      curriculum: 'SEA and CSEC',
      examBoards: ['CXC', 'Local SEA'],
      culturalContext: TT_EDUCATIONAL_CONTEXT.culturalContext,
      learningChallenges: TT_EDUCATIONAL_CONTEXT.learningChallenges
    },
    features: [
      'AI-powered personalization',
      'Trinidad & Tobago context',
      'Real-time performance analysis',
      'Evidence-based recommendations',
      'Cultural sensitivity',
      'Local resource integration',
      'Progress monitoring',
      'Early intervention alerts'
    ]
  })
}