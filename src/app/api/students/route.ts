import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const students = await db.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const student = await db.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: new Date(body.dateOfBirth),
        age: body.age,
        educationLevel: body.educationLevel,
        school: body.school,
        grade: body.grade,
        subjects: body.subjects || [],
        csecSubjects: body.csecSubjects || [],
        careerGoals: body.careerGoals || null,
        parentName: body.parentName,
        parentPhone: body.parentPhone,
        parentEmail: body.parentEmail,
        address: body.address,
        emergencyContact: body.emergencyContact,
      },
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
