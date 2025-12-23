// Trinidad & Tobago specific constants for the Homework Center

export const TRINIDAD_PARISHES = [
  'Port of Spain',
  'San Fernando',
  'Arima',
  'Point Fortin',
  'Chaguanas',
  'Couva-Tabaquite-Talparo',
  'Diego Martin',
  'Mayaro-Rio Claro',
  'Penal-Debe',
  'Princes Town',
  'Sangre Grande',
  'Siparia',
  'Tunapuna-Piarco',
  'San Juan-Laventille'
] as const;

export const CSEC_SUBJECTS = [
  'Mathematics',
  'English Language',
  'English Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'Information Technology',
  'Principles of Business',
  'Principles of Accounts',
  'Economics',
  'Geography',
  'History',
  'Social Studies',
  'French',
  'Spanish',
  'Physical Education & Sport',
  'Music',
  'Art & Design',
  'Theatre Arts',
  'Agricultural Science',
  'Food & Nutrition',
  'Home Economics Management',
  'Technical Drawing',
  'Building Technology',
  'Electrical & Electronic Technology',
  'Mechanical Technology',
  'Human & Social Biology',
  'Integrated Science',
  'Chemistry (Double Award)',
  'Physics (Double Award)',
  'Biology (Double Award)'
] as const;

export const LOCAL_SCHOOLS = [
  "Queen's Royal College",
  "St. Joseph's Convent (Port of Spain)",
  "St. Joseph's Convent (San Fernando)",
  "St. Mary's College",
  "Fatima College",
  "Presentation College (San Fernando)",
  "Presentation College (Chaguanas)",
  "Naparima College",
  "Naparima Girls' High School",
  "Hillview College",
  "St. Augustine Girls' High School",
  "Bishop Anstey High School",
  "Holy Faith Convent",
  "St. George's College",
  "St. Benedict's College",
  "Debe High School",
  "Pleasantville Secondary",
  "Mucurapo Secondary",
  "Trinity College",
  "Trinity College East",
  "Trinity College North",
  "Arima Central Secondary",
  "Carapichaima East Secondary",
  "Couva West Secondary",
  "Fyzabad Anglican Secondary",
  "Gasparillo Secondary",
  "La Horquetta North Secondary",
  "Marabella North Secondary",
  "Mayaro Secondary",
  "Moriah Secondary",
  "Mucurapo East Secondary",
  "Palo Seco Secondary",
  "Penal Secondary",
  "Point Fortin Secondary",
  "Princes Town Secondary",
  "Rio Claro East Secondary",
  "Sangre Grande Secondary",
  "Signal Hill Secondary",
  "Siparia West Secondary",
  "St. James Secondary",
  "St. Madeleine Secondary",
  "Tabaquite Secondary",
  "Toco Secondary",
  "Tunapuna Secondary",
  "Vessigny Secondary"
] as const;

export const LOCAL_FOODS = [
  'Doubles',
  'Roti',
  'Pelau',
  'Curry Duck',
  'Curry Chicken',
  'Callaloo',
  'Bake and Shark',
  'Corn Soup',
  'Oil Down',
  'Macaroni Pie',
  'Stewed Chicken',
  'Fried Chicken',
  'Rice and Peas',
  'Coconut Bake',
  'Fried Bake',
  'Souse',
  'Black Cake',
  'Pastelles',
  'Pone',
  'Tamarind Balls',
  'Sugarcake',
  'Toolum',
  'Coconut Drops',
  'Guava Cheese',
  'Sorrel',
  'Mauby',
  'Coconut Water'
] as const;

export const BREAKFAST_OPTIONS = [
  'Cereal with milk',
  'Bread and butter/cheese',
  'Doubles',
  'Roti',
  'Fried eggs and toast',
  'Porridge (corn, oats, rice)',
  'Coconut bake',
  'Fried bake',
  'Fruits',
  'Yogurt',
  'No breakfast',
  'Other'
] as const;

export const BEHAVIOR_PATTERNS = [
  'Very cooperative',
  'Generally cooperative',
  'Sometimes cooperative',
  'Often uncooperative',
  'Very shy',
  'Outgoing',
  'Easily distracted',
  'Focused',
  'Aggressive',
  'Passive',
  'Leader',
  'Follower',
  'Independent',
  'Needs guidance'
] as const;

export const INTERESTS = [
  'Reading',
  'Sports (football, cricket, basketball)',
  'Music',
  'Art/Drawing',
  'Video games',
  'Dancing',
  'Science experiments',
  'Building things',
  'Computers/Technology',
  'Outdoor activities',
  'Cooking',
  'Drama/Acting',
  'Swimming',
  'Cycling',
  'Board games'
] as const;

export const LEARNING_DIFFICULTIES = [
  'Dyslexia',
  'Dyscalculia',
  'Dysgraphia',
  'ADHD',
  'ADD',
  'Auditory processing disorder',
  'Visual processing disorder',
  'Memory difficulties',
  'Concentration difficulties',
  'Reading comprehension',
  'Writing difficulties',
  'Math difficulties',
  'None identified'
] as const;

export const MEDICAL_CONDITIONS = [
  'Asthma',
  'Diabetes',
  'Epilepsy',
  'Heart conditions',
  'Allergies',
  'Migraines',
  'ADHD',
  'Autism Spectrum',
  'Anxiety',
  'Depression',
  'Physical disabilities',
  'Hearing impairment',
  'Visual impairment',
  'None'
] as const;

export const ALLERGY_TYPES = [
  'Food allergies (nuts, dairy, gluten, etc.)',
  'Environmental allergies (dust, pollen, etc.)',
  'Medication allergies',
  'Insect allergies',
  'Latex allergy',
  'None'
] as const;

export const LIVING_ARRANGEMENTS = [
  'Both parents',
  'Single mother',
  'Single father',
  'Guardian (grandparent, aunt/uncle)',
  'Foster care',
  'Group home',
  'Other'
] as const;

export const GUARDIAN_RELATIONSHIPS = [
  'Mother',
  'Father',
  'Grandmother',
  'Grandfather',
  'Aunt',
  'Uncle',
  'Legal guardian',
  'Step-parent',
  'Sibling',
  'Other'
] as const;

export const SCREEN_TIME_OPTIONS = [
  'Less than 1 hour',
  '1-2 hours',
  '2-3 hours',
  '3-4 hours',
  '4-5 hours',
  'More than 5 hours'
] as const;

export const PHYSICAL_ACTIVITY_OPTIONS = [
  'None',
  '1-2 hours per week',
  '3-4 hours per week',
  '5-6 hours per week',
  '7-10 hours per week',
  'More than 10 hours per week'
] as const;

export const BEDTIME_OPTIONS = [
  'Before 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
  '9:00 PM - 10:00 PM',
  '10:00 PM - 11:00 PM',
  'After 11:00 PM'
] as const;

export const ASSESSMENT_SCALES = {
  BEHAVIOR: {
    1: 'Very Poor - Significant concerns',
    2: 'Poor - Below expectations',
    3: 'Average - Meets expectations',
    4: 'Good - Above expectations',
    5: 'Excellent - Exceeds expectations'
  },
  CONFIDENCE: {
    1: 'Very Low - No confidence',
    2: 'Low - Minimal confidence',
    3: 'Moderate - Some confidence',
    4: 'High - Good confidence',
    5: 'Very High - Excellent confidence'
  },
  PARTICIPATION: {
    1: 'Never participates',
    2: 'Rarely participates',
    3: 'Sometimes participates',
    4: 'Often participates',
    5: 'Always participates'
  },
  UNDERSTANDING: {
    1: 'No understanding',
    2: 'Minimal understanding',
    3: 'Partial understanding',
    4: 'Good understanding',
    5: 'Complete understanding'
  }
} as const;

export const STRESS_INDICATORS = [
  'Anxiety',
  'Frustration',
  'Withdrawal',
  'Irritability',
  'Fatigue',
  'Headaches',
  'Stomach issues',
  'Sleep problems',
  'Mood swings',
  'None observed'
] as const;

export const SUPPORT_NEEDS = [
  'Academic support',
  'Emotional counseling',
  'Behavioral intervention',
  'Social skills development',
  'Family support',
  'Medical attention',
  'Nutritional guidance',
  'Physical activity',
  'Creative expression',
  'Peer mentoring'
] as const;

export const CSEC_FOCUS_AREAS = [
  'Mathematical reasoning',
  'Critical thinking',
  'Problem solving',
  'Essay writing',
  'Comprehension skills',
  'Scientific method',
  'Data analysis',
  'Research skills',
  'Exam techniques',
  'Time management',
  'Study skills',
  'Note taking',
  'Memory techniques',
  'Test anxiety management'
] as const;