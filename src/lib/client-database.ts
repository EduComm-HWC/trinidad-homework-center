'use client'

// Client-side database manager using localStorage
// This replaces the server-side file system approach

interface DatabaseSchema {
  students: any[]
  sessions: any[]
  assessments: any[]
  users: any[]
  messages: any[]
  subjects: any[]
  notifications: any[]
}

class ClientDatabase {
  private readonly DB_KEY = 'faith_tabernacle_db'

  constructor() {
    this.initializeDatabase()
  }

  private initializeDatabase(): void {
    if (typeof window === 'undefined') return
    
    const existingData = localStorage.getItem(this.DB_KEY)
    if (!existingData) {
      const initialData: DatabaseSchema = {
        students: [],
        sessions: [],
        assessments: [],
        users: [],
        messages: [],
        subjects: [
          { id: 1, name: 'Mathematics', category: 'core' },
          { id: 2, name: 'English Language', category: 'core' },
          { id: 3, name: 'Science', category: 'core' },
          { id: 4, name: 'Social Studies', category: 'core' },
          { id: 5, name: 'Creative Arts', category: 'elective' },
          { id: 6, name: 'Physical Education', category: 'elective' },
          { id: 7, name: 'Information Technology', category: 'elective' },
          { id: 8, name: 'Foreign Language', category: 'elective' },
          { id: 9, name: 'Business Studies', category: 'elective' },
          { id: 10, name: 'Technical Drawing', category: 'elective' },
          { id: 11, name: 'Geography', category: 'core' },
          { id: 12, name: 'History', category: 'core' },
          { id: 13, name: 'Biology', category: 'science' },
          { id: 14, name: 'Chemistry', category: 'science' },
          { id: 15, name: 'Physics', category: 'science' },
          { id: 16, name: 'Economics', category: 'social' },
          { id: 17, name: 'Principles of Accounts', category: 'business' },
          { id: 18, name: 'Principles of Business', category: 'business' },
          { id: 19, name: 'Literature in English', category: 'language' },
          { id: 20, name: 'Spanish', category: 'language' },
          { id: 21, name: 'French', category: 'language' },
          { id: 22, name: 'Agricultural Science', category: 'science' },
          { id: 23, name: 'Home Economics', category: 'elective' },
          { id: 24, name: 'Music', category: 'arts' },
          { id: 25, name: 'Drama', category: 'arts' }
        ],
        notifications: []
      }
      localStorage.setItem(this.DB_KEY, JSON.stringify(initialData))
    }
  }

  private getData(): DatabaseSchema {
    if (typeof window === 'undefined') {
      return {
        students: [],
        sessions: [],
        assessments: [],
        users: [],
        messages: [],
        subjects: [],
        notifications: []
      }
    }
    
    const data = localStorage.getItem(this.DB_KEY)
    return data ? JSON.parse(data) : this.getDefaultData()
  }

  private getDefaultData(): DatabaseSchema {
    return {
      students: [],
      sessions: [],
      assessments: [],
      users: [],
      messages: [],
      subjects: [],
      notifications: []
    }
  }

  private saveData(data: DatabaseSchema): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.DB_KEY, JSON.stringify(data))
  }

  // Generic CRUD operations
  public create<T extends keyof DatabaseSchema>(table: T, item: DatabaseSchema[T][0]): DatabaseSchema[T][0] {
    const data = this.getData()
    const newItem = { ...item, id: Date.now().toString() }
    data[table].push(newItem as any)
    this.saveData(data)
    return newItem
  }

  public read<T extends keyof DatabaseSchema>(table: T): DatabaseSchema[T] {
    const data = this.getData()
    return data[table]
  }

  public update<T extends keyof DatabaseSchema>(table: T, id: string, updates: Partial<DatabaseSchema[T][0]>): DatabaseSchema[T][0] | null {
    const data = this.getData()
    const index = data[table].findIndex((item: any) => item.id === id)
    if (index !== -1) {
      data[table][index] = { ...data[table][index], ...updates }
      this.saveData(data)
      return data[table][index]
    }
    return null
  }

  public delete<T extends keyof DatabaseSchema>(table: T, id: string): boolean {
    const data = this.getData()
    const index = data[table].findIndex((item: any) => item.id === id)
    if (index !== -1) {
      data[table].splice(index, 1)
      this.saveData(data)
      return true
    }
    return false
  }

  public find<T extends keyof DatabaseSchema>(table: T, predicate: (item: DatabaseSchema[T][0]) => boolean): DatabaseSchema[T][0] | null {
    const data = this.getData()
    return data[table].find(predicate) || null
  }

  public filter<T extends keyof DatabaseSchema>(table: T, predicate: (item: DatabaseSchema[T][0]) => boolean): DatabaseSchema[T] {
    const data = this.getData()
    return data[table].filter(predicate)
  }

  // Specific operations for students
  public getStudents(): any[] {
    return this.read('students')
  }

  public getStudentById(id: string): any | null {
    return this.find('students', (student) => student.id === id)
  }

  public createStudent(student: Omit<any, 'id'>): any {
    return this.create('students', student)
  }

  public updateStudent(id: string, updates: Partial<any>): any | null {
    return this.update('students', id, updates)
  }

  public deleteStudent(id: string): boolean {
    return this.delete('students', id)
  }

  // Specific operations for sessions
  public getSessions(): any[] {
    return this.read('sessions')
  }

  public getSessionById(id: string): any | null {
    return this.find('sessions', (session) => session.id === id)
  }

  public createSession(session: Omit<any, 'id'>): any {
    return this.create('sessions', session)
  }

  public updateSession(id: string, updates: Partial<any>): any | null {
    return this.update('sessions', id, updates)
  }

  public deleteSession(id: string): boolean {
    return this.delete('sessions', id)
  }

  // Specific operations for assessments
  public getAssessments(): any[] {
    return this.read('assessments')
  }

  public getAssessmentById(id: string): any | null {
    return this.find('assessments', (assessment) => assessment.id === id)
  }

  public createAssessment(assessment: Omit<any, 'id'>): any {
    return this.create('assessments', assessment)
  }

  public updateAssessment(id: string, updates: Partial<any>): any | null {
    return this.update('assessments', id, updates)
  }

  public deleteAssessment(id: string): boolean {
    return this.delete('assessments', id)
  }

  // Specific operations for users
  public getUsers(): any[] {
    return this.read('users')
  }

  public getUserById(id: string): any | null {
    return this.find('users', (user) => user.id === id)
  }

  public getUserByEmail(email: string): any | null {
    return this.find('users', (user) => user.email === email)
  }

  public createUser(user: Omit<any, 'id'>): any {
    return this.create('users', user)
  }

  public updateUser(id: string, updates: Partial<any>): any | null {
    return this.update('users', id, updates)
  }

  public deleteUser(id: string): boolean {
    return this.delete('users', id)
  }

  // Specific operations for messages
  public getMessages(): any[] {
    return this.read('messages')
  }

  public getMessageById(id: string): any | null {
    return this.find('messages', (message) => message.id === id)
  }

  public createMessage(message: Omit<any, 'id'>): any {
    return this.create('messages', message)
  }

  public updateMessage(id: string, updates: Partial<any>): any | null {
    return this.update('messages', id, updates)
  }

  public deleteMessage(id: string): boolean {
    return this.delete('messages', id)
  }

  // Specific operations for subjects
  public getSubjects(): any[] {
    return this.read('subjects')
  }

  public getSubjectById(id: string): any | null {
    return this.find('subjects', (subject) => subject.id === id)
  }

  public createSubject(subject: Omit<any, 'id'>): any {
    return this.create('subjects', subject)
  }

  public updateSubject(id: string, updates: Partial<any>): any | null {
    return this.update('subjects', id, updates)
  }

  public deleteSubject(id: string): boolean {
    return this.delete('subjects', id)
  }

  // Specific operations for notifications
  public getNotifications(): any[] {
    return this.read('notifications')
  }

  public getNotificationById(id: string): any | null {
    return this.find('notifications', (notification) => notification.id === id)
  }

  public createNotification(notification: Omit<any, 'id'>): any {
    return this.create('notifications', notification)
  }

  public updateNotification(id: string, updates: Partial<any>): any | null {
    return this.update('notifications', id, updates)
  }

  public deleteNotification(id: string): boolean {
    return this.delete('notifications', id)
  }

  // Utility methods
  public clearAllData(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.DB_KEY)
    this.initializeDatabase()
  }

  public exportData(): string {
    return JSON.stringify(this.getData(), null, 2)
  }

  public importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData)
      this.saveData(data)
    } catch (error) {
      console.error('Failed to import data:', error)
    }
  }

  // Statistics and analytics
  public getStudentCount(): number {
    return this.getStudents().length
  }

  public getSessionCount(): number {
    return this.getSessions().length
  }

  public getAssessmentCount(): number {
    return this.getAssessments().length
  }

  public getUserCount(): number {
    return this.getUsers().length
  }

  public getActiveSessionsCount(): number {
    return this.getSessions().filter(session => session.status === 'active').length
  }

  public getCompletedSessionsCount(): number {
    return this.getSessions().filter(session => session.status === 'completed').length
  }

  public getAverageAssessmentScore(): number {
    const assessments = this.getAssessments()
    if (assessments.length === 0) return 0
    const totalScore = assessments.reduce((sum, assessment) => sum + (assessment.overallScore || 0), 0)
    return totalScore / assessments.length
  }
}

// Singleton instance
export const db = new ClientDatabase()
export default db