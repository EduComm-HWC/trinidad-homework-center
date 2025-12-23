import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const SEA_TEST_GENERATION_SCHEMA = z.object({
  standard: z.enum(['Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5']),
  subject: z.enum(['Mathematics', 'English Language Arts', 'Science', 'Social Studies']),
  testType: z.enum(['Multiple Choice', 'True/False', 'Fill Blank', 'Short Answer', 'Picture-Based']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
  numberOfQuestions: z.number().min(5).max(50).default(20)
})

// SEA Curriculum content for Trinidad & Tobago
const SEA_CURRICULUM = {
  'Standard 1': {
    Mathematics: {
      topics: ['Number Recognition', 'Basic Shapes', 'Counting', 'Simple Addition', 'Simple Subtraction'],
      questionBank: {
        'Number Recognition': [
          { question: 'What number comes after 5?', answer: '6', type: 'Multiple Choice', options: ['4', '6', '7', '8'] },
          { question: 'Circle the number 3', answer: '3', type: 'Picture-Based', image: 'numbers-1-10' },
          { question: 'How many apples do you see? 🍎🍎🍎', answer: '3', type: 'Short Answer' }
        ],
        'Basic Shapes': [
          { question: 'What shape is a ball?', answer: 'Circle', type: 'Multiple Choice', options: ['Square', 'Circle', 'Triangle', 'Rectangle'] },
          { question: 'A box has _____ sides', answer: '6', type: 'Fill Blank' },
          { question: 'Draw a triangle', answer: 'Triangle', type: 'Picture-Based' }
        ]
      }
    },
    'English Language Arts': {
      topics: ['Phonics', 'Sight Words', 'Simple Sentences', 'Picture Comprehension'],
      questionBank: {
        'Phonics': [
          { question: 'What sound does the letter A make?', answer: 'a', type: 'Multiple Choice', options: ['a', 'b', 'c', 'd'] },
          { question: 'Cat starts with the letter _____', answer: 'C', type: 'Fill Blank' },
          { question: 'Which word rhymes with cat?', answer: 'bat', type: 'Multiple Choice', options: ['dog', 'bat', 'car', 'house'] }
        ]
      }
    },
    Science: {
      topics: ['Living Things', 'Plants', 'Animals', 'Weather'],
      questionBank: {
        'Living Things': [
          { question: 'Do plants need water to live?', answer: 'True', type: 'True/False' },
          { question: 'What do plants need to grow?', answer: 'Water, sunlight, soil', type: 'Short Answer' },
          { question: 'Which of these is a living thing?', answer: 'Dog', type: 'Multiple Choice', options: ['Rock', 'Dog', 'Chair', 'Table'] }
        ]
      }
    },
    'Social Studies': {
      topics: ['Family', 'Community Helpers', 'Trinidad & Tobago', 'Holidays'],
      questionBank: {
        'Family': [
          { question: 'Who takes care of you at home?', answer: 'Parents', type: 'Short Answer' },
          { question: 'Your mother\'s sister is your _____', answer: 'Aunt', type: 'Fill Blank' },
          { question: 'Family members love and care for each other', answer: 'True', type: 'True/False' }
        ]
      }
    }
  },
  'Standard 2': {
    Mathematics: {
      topics: ['Two-digit Numbers', 'Addition', 'Subtraction', 'Measurement', 'Time'],
      questionBank: {
        'Two-digit Numbers': [
          { question: 'What is 25 + 17?', answer: '42', type: 'Multiple Choice', options: ['40', '42', '44', '46'] },
          { question: 'Which number is greater: 67 or 76?', answer: '76', type: 'Multiple Choice', options: ['67', '76', 'They are equal', 'Cannot tell'] },
          { question: 'Write the number eighty-nine', answer: '89', type: 'Short Answer' }
        ]
      }
    },
    'English Language Arts': {
      topics: ['Reading Comprehension', 'Grammar', 'Creative Writing', 'Vocabulary'],
      questionBank: {
        'Reading Comprehension': [
          { question: 'Read the story: "The cat sat on the mat." Where did the cat sit?', answer: 'On the mat', type: 'Short Answer' },
          { question: 'What is the main character in the story?', answer: 'Cat', type: 'Multiple Choice', options: ['Dog', 'Cat', 'Mat', 'House'] }
        ]
      }
    }
  },
  'Standard 3': {
    Mathematics: {
      topics: ['Multiplication', 'Division', 'Fractions', 'Geometry', 'Problem Solving'],
      questionBank: {
        'Multiplication': [
          { question: 'What is 7 × 8?', answer: '56', type: 'Multiple Choice', options: ['54', '56', '58', '60'] },
          { question: 'If you have 3 boxes with 4 apples each, how many apples do you have?', answer: '12', type: 'Short Answer' },
          { question: '6 × 9 = _____', answer: '54', type: 'Fill Blank' }
        ]
      }
    }
  },
  'Standard 4': {
    Mathematics: {
      topics: ['Multi-digit Operations', 'Decimals', 'Area and Perimeter', 'Data Handling'],
      questionBank: {
        'Multi-digit Operations': [
          { question: 'What is 345 × 23?', answer: '7935', type: 'Multiple Choice', options: ['7935', '7955', '7975', '7995'] },
          { question: 'Calculate: 1234 + 5678', answer: '6912', type: 'Short Answer' }
        ]
      }
    }
  },
  'Standard 5': {
    Mathematics: {
      topics: ['Advanced Operations', 'Algebra', 'Geometry', 'Statistics', 'Problem Solving'],
      questionBank: {
        'Advanced Operations': [
          { question: 'If x + 5 = 12, what is x?', answer: '7', type: 'Multiple Choice', options: ['5', '6', '7', '8'] },
          { question: 'The perimeter of a square is 20 cm. What is the length of one side?', answer: '5 cm', type: 'Short Answer' },
          { question: 'Simplify: 3x + 2x - x', answer: '4x', type: 'Multiple Choice', options: ['2x', '3x', '4x', '5x'] }
        ]
      }
    }
  }
}

// Local Trinidad & Tobago context examples
const TT_CONTEXT = {
  places: ['Port of Spain', 'San Fernando', 'Arima', 'Couva', 'Point Fortin', 'Scarborough'],
  culture: ['Carnival', 'Divali', 'Eid', 'Christmas', 'Phagwa', 'Hosay'],
  wildlife: ['Scarlet Ibis', 'Leatherback Turtle', 'Ocelot', 'Manatee', 'Howler Monkey'],
  food: ['Roti', 'Doubles', 'Pelau', 'Callaloo', 'Bake and Shark', 'Souse'],
  music: ['Steelpan', 'Calypso', 'Soca', 'Chutney', 'Rapso'],
  landmarks: ['Queen\'s Park Savannah', 'Maracas Beach', 'Pitch Lake', 'Fort George', 'Asa Wright Nature Centre']
}

function generateQuestions(standard, subject, testType, numberOfQuestions, difficulty) {
  const curriculum = SEA_CURRICULUM[standard]
  if (!curriculum || !curriculum[subject]) {
    throw new Error(`Curriculum not found for ${standard} ${subject}`)
  }

  const topics = Object.keys(curriculum[subject].topics)
  const questions = []
  
  for (let i = 0; i < numberOfQuestions; i++) {
    const topic = topics[i % topics.length]
    const topicQuestions = curriculum[subject].questionBank[topic] || []
    
    if (topicQuestions.length > 0) {
      const baseQuestion = topicQuestions[i % topicQuestions.length]
      
      // Add Trinidad & Tobago context
      const contextualizedQuestion = addTTContext(baseQuestion, subject)
      
      questions.push({
        id: i + 1,
        question: contextualizedQuestion.question,
        answer: contextualizedQuestion.answer,
        type: contextualizedQuestion.type,
        options: contextualizedQuestion.options,
        topic: topic,
        difficulty: difficulty,
        points: 1,
        explanation: generateExplanation(contextualizedQuestion, subject)
      })
    }
  }
  
  return questions
}

function addTTContext(question, subject) {
  const contextualized = { ...question }
  
  // Add local context based on subject
  if (subject === 'Mathematics') {
    const ttPlaces = TT_CONTEXT.places
    const randomPlace = ttPlaces[Math.floor(Math.random() * ttPlaces.length)]
    
    if (question.question.includes('apples')) {
      contextualized.question = question.question.replace('apples', 'mangoes from ' + randomPlace)
    }
  } else if (subject === 'Social Studies') {
    const ttCulture = TT_CONTEXT.culture
    const randomCulture = ttCulture[Math.floor(Math.random() * ttCulture.length)]
    
    contextualized.question = question.question + ' (Hint: Think about ' + randomCulture + ' in Trinidad & Tobago)'
  } else if (subject === 'Science') {
    const ttWildlife = TT_CONTEXT.wildlife
    const randomAnimal = ttWildlife[Math.floor(Math.random() * ttWildlife.length)]
    
    if (question.question.includes('plants')) {
      contextualized.question = question.question.replace('plants', 'plants and animals like the ' + randomAnimal)
    }
  }
  
  return contextualized
}

function generateExplanation(question, subject) {
  const explanations = {
    'Mathematics': `This question tests your understanding of ${question.topic}. Remember to show your work and check your answer.`,
    'English Language Arts': `This question assesses your ${question.topic} skills. Read carefully and think about what the question is asking.`,
    'Science': `This question explores ${question.topic} in our Caribbean environment. Consider how this applies to Trinidad & Tobago.`,
    'Social Studies': `This question relates to ${question.topic} in our local context. Think about our community and culture.`
  }
  
  return explanations[subject] || 'Review the material and practice similar questions.'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = SEA_TEST_GENERATION_SCHEMA.parse(body)
    
    const { standard, subject, testType, difficulty, numberOfQuestions } = validatedData
    
    // Generate questions
    const questions = generateQuestions(standard, subject, testType, numberOfQuestions, difficulty)
    
    // Calculate test duration based on number of questions
    const duration = Math.max(15, Math.ceil(numberOfQuestions * 1.5)) // minutes
    
    // Generate teacher notes
    const teacherNotes = generateTeacherNotes(standard, subject, difficulty)
    
    const test = {
      id: `sea-${Date.now()}`,
      title: `${standard} ${subject} Practice Test`,
      standard: standard,
      subject: subject,
      testType: testType,
      difficulty: difficulty,
      duration: duration,
      questions: questions,
      totalQuestions: questions.length,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      instructions: generateInstructions(testType),
      teacherNotes: teacherNotes,
      generatedAt: new Date().toISOString(),
      curriculum: 'Trinidad & Tobago Ministry of Education SEA Curriculum',
      context: 'Caribbean context with local examples and cultural references'
    }
    
    return NextResponse.json({
      success: true,
      test: test
    })
    
  } catch (error) {
    console.error('SEA Test Generation Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate SEA test',
      message: error.message
    }, { status: 500 })
  }
}

function generateInstructions(testType) {
  const instructions = {
    'Multiple Choice': 'Read each question carefully and select the best answer from the options provided.',
    'True/False': 'Determine whether each statement is true or false based on your knowledge.',
    'Fill Blank': 'Fill in the blank with the correct word or phrase to complete the sentence.',
    'Short Answer': 'Write a brief but complete answer to each question. Show your work for math problems.',
    'Picture-Based': 'Look at the picture carefully and answer the questions that follow.'
  }
  
  return instructions[testType] || 'Read all questions carefully and answer to the best of your ability.'
}

function generateTeacherNotes(standard, subject, difficulty) {
  return `
    Teacher Notes for ${standard} ${subject} Test (${difficulty} Difficulty)
    
    Curriculum Alignment: This test aligns with the Trinidad & Tobago Ministry of Education SEA curriculum for ${standard}.
    
    Assessment Objectives:
    - Evaluate student understanding of key concepts
    - Identify areas needing additional support
    - Prepare students for SEA examination format
    
    Administration Guidelines:
    - Ensure students understand all instructions before beginning
    - Monitor time management throughout the test
    - Provide accommodations for students with special needs
    
    Scoring Guidelines:
    - Multiple Choice: 1 point each
    - True/False: 1 point each
    - Fill Blank: 1 point each
    - Short Answer: 1-2 points based on completeness
    - Picture-Based: 1-2 points based on accuracy
    
    Follow-up Activities:
    - Review incorrect answers with students
    - Provide additional practice on weak areas
    - Use results to inform future lesson planning
    
    Cultural Context: This test includes Trinidad & Tobago examples and cultural references to enhance relevance and engagement.
  `
}

// GET endpoint to retrieve available test options
export async function GET() {
  return NextResponse.json({
    success: true,
    options: {
      standards: ['Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5'],
      subjects: ['Mathematics', 'English Language Arts', 'Science', 'Social Studies'],
      testTypes: ['Multiple Choice', 'True/False', 'Fill Blank', 'Short Answer', 'Picture-Based'],
      difficulties: ['Easy', 'Medium', 'Hard'],
      maxQuestions: 50,
      minQuestions: 5
    },
    curriculum: 'Trinidad & Tobago Ministry of Education SEA Curriculum',
    features: [
      'Age-appropriate content for each grade level',
      'Caribbean context with local examples',
      'Cultural references throughout',
      'Ministry of Education alignment',
      'Teacher notes and guidance',
      'Download functionality for offline use'
    ]
  })
}