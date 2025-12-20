import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const volunteers = await db.volunteer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(volunteers)
  } catch (error) {
    console.error('Error fetching volunteers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const volunteer = await db.volunteer.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        occupation: body.occupation,
        expertise: body.expertise || [],
        availability: body.availability || [],
        backgroundCheckCompleted: body.backgroundCheckCompleted || false,
        backgroundCheckDate: body.backgroundCheckDate ? new Date(body.backgroundCheckDate) : null,
      },
    })

    return NextResponse.json(volunteer, { status: 201 })
  } catch (error) {
    console.error('Error creating volunteer:', error)
    return NextResponse.json(
      { error: 'Failed to create volunteer' },
      { status: 500 }
    )
  }
}
