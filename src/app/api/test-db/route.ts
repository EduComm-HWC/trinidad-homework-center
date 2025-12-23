import { db } from '@/lib/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Test database connection
      const userCount = await db.user.count()
      const studentCount = await db.student.count()
      const volunteerCount = await db.volunteer.count()
      
      return res.status(200).json({
        success: true,
        message: 'Database connection successful',
        counts: {
          users: userCount,
          students: studentCount,
          volunteers: volunteerCount
        }
      })
    } catch (error) {
      console.error('Database test error:', error)
      return res.status(500).json({
        success: false,
        error: 'Database connection failed',
        message: error.message
      })
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}