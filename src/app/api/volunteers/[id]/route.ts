import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.volunteer.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting volunteer:', error)
    return NextResponse.json(
      { error: 'Failed to delete volunteer' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const volunteer = await db.volunteer.findUnique({
      where: { id: params.id },
      include: {
        sessions: true,
      },
    })

    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(volunteer)
  } catch (error) {
    console.error('Error fetching volunteer:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteer' },
      { status: 500 }
    )
  }
}
