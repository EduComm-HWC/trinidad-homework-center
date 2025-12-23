import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CSEC_TEST_GENERATION_SCHEMA = z.object({
  form: z.enum(['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6']),
  subject: z.enum(['Mathematics', 'English Language', 'English Literature', 'Physics', 'Chemistry', 'Biology', 'Information Technology', 'Principles of Business', 'Principles of Accounts', 'Economics', 'Geography', 'History', 'Social Studies', 'Spanish', 'French', 'Physical Education', 'Visual Arts', 'Music', 'Drama', 'Agricultural Science']),
  testType: z.enum(['Multiple Choice', 'Essay', 'Practical', 'Structured Questions', 'Case Study']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
  numberOfQuestions: z.number().min(5).max(50).default(20)
})

// CSEC Curriculum content for Trinidad & Tobago
const CSEC_CURRICULUM = {
  'Form 1': {
    Mathematics: {
      topics: ['Number Theory', 'Algebraic Expressions', 'Geometry', 'Measurement', 'Statistics'],
      questionBank: {
        'Number Theory': [
          { question: 'What is the prime factorization of 84?', answer: '2² × 3 × 7', type: 'Short Answer' },
          { question: 'Calculate the LCM of 12 and 18', answer: '36', type: 'Multiple Choice', options: ['24', '36', '48', '72'] },
          { question: 'Which of the following is a composite number?', answer: '15', type: 'Multiple Choice', options: ['13', '15', '17', '19'] }
        ],
        'Algebraic Expressions': [
          { question: 'Simplify: 3x + 2y - x + 4y', answer: '2x + 6y', type: 'Multiple Choice', options: ['2x + 6y', '4x + 2y', '2x - 2y', '4x + 6y'] },
          { question: 'Factorize: x² - 9', answer: '(x - 3)(x + 3)', type: 'Short Answer' },
          { question: 'Expand: (2x + 3)²', answer: '4x² + 12x + 9', type: 'Short Answer' }
        ]
      }
    },
    'Form 2': {
      Mathematics: {
        topics: ['Linear Equations', 'Quadratic Equations', 'Coordinate Geometry', 'Trigonometry', 'Probability'],
        questionBank: {
          'Linear Equations': [
            { question: 'Solve: 2x + 5 = 13', answer: 'x = 4', type: 'Multiple Choice', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'] },
            { question: 'Find the equation of a line passing through (2,3) and (4,7)', answer: 'y = 2x - 1', type: 'Short Answer' }
          ]
        }
      }
    },
    'Form 3': {
      Mathematics: {
        topics: ['Advanced Algebra', 'Functions', 'Sequences and Series', 'Vectors', 'Matrices'],
        questionBank: {
          'Functions': [
            { question: 'Given f(x) = 2x + 3, find f(5)', answer: '13', type: 'Multiple Choice', options: ['10', '11', '12', '13'] },
            { question: 'Find the domain of f(x) = 1/(x-2)', answer: 'x ≠ 2', type: 'Short Answer' }
          ]
        }
      }
    },
    'Form 4': {
      Mathematics: {
        topics: ['Calculus', 'Advanced Trigonometry', 'Complex Numbers', 'Differentiation', 'Integration'],
        questionBank: {
          'Calculus': [
            { question: 'Find the derivative of f(x) = x³ + 2x² - 5x + 1', answer: '3x² + 4x - 5', type: 'Multiple Choice', options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x² + 4x - 5', '3x² + 4x + 1'] },
            { question: 'Calculate the integral of 2x + 3', answer: 'x² + 3x + C', type: 'Short Answer' }
          ]
        }
      }
    },
    'Form 5': {
      Mathematics: {
        topics: ['Advanced Calculus', 'Differential Equations', 'Probability Distributions', 'Statistical Analysis', 'CSEC Preparation'],
        questionBank: {
          'CSEC Preparation': [
            { question: 'A CSEC mathematics paper has 60 multiple choice questions. If a student guesses randomly, what is the expected number of correct answers?', answer: '15', type: 'Multiple Choice', options: ['12', '15', '18', '20'] },
            { question: 'The CSEC mathematics exam is 2 hours 30 minutes long. How many minutes is this?', answer: '150', type: 'Short Answer' }
          ]
        }
      }
    },
    'Form 6': {
      Mathematics: {
        topics: ['Advanced Mathematics', 'Further Calculus', 'Mathematical Modeling', 'Cape Level Topics', 'University Preparation'],
        questionBank: {
          'Advanced Mathematics': [
            { question: 'Solve the differential equation dy/dx = 2x + 3', answer: 'y = x² + 3x + C', type: 'Short Answer' },
            { question: 'Find the limit as x approaches 0 of sin(x)/x', answer: '1', type: 'Multiple Choice', options: ['0', '1', '∞', 'undefined'] }
          ]
        }
      }
    }
  },
  'Physics': {
    'Form 4': {
      topics: ['Mechanics', 'Thermodynamics', 'Waves', 'Electricity', 'Magnetism'],
      questionBank: {
        'Mechanics': [
          { question: 'A car accelerates from 0 to 20 m/s in 5 seconds. What is its acceleration?', answer: '4 m/s²', type: 'Multiple Choice', options: ['2 m/s²', '4 m/s²', '6 m/s²', '8 m/s²'] },
          { question: 'Calculate the kinetic energy of a 1000 kg car moving at 10 m/s', answer: '50,000 J', type: 'Short Answer' }
        ]
      }
    }
  },
  'Chemistry': {
    'Form 4': {
      topics: ['Atomic Structure', 'Chemical Bonding', 'Periodic Table', 'Chemical Reactions', 'Stoichiometry'],
      questionBank: {
        'Atomic Structure': [
          { question: 'What is the atomic number of Carbon?', answer: '6', type: 'Multiple Choice', options: ['4', '6', '8', '12'] },
          { question: 'How many electrons are in the outer shell of Oxygen?', answer: '6', type: 'Short Answer' }
        ]
      }
    }
  },
  'Biology': {
    'Form 4': {
      topics: ['Cell Structure', 'Genetics', 'Evolution', 'Ecology', 'Human Biology'],
      questionBank: {
        'Cell Structure': [
          { question: 'What is the function of mitochondria in cells?', answer: 'Energy production (ATP synthesis)', type: 'Multiple Choice', options: ['Protein synthesis', 'Energy production', 'DNA replication', 'Cell division'] },
          { question: 'Which organelle is known as the "powerhouse of the cell"?', answer: 'Mitochondria', type: 'Short Answer' }
        ]
      }
    }
  },
  'English Language': {
    'Form 4': {
      topics: ['Comprehension', 'Grammar', 'Essay Writing', 'Summary Writing', 'Creative Writing'],
      questionBank: {
        'Comprehension': [
          { question: 'Read the passage about Trinidad Carnival and answer: What is the main theme of the passage?', answer: 'Cultural celebration and unity', type: 'Essay' },
          { question: 'Identify the literary devices used in the given poem about the Caribbean Sea', answer: 'Metaphor, personification, imagery', type: 'Short Answer' }
        ]
      }
    }
  }
}

// Local Trinidad & Tobago context for CSEC
const TT_CSEC_CONTEXT = {
  places: ['Port of Spain', 'San Fernando', 'Arima', 'Couva', 'Point Fortin', 'Scarborough', 'Tobago'],
  environment: ['Caribbean Sea', 'Northern Range', 'Nariva Swamp', 'Pitch Lake', 'Asa Wright Nature Centre'],
  culture: ['Carnival', 'Divali', 'Eid', 'Phagwa', 'Hosay', 'Steelpan'],
  economy: ['Energy sector', 'Tourism', 'Agriculture', 'Manufacturing'],
  wildlife: ['Scarlet Ibis', 'Leatherback Turtle', 'Ocelot', 'Manatee', 'Howler Monkey'],
  education: ['CSEC exams', 'CAPE exams', 'University of the West Indies', 'UTT', 'Costaatt'],
  issues: ['Climate change', 'Sustainable development', 'Renewable energy', 'Environmental protection']
}

function generateQuestions(form, subject, testType, numberOfQuestions, difficulty) {
  const curriculum = CSEC_CURRICULUM[form]
  if (!curriculum || !curriculum[subject]) {
    throw new Error(`Curriculum not found for ${form} ${subject}`)
  }

  const topics = Object.keys(curriculum[subject].topics)
  const questions = []
  
  for (let i = 0; i < numberOfQuestions; i++) {
    const topic = topics[i % topics.length]
    const topicQuestions = curriculum[subject].questionBank[topic] || []
    
    if (topicQuestions.length > 0) {
      const baseQuestion = topicQuestions[i % topicQuestions.length]
      
      // Add Trinidad & Tobago CSEC context
      const contextualizedQuestion = addCSECContext(baseQuestion, subject)
      
      questions.push({
        id: i + 1,
        question: contextualizedQuestion.question,
        answer: contextualizedQuestion.answer,
        type: contextualizedQuestion.type,
        options: contextualizedQuestion.options,
        topic: topic,
        difficulty: difficulty,
        points: calculatePoints(testType, difficulty),
        explanation: generateCSECExplanation(contextualizedQuestion, subject),
        csecRelevance: getCSECRelevance(topic, subject)
      })
    }
  }
  
  return questions
}

function addCSECContext(question, subject) {
  const contextualized = { ...question }
  
  // Add CSEC-specific context
  if (subject === 'Mathematics') {
    const ttPlaces = TT_CSEC_CONTEXT.places
    const randomPlace = ttPlaces[Math.floor(Math.random() * ttPlaces.length)]
    
    contextualized.question += ` (CSEC Context: Consider a scenario in ${randomPlace})`
  } else if (subject === 'Physics') {
    const ttEnvironment = TT_CSEC_CONTEXT.environment
    const randomEnv = ttEnvironment[Math.floor(Math.random() * ttEnvironment.length)]
    
    contextualized.question += ` (CSEC Context: Relate to ${randomEnv} in Trinidad & Tobago)`
  } else if (subject === 'Biology') {
    const ttWildlife = TT_CSEC_CONTEXT.wildlife
    const randomAnimal = ttWildlife[Math.floor(Math.random() * ttWildlife.length)]
    
    contextualized.question += ` (CSEC Context: Consider the ${randomAnimal} native to Trinidad & Tobago)`
  } else if (subject === 'English Language') {
    const ttCulture = TT_CSEC_CONTEXT.culture
    const randomCulture = ttCulture[Math.floor(Math.random() * ttCulture.length)]
    
    contextualized.question += ` (CSEC Context: Write about ${randomCulture} in the Caribbean context)`
  } else if (subject === 'Chemistry') {
    const ttEconomy = TT_CSEC_CONTEXT.economy
    const randomSector = ttEconomy[Math.floor(Math.random() * ttEconomy.length)]
    
    contextualized.question += ` (CSEC Context: Apply to ${randomSector} in Trinidad & Tobago)`
  }
  
  return contextualized
}

function calculatePoints(testType, difficulty) {
  const basePoints = {
    'Multiple Choice': 1,
    'Essay': 5,
    'Practical': 3,
    'Structured Questions': 2,
    'Case Study': 4
  }
  
  const difficultyMultiplier = {
    'Easy': 1,
    'Medium': 1.5,
    'Hard': 2
  }
  
  return basePoints[testType] * difficultyMultiplier[difficulty]
}

function generateCSECExplanation(question, subject) {
  const explanations = {
    'Mathematics': `This CSEC question tests your understanding of ${question.topic}. CSEC Mathematics requires precise calculations and clear working. Remember to show all steps for full marks.`,
    'Physics': `This CSEC Physics question relates to ${question.topic}. CSEC Physics emphasizes both theoretical understanding and practical applications. Consider real-world examples from Trinidad & Tobago.`,
    'Chemistry': `This CSEC Chemistry question covers ${question.topic}. CSEC Chemistry requires knowledge of chemical principles and their applications. Think about local chemical industries.`,
    'Biology': `This CSEC Biology question explores ${question.topic}. CSEC Biology includes local Caribbean ecosystems and biodiversity. Consider Trinidad & Tobago's unique flora and fauna.`,
    'English Language': `This CSEC English question assesses your ${question.topic} skills. CSEC English requires clear expression, proper grammar, and understanding of Caribbean literature themes.`,
    'English Literature': `This CSEC Literature question analyzes ${question.topic}. CSEC Literature includes Caribbean authors and themes. Consider the cultural context of the works.`
  }
  
  return explanations[subject] || 'Review the CSEC syllabus and practice similar questions.'
}

function getCSECRelevance(topic, subject) {
  const relevanceMap = {
    'Mathematics': 'Essential for CSEC Paper 1 and Paper 2',
    'Physics': 'Core topic for CSEC Physics Paper 2',
    'Chemistry': 'Fundamental for CSEC Chemistry examinations',
    'Biology': 'Key area for CSEC Biology Paper 1',
    'English Language': 'Critical for CSEC English Paper 1 and Paper 2',
    'English Literature': 'Important for CSEC Literature Paper 1 and Paper 2'
  }
  
  return relevanceMap[subject] || 'Relevant to CSEC examination'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CSEC_TEST_GENERATION_SCHEMA.parse(body)
    
    const { form, subject, testType, difficulty, numberOfQuestions } = validatedData
    
    // Generate questions
    const questions = generateQuestions(form, subject, testType, numberOfQuestions, difficulty)
    
    // Calculate test duration based on question types
    const duration = calculateTestDuration(testType, numberOfQuestions)
    
    // Generate CSEC teacher notes
    const teacherNotes = generateCSECTeacherNotes(form, subject, difficulty)
    
    const test = {
      id: `csec-${Date.now()}`,
      title: `${form} ${subject} CSEC Practice Test`,
      form: form,
      subject: subject,
      testType: testType,
      difficulty: difficulty,
      duration: duration,
      questions: questions,
      totalQuestions: questions.length,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      instructions: generateCSECInstructions(testType),
      teacherNotes: teacherNotes,
      generatedAt: new Date().toISOString(),
      curriculum: 'Caribbean Secondary Education Certificate (CSEC) - Trinidad & Tobago',
      examBoard: 'Caribbean Examinations Council (CXC)',
      context: 'Trinidad & Tobago and Caribbean context with local examples',
      csecTips: generateCSECTips(subject)
    }
    
    return NextResponse.json({
      success: true,
      test: test
    })
    
  } catch (error) {
    console.error('CSEC Test Generation Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate CSEC test',
      message: error.message
    }, { status: 500 })
  }
}

function calculateTestDuration(testType, numberOfQuestions) {
  const timePerQuestion = {
    'Multiple Choice': 1.5, // minutes
    'Essay': 15, // minutes
    'Practical': 10, // minutes
    'Structured Questions': 5, // minutes
    'Case Study': 20 // minutes
  }
  
  return Math.max(30, Math.ceil(numberOfQuestions * timePerQuestion[testType]))
}

function generateCSECInstructions(testType) {
  const instructions = {
    'Multiple Choice': 'Read each question carefully and select the best answer. No marks are deducted for wrong answers in CSEC multiple choice.',
    'Essay': 'Write well-structured essays with clear introduction, body paragraphs, and conclusion. CSEC essays require proper grammar and spelling.',
    'Practical': 'Follow the practical instructions carefully. Show all observations and calculations. CSEC practicals require proper safety procedures.',
    'Structured Questions': 'Answer all parts of each question. Show working where required. CSEC structured questions test depth of understanding.',
    'Case Study': 'Analyze the case study using CSEC principles. Support your answers with evidence from the provided materials.'
  }
  
  return instructions[testType] || 'Follow CSEC examination guidelines and answer all questions to the best of your ability.'
}

function generateCSECTeacherNotes(form, subject, difficulty) {
  return `
    CSEC Teacher Notes for ${form} ${subject} Test (${difficulty} Difficulty)
    
    Curriculum Alignment: This test aligns with the CSEC syllabus for ${subject} at the ${form} level.
    
    Assessment Objectives:
    - Evaluate student understanding of CSEC key concepts
    - Prepare students for CSEC examination format
    - Identify areas needing additional support
    - Practice time management for CSEC exams
    
    CSEC Examination Tips:
    - Multiple Choice: Process of elimination, read all options
    - Essays: Plan before writing, use Caribbean examples
    - Practicals: Follow safety procedures, record observations
    - Time Management: Allocate time based on marks per question
    
    Marking Scheme:
    - Follow CSEC marking criteria
    - Award method marks for working
    - Emphasize Caribbean context where applicable
    - Check for proper terminology and units
    
    Follow-up Activities:
    - Review CSEC past papers
    - Focus on weak areas identified
    - Practice under timed conditions
    - Use CSEC study guides and resources
    
    Local Context: This test includes Trinidad & Tobago examples relevant to CSEC examinations.
  `
}

function generateCSECTips(subject) {
  const tips = {
    'Mathematics': [
      'Show all working for method marks',
      'Check calculations carefully',
      'Use correct mathematical notation',
      'Practice with past CSEC papers'
    ],
    'Physics': [
      'Draw clear diagrams where required',
      'Show formula substitutions',
      'Include units in final answers',
      'Understand practical applications'
    ],
    'Chemistry': [
      'Write balanced chemical equations',
      'Include state symbols',
      'Show calculation steps',
      'Know laboratory safety procedures'
    ],
    'Biology': [
      'Use correct biological terminology',
      'Draw clear biological diagrams',
      'Include Caribbean examples',
      'Understand ecological concepts'
    ],
    'English Language': [
      'Plan essays before writing',
      'Use proper grammar and spelling',
      'Include Caribbean context',
      'Manage time effectively'
    ]
  }
  
  return tips[subject] || ['Study CSEC syllabus carefully', 'Practice with past papers', 'Manage time during exams']
}

// GET endpoint to retrieve available test options
export async function GET() {
  return NextResponse.json({
    success: true,
    options: {
      forms: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'],
      subjects: [
        'Mathematics', 'English Language', 'English Literature', 
        'Physics', 'Chemistry', 'Biology', 
        'Information Technology', 'Principles of Business', 'Principles of Accounts', 
        'Economics', 'Geography', 'History', 'Social Studies', 
        'Spanish', 'French', 'Physical Education', 'Visual Arts', 
        'Music', 'Drama', 'Agricultural Science'
      ],
      testTypes: ['Multiple Choice', 'Essay', 'Practical', 'Structured Questions', 'Case Study'],
      difficulties: ['Easy', 'Medium', 'Hard'],
      maxQuestions: 50,
      minQuestions: 5
    },
    curriculum: 'Caribbean Secondary Education Certificate (CSEC)',
    examBoard: 'Caribbean Examinations Council (CXC)',
    features: [
      'CSEC syllabus alignment',
      'Trinidad & Tobago context',
      'Caribbean examples and case studies',
      'CSEC examination format preparation',
      'Teacher notes and marking schemes',
      'Time management practice',
      'Past paper integration'
    ]
  })
}