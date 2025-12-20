import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.assessment.deleteMany()
  await prisma.session.deleteMany()
  await prisma.registrationAssessment.deleteMany()
  await prisma.volunteer.deleteMany()
  await prisma.student.deleteMany()
  await prisma.parent.deleteMany()

  // Create sample students
  const students = await Promise.all([
    // Primary school students
    prisma.student.create({
      data: {
        firstName: 'Aaliyah',
        lastName: 'Mohammed',
        dateOfBirth: new Date('2015-03-15'),
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
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Marcus',
        lastName: 'Williams',
        dateOfBirth: new Date('2014-07-22'),
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
      },
    }),
    // Secondary school students
    prisma.student.create({
      data: {
        firstName: 'Kavita',
        lastName: 'Singh',
        dateOfBirth: new Date('2010-01-10'),
        age: 14,
        educationLevel: 'secondary',
        school: 'Naparima College',
        grade: 'Form 3',
        subjects: ['Mathematics', 'English', 'Chemistry', 'Physics'],
        csecSubjects: ['Mathematics', 'English Language', 'Chemistry', 'Physics', 'Biology', 'Spanish'],
        careerGoals: 'Aspiring to study medicine at UWI',
        parentName: 'Rajesh Singh',
        parentPhone: '868-555-3456',
        parentEmail: 'r.singh@email.com',
        address: '78 Southern Main Road, San Fernando',
        emergencyContact: 'Priya Singh - 868-555-3457',
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Jamal',
        lastName: 'Thompson',
        dateOfBirth: new Date('2009-11-05'),
        age: 15,
        educationLevel: 'secondary',
        school: 'Queen\'s Royal College',
        grade: 'Form 4',
        subjects: ['Mathematics', 'English', 'Physics', 'Technical Drawing'],
        csecSubjects: ['Mathematics', 'English Language', 'Physics', 'Technical Drawing', 'Information Technology'],
        careerGoals: 'Engineering - want to design buildings',
        parentName: 'Michelle Thompson',
        parentPhone: '868-555-4567',
        parentEmail: 'michelle.t@email.com',
        address: '12 Cascade Road, Cascade',
        emergencyContact: 'Trevor Thompson - 868-555-4568',
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Aisha',
        lastName: 'Ali',
        dateOfBirth: new Date('2008-04-18'),
        age: 16,
        educationLevel: 'secondary',
        school: 'Holy Name Convent',
        grade: 'Form 5',
        subjects: ['Mathematics', 'English', 'Chemistry', 'Biology', 'Spanish'],
        csecSubjects: ['Mathematics', 'English Language', 'Chemistry', 'Biology', 'Spanish', 'Principles of Accounts'],
        careerGoals: 'Pharmacist - interested in healthcare',
        parentName: 'Yasmin Ali',
        parentPhone: '868-555-5678',
        parentEmail: 'yasmin.ali@email.com',
        address: '89 Ariapita Avenue, Woodbrook',
        emergencyContact: 'Hassan Ali - 868-555-5679',
      },
    }),
  ])

  console.log(`Created ${students.length} students`)

  // Create sample volunteers
  const volunteers = await Promise.all([
    prisma.volunteer.create({
      data: {
        firstName: 'Dr. Sarah',
        lastName: 'Ramkissoon',
        email: 'sarah.ramkissoon@email.com',
        phone: '868-555-7890',
        address: '34 St. Ann\'s Road, St. Ann\'s',
        occupation: 'Retired Mathematics Teacher',
        expertise: ['Mathematics', 'Physics', 'Chemistry'],
        availability: ['Monday', 'Wednesday', 'Friday'],
        backgroundCheckCompleted: true,
        backgroundCheckDate: new Date('2024-01-15'),
      },
    }),
    prisma.volunteer.create({
      data: {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@email.com',
        phone: '868-555-8901',
        address: '67 Long Circular Road, Maraval',
        occupation: 'Software Engineer',
        expertise: ['Mathematics', 'Information Technology', 'Physics'],
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        backgroundCheckCompleted: true,
        backgroundCheckDate: new Date('2024-02-01'),
      },
    }),
    prisma.volunteer.create({
      data: {
        firstName: 'Natasha',
        lastName: 'Richards',
        email: 'natasha.richards@email.com',
        phone: '868-555-9012',
        address: '23 Morne Coco Road, Diego Martin',
        occupation: 'University Lecturer - Chemistry',
        expertise: ['Chemistry', 'Biology', 'English Language'],
        availability: ['Monday', 'Tuesday', 'Thursday'],
        backgroundCheckCompleted: true,
        backgroundCheckDate: new Date('2024-01-20'),
      },
    }),
  ])

  console.log(`Created ${volunteers.length} volunteers`)

  // Create sample sessions
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        studentId: students[2].id, // Kavita Singh
        volunteerId: volunteers[0].id, // Dr. Sarah
        date: new Date('2024-12-15'),
        startTime: '16:00',
        endTime: '17:30',
        subject: 'Mathematics',
        topics: ['Quadratic Equations', 'Factorization'],
        notes: 'Good progress on quadratic equations. Needs more practice with word problems.',
        status: 'completed',
        attentiveness: 'excellent',
        participation: 'good',
        understanding: 'good',
        behavior: 'excellent',
      },
    }),
    prisma.session.create({
      data: {
        studentId: students[3].id, // Jamal Thompson
        volunteerId: volunteers[1].id, // Michael Chen
        date: new Date('2024-12-16'),
        startTime: '17:00',
        endTime: '18:30',
        subject: 'Physics',
        topics: ['Newton\'s Laws of Motion', 'Force and Acceleration'],
        notes: 'Excellent understanding of concepts. Demonstrated strong problem-solving skills.',
        status: 'completed',
        attentiveness: 'excellent',
        participation: 'excellent',
        understanding: 'excellent',
        behavior: 'excellent',
      },
    }),
  ])

  console.log(`Created ${sessions.length} sessions`)

  // Create sample assessments
  const assessments = await Promise.all([
    prisma.assessment.create({
      data: {
        studentId: students[2].id,
        date: new Date('2024-12-10'),
        subject: 'Mathematics',
        assessmentType: 'quiz',
        score: 18,
        maxScore: 20,
        percentage: 90,
        grade: 'A',
        topicsAssessed: ['Algebra', 'Quadratic Equations'],
        strengths: 'Strong grasp of algebraic manipulation',
        weaknesses: 'Needs to work on speed',
      },
    }),
    prisma.assessment.create({
      data: {
        studentId: students[4].id,
        date: new Date('2024-12-12'),
        subject: 'Chemistry',
        assessmentType: 'test',
        score: 85,
        maxScore: 100,
        percentage: 85,
        grade: 'B',
        topicsAssessed: ['Chemical Bonding', 'Periodic Table'],
        strengths: 'Good understanding of ionic and covalent bonding',
        weaknesses: 'Needs more practice with electron configuration',
      },
    }),
  ])

  console.log(`Created ${assessments.length} assessments`)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
