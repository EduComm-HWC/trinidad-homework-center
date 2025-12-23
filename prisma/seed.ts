import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@tthwcenter.edu',
      name: 'Admin User',
      role: 'ADMIN',
      parish: 'Port of Spain',
    },
  })

  const staffUser = await prisma.user.create({
    data: {
      email: 'staff@tthwcenter.edu',
      name: 'Staff Member',
      role: 'STAFF',
      parish: 'San Fernando',
    },
  })

  // Create tutors
  const tutor1User = await prisma.user.create({
    data: {
      email: 'tutor1@tthwcenter.edu',
      name: 'Sarah Johnson',
      role: 'TUTOR',
      parish: 'Arima',
    },
  })

  const tutor2User = await prisma.user.create({
    data: {
      email: 'tutor2@tthwcenter.edu',
      name: 'Michael Chen',
      role: 'TUTOR',
      parish: 'Chaguanas',
    },
  })

  const tutor1Profile = await prisma.tutorProfile.create({
    data: {
      userId: tutor1User.id,
      qualifications: JSON.stringify(['B.Sc Mathematics', 'Postgraduate Diploma in Education']),
      experience: 8,
      subjects: JSON.stringify(['Mathematics', 'Physics', 'Chemistry']),
      availability: JSON.stringify({
        monday: ['3:00 PM - 6:00 PM'],
        wednesday: ['3:00 PM - 6:00 PM'],
        friday: ['3:00 PM - 6:00 PM'],
        saturday: ['9:00 AM - 1:00 PM']
      }),
      maxStudents: 15,
      rating: 4.5,
      totalSessions: 234,
      specializations: JSON.stringify(['CSEC Mathematics', 'CSEC Physics', 'Remedial Mathematics']),
      bio: 'Experienced mathematics tutor with a passion for helping students understand complex concepts.',
    },
  })

  const tutor2Profile = await prisma.tutorProfile.create({
    data: {
      userId: tutor2User.id,
      qualifications: JSON.stringify(['B.A English Literature', 'M.A Education']),
      experience: 6,
      subjects: JSON.stringify(['English Language', 'English Literature', 'History']),
      availability: JSON.stringify({
        tuesday: ['3:00 PM - 6:00 PM'],
        thursday: ['3:00 PM - 6:00 PM'],
        saturday: ['2:00 PM - 5:00 PM']
      }),
      maxStudents: 12,
      rating: 4.7,
      totalSessions: 189,
      specializations: JSON.stringify(['CSEC English', 'Creative Writing', 'Literature Analysis']),
      bio: 'Passionate educator specializing in English language and literature with focus on exam preparation.',
    },
  })

  // Create parents
  const parent1User = await prisma.user.create({
    data: {
      email: 'parent1@example.com',
      name: 'Jennifer Martinez',
      role: 'PARENT',
      parish: 'Port of Spain',
    },
  })

  const parent1Profile = await prisma.parentProfile.create({
    data: {
      userId: parent1User.id,
      occupation: 'Accountant',
      workplace: 'Ministry of Finance',
      income: 'Middle Income',
      education: 'Bachelor\'s Degree',
      maritalStatus: 'Married',
      notes: 'Very supportive of children\'s education',
    },
  })

  // Create sample students
  const student1 = await prisma.student.create({
    data: {
      firstName: 'Emma',
      lastName: 'Martinez',
      dateOfBirth: new Date('2010-05-15'),
      gender: 'FEMALE',
      nationality: 'Trinidad & Tobago',
      parish: 'Port of Spain',
      address: '123 Main Street, St. Clair',
      phone: '868-123-4567',
      email: 'emma.martinez@student.edu',
      emergencyContact: 'Jennifer Martinez',
      emergencyPhone: '868-123-4567',
      emergencyRelation: 'Mother',
      medicalConditions: JSON.stringify(['None']),
      allergies: JSON.stringify(['None']),
      previousSchool: 'St. Joseph\'s Convent',
      specialEducation: false,
      specialNeeds: JSON.stringify(['None identified']),
      livingArrangement: 'Both parents',
      guardians: JSON.stringify([{
        name: 'Jennifer Martinez',
        relationship: 'Mother',
        phone: '868-123-4567',
        email: 'parent1@example.com',
        occupation: 'Accountant'
      }]),
      siblings: JSON.stringify([{
        name: 'Lucas Martinez',
        age: 8,
        school: 'St. Mary\'s Primary'
      }]),
      behaviorPatterns: JSON.stringify(['Generally cooperative', 'Focused', 'Independent']),
      interests: JSON.stringify(['Reading', 'Science experiments', 'Video games']),
      strengths: JSON.stringify(['Problem solving', 'Critical thinking', 'Mathematics']),
      challenges: JSON.stringify(['Creative writing', 'Public speaking']),
      breakfast: 'Cereal with milk',
      bedtime: '9:00 PM - 10:00 PM',
      screenTime: 2,
      physicalActivity: 4,
      photoConsent: true,
      medicalConsent: true,
      assessmentConsent: true,
      createdBy: adminUser.id,
      parentProfileId: parent1Profile.id,
    },
  })

  const student2 = await prisma.student.create({
    data: {
      firstName: 'James',
      lastName: 'Wilson',
      dateOfBirth: new Date('2011-08-22'),
      gender: 'MALE',
      nationality: 'Trinidad & Tobago',
      parish: 'San Fernando',
      address: '45 Royal Road',
      phone: '868-987-6543',
      email: 'james.wilson@student.edu',
      emergencyContact: 'Robert Wilson',
      emergencyPhone: '868-987-6543',
      emergencyRelation: 'Father',
      medicalConditions: JSON.stringify(['Asthma']),
      allergies: JSON.stringify(['Dust mites']),
      previousSchool: 'Presentation College',
      specialEducation: false,
      specialNeeds: JSON.stringify(['None identified']),
      livingArrangement: 'Both parents',
      guardians: JSON.stringify([{
        name: 'Robert Wilson',
        relationship: 'Father',
        phone: '868-987-6543',
        email: 'robert.wilson@example.com',
        occupation: 'Teacher'
      }]),
      siblings: JSON.stringify([{
        name: 'Sophia Wilson',
        age: 12,
        school: 'Naprima Girls\' High School'
      }]),
      behaviorPatterns: JSON.stringify(['Outgoing', 'Leader', 'Sometimes distracted']),
      interests: JSON.stringify(['Football', 'Music', 'Dancing']),
      strengths: JSON.stringify(['Communication', 'Teamwork', 'Creative writing']),
      challenges: JSON.stringify(['Mathematics', 'Focus during long study sessions']),
      breakfast: 'Doubles',
      bedtime: '10:00 PM - 11:00 PM',
      screenTime: 3,
      physicalActivity: 8,
      photoConsent: true,
      medicalConsent: true,
      assessmentConsent: true,
      createdBy: staffUser.id,
    },
  })

  const student3 = await prisma.student.create({
    data: {
      firstName: 'Olivia',
      lastName: 'Brown',
      dateOfBirth: new Date('2012-03-10'),
      gender: 'FEMALE',
      nationality: 'Trinidad & Tobago',
      parish: 'Arima',
      address: '78 Churchill Roosevelt Highway',
      phone: '868-555-1234',
      email: 'olivia.brown@student.edu',
      emergencyContact: 'Maria Brown',
      emergencyPhone: '868-555-1234',
      emergencyRelation: 'Mother',
      medicalConditions: JSON.stringify(['None']),
      allergies: JSON.stringify(['Peanuts']),
      previousSchool: 'Arima Central Secondary',
      specialEducation: false,
      specialNeeds: JSON.stringify(['ADHD']),
      livingArrangement: 'Single mother',
      guardians: JSON.stringify([{
        name: 'Maria Brown',
        relationship: 'Mother',
        phone: '868-555-1234',
        email: 'maria.brown@example.com',
        occupation: 'Nurse'
      }]),
      siblings: JSON.stringify([]),
      behaviorPatterns: JSON.stringify(['Creative', 'Easily distracted', 'Enthusiastic']),
      interests: JSON.stringify(['Art/Drawing', 'Music', 'Photography']),
      strengths: JSON.stringify(['Creativity', 'Visual learning', 'Artistic skills']),
      challenges: JSON.stringify(['Attention span', 'Mathematics', 'Time management']),
      breakfast: 'Fried eggs and toast',
      bedtime: '8:00 PM - 9:00 PM',
      screenTime: 4,
      physicalActivity: 3,
      photoConsent: true,
      medicalConsent: true,
      assessmentConsent: true,
      createdBy: adminUser.id,
    },
  })

  const student4 = await prisma.student.create({
    data: {
      firstName: 'Lucas',
      lastName: 'Taylor',
      dateOfBirth: new Date('2011-11-28'),
      gender: 'MALE',
      nationality: 'Trinidad & Tobago',
      parish: 'Chaguanas',
      address: '156 Endeavour Road',
      phone: '868-777-8888',
      email: 'lucas.taylor@student.edu',
      emergencyContact: 'David Taylor',
      emergencyPhone: '868-777-8888',
      emergencyRelation: 'Father',
      medicalConditions: JSON.stringify(['None']),
      allergies: JSON.stringify(['None']),
      previousSchool: 'Couva West Secondary',
      specialEducation: false,
      specialNeeds: JSON.stringify(['None identified']),
      livingArrangement: 'Both parents',
      guardians: JSON.stringify([{
        name: 'David Taylor',
        relationship: 'Father',
        phone: '868-777-8888',
        email: 'david.taylor@example.com',
        occupation: 'Engineer'
      }]),
      siblings: JSON.stringify([{
        name: 'Ava Taylor',
        age: 10,
        school: 'Chaguanas Government Primary'
      }]),
      behaviorPatterns: JSON.stringify(['Very cooperative', 'Focused', 'Independent learner']),
      interests: JSON.stringify(['Computers/Technology', 'Building things', 'Video games']),
      strengths: JSON.stringify(['Problem solving', 'Technical skills', 'Independent learning']),
      challenges: JSON.stringify(['Creative writing', 'Group discussions']),
      breakfast: 'Bread and cheese',
      bedtime: '9:00 PM - 10:00 PM',
      screenTime: 5,
      physicalActivity: 2,
      photoConsent: true,
      medicalConsent: true,
      assessmentConsent: true,
      createdBy: staffUser.id,
    },
  })

  const student5 = await prisma.student.create({
    data: {
      firstName: 'Sophia',
      lastName: 'Garcia',
      dateOfBirth: new Date('2010-07-18'),
      gender: 'FEMALE',
      nationality: 'Trinidad & Tobago',
      parish: 'Point Fortin',
      address: '89 Main Street, Point Fortin',
      phone: '868-333-6666',
      email: 'sophia.garcia@student.edu',
      emergencyContact: 'Isabella Garcia',
      emergencyPhone: '868-333-6666',
      emergencyRelation: 'Mother',
      medicalConditions: JSON.stringify(['Migraines']),
      allergies: JSON.stringify(['None']),
      previousSchool: 'Point Fortin Secondary',
      specialEducation: false,
      specialNeeds: JSON.stringify(['Test anxiety']),
      livingArrangement: 'Single mother',
      guardians: JSON.stringify([{
        name: 'Isabella Garcia',
        relationship: 'Mother',
        phone: '868-333-6666',
        email: 'isabella.garcia@example.com',
        occupation: 'Teacher'
      }]),
      siblings: JSON.stringify([]),
      behaviorPatterns: JSON.stringify(['Very shy', 'Hardworking', 'Perfectionist']),
      interests: JSON.stringify(['Reading', 'Science experiments', 'Swimming']),
      strengths: JSON.stringify(['Memorization', 'Detail-oriented', 'Science subjects']),
      challenges: JSON.stringify(['Test anxiety', 'Public speaking', 'Mathematics problem solving']),
      breakfast: 'Porridge',
      bedtime: '8:00 PM - 9:00 PM',
      screenTime: 1,
      physicalActivity: 6,
      photoConsent: true,
      medicalConsent: true,
      assessmentConsent: true,
      createdBy: adminUser.id,
    },
  })

  // Create sample sessions
  const session1 = await prisma.session.create({
    data: {
      studentId: student1.id,
      tutorId: tutor1Profile.id,
      subject: 'Mathematics',
      sessionDate: new Date('2024-01-15'),
      startTime: new Date('2024-01-15T15:00:00'),
      endTime: new Date('2024-01-15T16:00:00'),
      duration: 60,
      sessionType: 'HOMEWORK',
      location: 'Center',
      status: 'COMPLETED',
      notes: 'Student showed good understanding of algebraic concepts',
      homeworkTopics: JSON.stringify(['Quadratic equations', 'Linear functions']),
      materialsUsed: JSON.stringify(['Textbook', 'Calculator', 'Graph paper']),
      learningObjectives: JSON.stringify(['Solve quadratic equations', 'Graph linear functions']),
      progress: 85,
      nextSession: new Date('2024-01-22'),
      createdBy: tutor1User.id,
    },
  })

  const session2 = await prisma.session.create({
    data: {
      studentId: student2.id,
      tutorId: tutor2Profile.id,
      subject: 'English Language',
      sessionDate: new Date('2024-01-16'),
      startTime: new Date('2024-01-16T15:30:00'),
      endTime: new Date('2024-01-16T16:30:00'),
      duration: 60,
      sessionType: 'TUTORING',
      location: 'Center',
      status: 'COMPLETED',
      notes: 'Excellent progress in essay writing',
      homeworkTopics: JSON.stringify(['Essay structure', 'Grammar exercises']),
      materialsUsed: JSON.stringify(['Grammar book', 'Sample essays']),
      learningObjectives: JSON.stringify(['Improve essay structure', 'Master grammar rules']),
      progress: 90,
      nextSession: new Date('2024-01-23'),
      createdBy: tutor2User.id,
    },
  })

  // Create sample assessments
  await prisma.assessment.create({
    data: {
      studentId: student1.id,
      sessionId: session1.id,
      tutorId: tutor1Profile.id,
      assessmentDate: new Date('2024-01-15'),
      
      // Academic Assessment
      preparationScore: 4,
      homeworkScore: 4,
      participationScore: 5,
      understandingScore: 4,
      topicsCovered: JSON.stringify(['Quadratic equations', 'Linear functions']),
      
      // Behavioral Assessment
      behaviorScore: 5,
      focusScore: 4,
      cooperationScore: 5,
      attitudeScore: 5,
      peerInteractionScore: 4,
      
      // Emotional Assessment
      emotionalStateScore: 4,
      confidenceScore: 4,
      motivationScore: 5,
      stressIndicators: JSON.stringify(['None observed']),
      
      // Physical Assessment
      energyLevelScore: 4,
      wellbeingScore: 5,
      nutritionScore: 4,
      
      // Social Assessment
      communicationScore: 4,
      teamworkScore: 4,
      conflictResolutionScore: 4,
      
      // Cognitive Assessment
      problemSolvingScore: 5,
      criticalThinkingScore: 4,
      creativityScore: 3,
      memoryScore: 4,
      
      // Support Needs
      immediateSupport: JSON.stringify(['None']),
      resourcesNeeded: JSON.stringify(['Additional practice problems']),
      familyInvolvement: JSON.stringify(['Encourage daily practice']),
      
      // Overall Assessment
      goals: JSON.stringify(['Master quadratic equations', 'Improve problem-solving speed']),
      achievements: JSON.stringify(['Successfully solved all homework problems', 'Explained concepts clearly']),
      concerns: JSON.stringify(['None']),
      tutorNotes: 'Emma is making excellent progress in mathematics. She demonstrates strong analytical skills and a positive attitude toward learning.',
      recommendations: 'Continue with current pace, introduce more challenging problems next session.',
      followUpActions: JSON.stringify(['Provide additional practice worksheets', 'Schedule next session for next week']),
      
      // Calculated Fields
      overallScore: 4.2,
      riskLevel: 'LOW',
      
      createdBy: tutor1User.id,
    },
  })

  await prisma.assessment.create({
    data: {
      studentId: student2.id,
      sessionId: session2.id,
      tutorId: tutor2Profile.id,
      assessmentDate: new Date('2024-01-16'),
      
      // Academic Assessment
      preparationScore: 3,
      homeworkScore: 4,
      participationScore: 5,
      understandingScore: 4,
      topicsCovered: JSON.stringify(['Essay structure', 'Grammar exercises']),
      
      // Behavioral Assessment
      behaviorScore: 4,
      focusScore: 3,
      cooperationScore: 5,
      attitudeScore: 5,
      peerInteractionScore: 5,
      
      // Emotional Assessment
      emotionalStateScore: 4,
      confidenceScore: 4,
      motivationScore: 4,
      stressIndicators: JSON.stringify(['None observed']),
      
      // Physical Assessment
      energyLevelScore: 4,
      wellbeingScore: 4,
      nutritionScore: 3,
      
      // Social Assessment
      communicationScore: 5,
      teamworkScore: 5,
      conflictResolutionScore: 4,
      
      // Cognitive Assessment
      problemSolvingScore: 4,
      criticalThinkingScore: 4,
      creativityScore: 4,
      memoryScore: 4,
      
      // Support Needs
      immediateSupport: JSON.stringify(['None']),
      resourcesNeeded: JSON.stringify(['More writing prompts']),
      familyInvolvement: JSON.stringify(['Encourage reading at home']),
      
      // Overall Assessment
      goals: JSON.stringify(['Improve essay structure', 'Expand vocabulary']),
      achievements: JSON.stringify(['Excellent participation', 'Improved grammar']),
      concerns: JSON.stringify(['Occasional lack of focus']),
      tutorNotes: 'James is enthusiastic about English and shows good communication skills. He needs occasional reminders to stay on task.',
      recommendations: 'Use more engaging materials, incorporate his interests in writing topics.',
      followUpActions: JSON.stringify(['Provide creative writing prompts', 'Schedule regular reading sessions']),
      
      // Calculated Fields
      overallScore: 4.0,
      riskLevel: 'LOW',
      
      createdBy: tutor2User.id,
    },
  })

  // Create sample notifications
  await prisma.notification.create({
    data: {
      title: 'Session Reminder',
      message: 'Mathematics session with Emma Martinez scheduled for tomorrow at 3:00 PM',
      type: 'SESSION_REMINDER',
      priority: 'MEDIUM',
      status: 'UNREAD',
      userId: tutor1User.id,
      studentId: student1.id,
      scheduledFor: new Date('2024-01-21T20:00:00'),
      actionUrl: '/sessions/' + session1.id,
      actionText: 'View Session',
    },
  })

  await prisma.notification.create({
    data: {
      title: 'Assessment Alert',
      message: 'James Wilson shows signs of test anxiety, consider additional support',
      type: 'ASSESSMENT_ALERT',
      priority: 'HIGH',
      status: 'UNREAD',
      userId: tutor2User.id,
      studentId: student2.id,
      actionUrl: '/assessments/student/' + student2.id,
      actionText: 'View Assessments',
    },
  })

  // Create sample files
  await prisma.file.create({
    data: {
      filename: 'emma_homework_jan15.pdf',
      originalName: 'Emma_Homework_Jan15.pdf',
      mimeType: 'application/pdf',
      size: 2048576,
      path: '/uploads/emma_homework_jan15.pdf',
      description: 'Mathematics homework submission',
      category: 'HOMEWORK',
      userId: tutor1User.id,
      studentId: student1.id,
      sessionId: session1.id,
      tags: JSON.stringify(['mathematics', 'homework', 'quadratic equations']),
      isPublic: false,
    },
  })

  await prisma.file.create({
    data: {
      filename: 'james_essay_draft.docx',
      originalName: 'James_Essay_Draft.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 153600,
      path: '/uploads/james_essay_draft.docx',
      description: 'English essay draft for review',
      category: 'DOCUMENT',
      userId: tutor2User.id,
      studentId: student2.id,
      sessionId: session2.id,
      tags: JSON.stringify(['english', 'essay', 'draft']),
      isPublic: false,
    },
  })

  // Create sample reports
  await prisma.studentReport.create({
    data: {
      studentId: student1.id,
      reportType: 'PROGRESS',
      title: 'Monthly Progress Report - January 2024',
      description: 'Comprehensive progress report for Emma Martinez',
      data: JSON.stringify({
        overallProgress: 85,
        subjectProgress: {
          'Mathematics': 90,
          'Physics': 80,
          'Chemistry': 85
        },
        assessmentScores: [4.2, 4.0, 4.5],
        attendanceRate: 95,
        homeworkCompletion: 92
      }),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      generatedBy: tutor1User.id,
    },
  })

  await prisma.studentReport.create({
    data: {
      studentId: student2.id,
      reportType: 'ASSESSMENT',
      title: 'Learning Assessment Report',
      description: 'Detailed learning assessment for James Wilson',
      data: JSON.stringify({
        learningStyle: 'Visual',
        strengths: ['Communication', 'Creativity', 'Teamwork'],
        areasForImprovement: ['Focus', 'Mathematics'],
        recommendations: ['Use visual aids', 'Break tasks into smaller chunks']
      }),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      generatedBy: tutor2User.id,
    },
  })

  // Create system settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'SCHOOL_NAME',
        value: 'Trinidad & Tobago Homework Center',
        type: 'STRING',
        category: 'GENERAL',
      },
      {
        key: 'SCHOOL_ADDRESS',
        value: '123 Main Street, Port of Spain',
        type: 'STRING',
        category: 'GENERAL',
      },
      {
        key: 'SCHOOL_PHONE',
        value: '868-123-4567',
        type: 'STRING',
        category: 'CONTACT',
      },
      {
        key: 'SCHOOL_EMAIL',
        value: 'info@tthwcenter.edu',
        type: 'STRING',
        category: 'CONTACT',
      },
      {
        key: 'SESSION_DURATION',
        value: '60',
        type: 'NUMBER',
        category: 'ACADEMIC',
      },
      {
        key: 'MAX_STUDENTS_PER_TUTOR',
        value: '15',
        type: 'NUMBER',
        category: 'ACADEMIC',
      },
      {
        key: 'ASSESSMENT_REMINDER_DAYS',
        value: '1',
        type: 'NUMBER',
        category: 'NOTIFICATIONS',
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👥 Created ${5} students`)
  console.log(`👨‍🏫 Created ${2} tutors`)
  console.log(`📚 Created ${2} sessions`)
  console.log(`📊 Created ${2} assessments`)
  console.log(`👨‍👩‍👧‍👦 Created ${1} parent`)
  console.log(`🔔 Created ${2} notifications`)
  console.log(`📁 Created ${2} files`)
  console.log(`📈 Created ${2} reports`)
  console.log(`⚙️ Created ${8} system settings`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })