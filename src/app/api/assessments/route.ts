import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const assessments = await db.assessment.findMany({
      include: {
        student: true,
      },
      orderBy: {
        date: 'desc',
      },
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Calculate percentage
    const percentage = body.maxScore > 0 ? (body.score / body.maxScore) * 100 : 0
    
    // Calculate grade
    let grade = 'F'
    if (percentage >= 90) grade = 'A'
    else if (percentage >= 80) grade = 'B'
    else if (percentage >= 70) grade = 'C'
    else if (percentage >= 60) grade = 'D'
    
    const assessment = await db.assessment.create({
      data: {
        studentId: body.studentId,
        date: new Date(body.date),
        subject: body.subject,
        assessmentType: body.assessmentType,
        score: body.score,
        maxScore: body.maxScore,
        percentage,
        grade,
        topicsAssessed: body.topicsAssessed || [],
        strengths: body.strengths || null,
        weaknesses: body.weaknesses || null,
        notes: body.notes || null,
      },
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
