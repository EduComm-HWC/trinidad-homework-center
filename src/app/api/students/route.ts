import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const students = await db.student.findMany({
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        },
        parentProfile: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        sessions: {
          include: {
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
            sessionDate: 'desc'
          },
          take: 5
        },
        assessments: {
          include: {
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
          },
          take: 5
        },
        _count: {
          select: {
            sessions: true,
            assessments: true,
            files: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Parse JSON fields
    const medicalConditions = JSON.stringify(data.medicalConditions || [])
    const allergies = JSON.stringify(data.allergies || [])
    const specialNeeds = JSON.stringify(data.specialNeeds || [])
    const guardians = JSON.stringify(data.guardians || [])
    const siblings = JSON.stringify(data.siblings || [])
    const behaviorPatterns = JSON.stringify(data.behaviorPatterns || [])
    const interests = JSON.stringify(data.interests || [])
    const strengths = JSON.stringify(data.strengths || [])
    const challenges = JSON.stringify(data.challenges || [])

    const student = await db.student.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        nationality: data.nationality,
        parish: data.parish,
        address: data.address,
        phone: data.phone,
        email: data.email,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        emergencyRelation: data.emergencyRelation,
        medicalConditions,
        allergies,
        medicalNotes: data.medicalNotes,
        previousSchool: data.previousSchool,
        specialEducation: data.specialEducation,
        specialNeeds,
        currentGrade: data.currentGrade,
        favoriteSubjects: JSON.stringify(data.favoriteSubjects || []),
        challengingSubjects: JSON.stringify(data.challengingSubjects || []),
        behaviorPatterns,
        interests,
        strengths,
        challenges,
        socialSkills: data.socialSkills,
        breakfast: data.breakfast,
        bedtime: data.bedtime,
        screenTime: data.screenTime ? parseInt(data.screenTime) : null,
        physicalActivity: data.physicalActivity ? parseInt(data.physicalActivity) : null,
        studyHabits: data.studyHabits,
        photoConsent: data.photoConsent,
        medicalConsent: data.medicalConsent,
        assessmentConsent: data.assessmentConsent,
        dataProcessingConsent: data.dataProcessingConsent,
        guardianName: data.guardianName,
        guardianSignature: data.guardianSignature,
        consentDate: new Date(data.consentDate),
        livingArrangement: data.livingArrangement,
        guardians,
        siblings,
        createdBy: data.createdBy || null
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            sessions: true,
            assessments: true,
            files: true
          }
        }
      }
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}