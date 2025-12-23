import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const assessments = await db.assessment.findMany({
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            parish: true
          }
        },
        session: {
          select: {
            subject: true,
            sessionDate: true,
            sessionType: true
          }
        },
        tutor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        assessmentDate: 'desc'
      }
    })

    return NextResponse.json(assessments)
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Calculate overall score and risk level
    const scores = [
      data.preparationScore,
      data.homeworkScore,
      data.participationScore,
      data.understandingScore,
      data.behaviorScore,
      data.focusScore,
      data.cooperationScore,
      data.attitudeScore,
      data.peerInteractionScore,
      data.emotionalStateScore,
      data.confidenceScore,
      data.motivationScore,
      data.energyLevelScore,
      data.wellbeingScore,
      data.nutritionScore,
      data.communicationScore,
      data.teamworkScore,
      data.conflictResolutionScore,
      data.problemSolvingScore,
      data.criticalThinkingScore,
      data.creativityScore,
      data.memoryScore
    ].filter(score => score > 0)
    
    const overallScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    
    let riskLevel = "LOW"
    if (overallScore >= 4) {
      riskLevel = "LOW"
    } else if (overallScore >= 3) {
      riskLevel = "MEDIUM"
    } else if (overallScore >= 2) {
      riskLevel = "HIGH"
    } else {
      riskLevel = "CRITICAL"
    }

    const assessment = await db.assessment.create({
      data: {
        studentId: data.studentId,
        sessionId: data.sessionId,
        tutorId: data.tutorId,
        assessmentDate: new Date(data.assessmentDate),
        
        // Academic Assessment
        preparationScore: data.preparationScore,
        homeworkScore: data.homeworkScore,
        participationScore: data.participationScore,
        understandingScore: data.understandingScore,
        topicsCovered: JSON.stringify(data.topicsCovered || []),
        
        // Behavioral Assessment
        behaviorScore: data.behaviorScore,
        focusScore: data.focusScore,
        cooperationScore: data.cooperationScore,
        attitudeScore: data.attitudeScore,
        peerInteractionScore: data.peerInteractionScore,
        
        // Emotional Assessment
        emotionalStateScore: data.emotionalStateScore,
        confidenceScore: data.confidenceScore,
        motivationScore: data.motivationScore,
        stressIndicators: JSON.stringify(data.stressIndicators || []),
        
        // Physical Assessment
        energyLevelScore: data.energyLevelScore,
        wellbeingScore: data.wellbeingScore,
        nutritionScore: data.nutritionScore,
        
        // Social Assessment
        communicationScore: data.communicationScore,
        teamworkScore: data.teamworkScore,
        conflictResolutionScore: data.conflictResolutionScore,
        
        // Cognitive Assessment
        problemSolvingScore: data.problemSolvingScore,
        criticalThinkingScore: data.criticalThinkingScore,
        creativityScore: data.creativityScore,
        memoryScore: data.memoryScore,
        
        // Support Needs
        immediateSupport: JSON.stringify(data.immediateSupport || []),
        resourcesNeeded: JSON.stringify(data.resourcesNeeded || []),
        familyInvolvement: JSON.stringify(data.familyInvolvement || []),
        
        // Overall Assessment
        goals: JSON.stringify(data.goals || []),
        achievements: JSON.stringify(data.achievements || []),
        concerns: JSON.stringify(data.concerns || []),
        tutorNotes: data.tutorNotes,
        recommendations: data.recommendations,
        followUpActions: JSON.stringify(data.followUpActions || []),
        nextSessionFocus: data.nextSessionFocus,
        
        // Calculated Fields
        overallScore: Math.round(overallScore * 10) / 10,
        riskLevel,
        
        createdBy: data.createdBy || null
      },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            parish: true
          }
        },
        session: {
          select: {
            subject: true,
            sessionDate: true,
            sessionType: true
          }
        },
        tutor: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(assessment, { status: 201 })
  } catch (error) {
    console.error('Error creating assessment:', error)
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    )
  }
}