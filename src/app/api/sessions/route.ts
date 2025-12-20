import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const sessions = await db.session.findMany({
      include: {
        student: true,
        volunteer: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const session = await db.session.create({
      data: {
        studentId: body.studentId,
        volunteerId: body.volunteerId,
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        subject: body.subject,
        topics: body.topics || [],
        notes: body.notes || null,
        status: body.status || 'completed',
        attentiveness: body.attentiveness || null,
        participation: body.participation || null,
        understanding: body.understanding || null,
        homework: body.homework || null,
        behavior: body.behavior || null,
        progressNotes: body.progressNotes || null,
        areasOfConcern: body.areasOfConcern || null,
        followUpRequired: body.followUpRequired || false,
      },
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
