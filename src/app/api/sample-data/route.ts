import { NextResponse } from 'next/server'

// Sample data for demonstration
const sampleStudents = [
  {
    id: '1',
    firstName: 'Aaliyah',
    lastName: 'Mohammed',
    dateOfBirth: '2015-03-15',
    age: 9,
    educationLevel: 'primary',
    school: 'Trinidad Boys\' R.C.',
    grade: 'Standard 4',
    subjects: ['Mathematics', 'English', 'Science'],
    csecSubjects: [],
    careerGoals: 'I want to be a teacher',
    parentName: 'Fatima Mohammed',
    parentPhone: '868-555-1234',
    parentEmail: 'fatima.mohammed@email.com',
    address: '123 Main Road, Tunapuna, Trinidad',
    emergencyContact: 'Abdul Mohammed - 868-555-1235',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Marcus',
    lastName: 'Williams',
    dateOfBirth: '2014-07-22',
    age: 10,
    educationLevel: 'primary',
    school: 'St. Mary\'s R.C.',
    grade: 'Standard 5',
    subjects: ['Mathematics', 'English', 'Science', 'Social Studies'],
    csecSubjects: [],
    careerGoals: 'I want to be a doctor',
    parentName: 'Sharon Williams',
    parentPhone: '868-555-2345',
    parentEmail: 'sharon.w@email.com',
    address: '45 Queen Street, Port of Spain',
    emergencyContact: 'David Williams - 868-555-2346',
    createdAt: new Date().toISOString()
  }
]

const sampleSessions = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aaliyah Mohammed',
    volunteerId: 'vol1',
    volunteerName: 'Dr. Sarah Ramkissoon',
    date: '2024-12-15',
    startTime: '16:00',
    endTime: '17:30',
    subject: 'Mathematics',
    topics: ['Quadratic Equations', 'Factorization'],
    status: 'completed',
    notes: 'Good progress on quadratic equations. Needs more practice with word problems.',
    location: 'Library Room A',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Marcus Williams',
    volunteerId: 'vol2',
    volunteerName: 'Michael Chen',
    date: '2024-12-16',
    startTime: '17:00',
    endTime: '18:30',
    subject: 'Physics',
    topics: ['Newton\'s Laws of Motion', 'Force and Acceleration'],
    status: 'completed',
    notes: 'Excellent understanding of concepts. Demonstrated strong problem-solving skills.',
    location: 'Science Lab',
    createdAt: new Date().toISOString()
  }
]

const sampleAssessments = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aaliyah Mohammed',
    date: '2024-12-10',
    type: 'quiz',
    subject: 'Mathematics',
    score: 18,
    maxScore: 20,
    percentage: 90,
    grade: 'A',
    topicsAssessed: ['Algebra', 'Quadratic Equations'],
    strengths: 'Strong grasp of algebraic manipulation',
    weaknesses: 'Needs to work on speed',
    notes: 'Excellent performance on algebra topics',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Marcus Williams',
    date: '2024-12-12',
    type: 'test',
    subject: 'Science',
    score: 85,
    maxScore: 100,
    percentage: 85,
    grade: 'B',
    topicsAssessed: ['Chemical Bonding', 'Periodic Table'],
    strengths: 'Good understanding of ionic and covalent bonding',
    weaknesses: 'Needs more practice with electron configuration',
    notes: 'Good understanding of basic chemistry concepts',
    createdAt: new Date().toISOString()
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'students'
    
    switch (type) {
      case 'students':
        return NextResponse.json(sampleStudents)
      
      case 'sessions':
        return NextResponse.json(sampleSessions)
      
      case 'assessments':
        return NextResponse.json(sampleAssessments)
      
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json()
    
    switch (type) {
      case 'students':
        const newStudent = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString()
        }
        
        // In a real implementation, this would save to database
        console.log('New student:', newStudent)
        return NextResponse.json(newStudent, { status: 201 })
      
      case 'sessions':
        const newSession = {
          id: Date.now().toString(),
          ...data,
          date: new Date(data.date).toISOString(),
          createdAt: new Date().toISOString()
        }
        
        console.log('New session:', newSession)
        return NextResponse.json(newSession, { status: 201 })
      
      case 'assessments':
        const newAssessment = {
          id: Date.now().toString(),
          ...data,
          date: new Date(data.date).toISOString(),
          createdAt: new Date().toISOString()
        }
        
        console.log('New assessment:', newAssessment)
        return NextResponse.json(newAssessment, { status: 201 })
      
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}