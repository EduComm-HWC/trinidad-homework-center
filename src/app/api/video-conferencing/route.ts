import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const VIDEO_CONFERENCING_SCHEMA = z.object({
  action: z.enum(['create', 'join', 'end', 'schedule', 'recordings']),
  sessionId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  participantIds: z.array(z.string()).optional(),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  hostId: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recordingEnabled: z.boolean().default(true),
  password: z.string().optional()
})

// Jitsi Meet configuration
const JITSI_CONFIG = {
  baseUrl: process.env.JITSI_BASE_URL || 'https://meet.jit.si',
  appId: process.env.JITSI_APP_ID || 'vpaas-magic-cookie-a7716492ef834bfbb8c41717',
  appSecret: process.env.JITSI_APP_SECRET || 'secret',
  features: {
    'recording': true,
    'livestreaming': true,
    'transcription': true,
    'screen-sharing': true,
    'chat': true,
    'raise-hand': true,
    'breakout-rooms': true,
    'whiteboard': true,
    'file-sharing': true,
    'polls': true,
    'reactions': true,
    'video-quality': 720,
    'audio-quality': 'stereo'
  }
}

// Trinidad & Tobago video conferencing context
const TT_VIDEO_CONTEXT = {
  localTimezones: [
    'America/Port_of_Spain',
    'America/Port_of_Spain'
  ],
  bandwidthConsiderations: [
    'Variable internet speeds across islands',
    'Mobile data usage concerns',
    'Rural area connectivity issues'
  ],
  culturalAdaptations: [
    'Flexible scheduling for family commitments',
    'Support for Caribbean English accents',
    'Cultural sensitivity in interactions',
    'Accommodation for religious observances'
  ],
  localAlternatives: [
    'Community centers with internet',
    'School computer labs',
    'Public library facilities',
    'Church community halls',
    'Community broadband hotspots'
  ]
}

// In-memory session storage (in production, use database)
const videoSessions = new Map()

function generateJitsiMeetingId() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `faith-tabernacle-${timestamp}-${random}`
}

function createJitsiSession(sessionData) {
  const meetingId = generateJitsiMeetingId()
  const password = sessionData.password || Math.random().toString(36).substring(2, 10)
  
  const session = {
    id: meetingId,
    sessionId: sessionData.sessionId || meetingId,
    title: sessionData.title || 'Faith Tabernacle Homework Center Session',
    description: sessionData.description || 'Virtual tutoring session',
    hostId: sessionData.hostId,
    participantIds: sessionData.participantIds || [],
    scheduledStart: sessionData.scheduledStart || new Date().toISOString(),
    scheduledEnd: sessionData.scheduledEnd || new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour default
    actualStart: null,
    actualEnd: null,
    meetingUrl: `${JITSI_CONFIG.baseUrl}/${meetingId}`,
    meetingId: meetingId,
    password: password,
    status: 'SCHEDULED',
    recordingEnabled: sessionData.recordingEnabled !== false,
    recordingUrl: null,
    notes: sessionData.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: {
      ...JITSI_CONFIG.features,
      recording: sessionData.recordingEnabled !== false,
      transcription: true,
      chat: true,
      screenSharing: true,
      whiteboard: true,
      fileSharing: true,
      polls: true,
      breakoutRooms: sessionData.participantIds && sessionData.participantIds.length > 4
    },
    trinidadContext: {
      timezone: TT_VIDEO_CONTEXT.localTimezones[0],
      bandwidthOptimized: true,
      culturalAdaptations: TT_VIDEO_CONTEXT.culturalAdaptations,
      localAlternatives: TT_VIDEO_CONTEXT.localAlternatives,
      emergencyContacts: ['Technical support: +1-868-XXX-XXXX', 'Coordinator: +1-868-XXX-XXXX']
    }
  }
  
  // Store session
  videoSessions.set(meetingId, session)
  
  return session
}

function generateJitsiToken(sessionId, userRole = 'participant') {
  // In production, use JWT with proper claims
  const payload = {
    iss: JITSI_CONFIG.appId,
    aud: 'jitsi',
    sub: sessionId,
    room: sessionId,
    context: {
      user: {
        role: userRole,
        name: 'Faith Tabernacle User',
        avatar: 'https://example.com/avatar.png',
        email: 'user@faithtabernacle.edu.tt'
      },
      features: JITSI_CONFIG.features
    }
  }
  
  // For demo purposes, return mock token
  // In production, sign with appSecret
  return btoa(JSON.stringify(payload))
}

function validateSessionAccess(sessionId, userId, userRole = 'participant') {
  const session = videoSessions.get(sessionId)
  
  if (!session) {
    return { valid: false, error: 'Session not found' }
  }
  
  // Check if user is host or participant
  const isHost = session.hostId === userId
  const isParticipant = session.participantIds.includes(userId)
  
  if (!isHost && !isParticipant) {
    return { valid: false, error: 'Access denied' }
  }
  
  // Check session status
  if (session.status === 'ENDED') {
    return { valid: false, error: 'Session has ended' }
  }
  
  // Check time
  const now = new Date()
  const startTime = new Date(session.scheduledStart)
  const endTime = new Date(session.scheduledEnd)
  
  if (now < startTime) {
    return { valid: false, error: 'Session has not started yet' }
  }
  
  if (now > endTime) {
    return { valid: false, error: 'Session has ended' }
  }
  
  return { valid: true, session, userRole: isHost ? 'host' : 'participant' }
}

function updateSessionStatus(sessionId, status, additionalData = {}) {
  const session = videoSessions.get(sessionId)
  
  if (!session) {
    throw new Error('Session not found')
  }
  
  session.status = status
  session.updatedAt = new Date().toISOString()
  
  if (status === 'IN_PROGRESS' && !session.actualStart) {
    session.actualStart = new Date().toISOString()
  }
  
  if (status === 'COMPLETED' && !session.actualEnd) {
    session.actualEnd = new Date().toISOString()
  }
  
  // Add additional data
  Object.assign(session, additionalData)
  
  videoSessions.set(sessionId, session)
  
  return session
}

function generateRecordingUrl(sessionId) {
  const session = videoSessions.get(sessionId)
  
  if (!session || !session.recordingEnabled) {
    return null
  }
  
  // In production, this would be the actual recording URL
  // For demo, return mock URL
  return `${JITSI_CONFIG.baseUrl}/recordings/${sessionId}`
}

function sendSessionNotifications(session, action) {
  const notifications = []
  
  switch (action) {
    case 'created':
      notifications.push({
        type: 'VIDEO_SESSION_INVITE',
        recipientIds: session.participantIds,
        title: 'Video Session Invitation',
        message: `You have been invited to: ${session.title}`,
        data: {
          sessionId: session.id,
          meetingUrl: session.meetingUrl,
          password: session.password,
          scheduledStart: session.scheduledStart
        }
      })
      break
      
    case 'starting':
      notifications.push({
        type: 'SESSION_REMINDER',
        recipientIds: [session.hostId, ...session.participantIds],
        title: 'Session Starting Soon',
        message: `Your video session "${session.title}" is starting soon`,
        data: {
          sessionId: session.id,
          meetingUrl: session.meetingUrl,
          password: session.password
        }
      })
      break
      
    case 'ended':
      notifications.push({
        type: 'SESSION_COMPLETE',
        recipientIds: [session.hostId, ...session.participantIds],
        title: 'Session Completed',
        message: `The video session "${session.title}" has ended`,
        data: {
          sessionId: session.id,
          recordingUrl: session.recordingUrl,
          duration: session.actualStart && session.actualEnd 
            ? Math.round((new Date(session.actualEnd) - new Date(session.actualStart)) / 1000 / 60)
            : null
        }
      })
      break
  }
  
  return notifications
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = VIDEO_CONFERENCING_SCHEMA.parse(body)
    
    const { action, sessionId, ...data } = validatedData
    
    switch (action) {
      case 'create':
        const session = createJitsiSession(data)
        const notifications = sendSessionNotifications(session, 'created')
        
        return NextResponse.json({
          success: true,
          session: session,
          notifications: notifications,
          jitsiConfig: {
            url: session.meetingUrl,
            token: generateJitsiToken(session.id, 'host'),
            password: session.password,
            features: session.features
          }
        })
        
      case 'join':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }
        
        const access = validateSessionAccess(sessionId, data.hostId)
        
        if (!access.valid) {
          return NextResponse.json({
            success: false,
            error: access.error
          }, { status: 403 })
        }
        
        // Update session status
        const updatedSession = updateSessionStatus(sessionId, 'IN_PROGRESS')
        sendSessionNotifications(updatedSession, 'starting')
        
        return NextResponse.json({
          success: true,
          session: updatedSession,
          jitsiConfig: {
            url: updatedSession.meetingUrl,
            token: generateJitsiToken(sessionId, access.userRole),
            password: updatedSession.password,
            userRole: access.userRole,
            features: updatedSession.features,
            trinidadContext: updatedSession.trinidadContext
          }
        })
        
      case 'end':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }
        
        const session = videoSessions.get(sessionId)
        if (!session) {
          return NextResponse.json({
            success: false,
            error: 'Session not found'
          }, { status: 404 })
        }
        
        // Update session status
        const endedSession = updateSessionStatus(sessionId, 'COMPLETED', {
          recordingUrl: generateRecordingUrl(sessionId)
        })
        
        const notifications = sendSessionNotifications(endedSession, 'ended')
        
        return NextResponse.json({
          success: true,
          session: endedSession,
          notifications: notifications
        })
        
      case 'schedule':
        const scheduledSession = createJitsiSession({
          ...data,
          status: 'SCHEDULED'
        })
        
        return NextResponse.json({
          success: true,
          session: scheduledSession,
          message: 'Video session scheduled successfully'
        })
        
      case 'recordings':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }
        
        const sessionForRecordings = videoSessions.get(sessionId)
        if (!sessionForRecordings) {
          return NextResponse.json({
            success: false,
            error: 'Session not found'
          }, { status: 404 })
        }
        
        // Mock recording data
        const recordings = sessionForRecordings.recordingEnabled ? [{
          id: `recording-${sessionId}`,
          sessionId: sessionId,
          title: sessionForRecordings.title,
          url: generateRecordingUrl(sessionId),
          duration: sessionForRecordings.actualStart && sessionForRecordings.actualEnd 
            ? Math.round((new Date(sessionForRecordings.actualEnd) - new Date(sessionForRecordings.actualStart)) / 1000 / 60)
            : null,
          size: '125MB',
          format: 'MP4',
          createdAt: sessionForRecordings.actualStart,
          availableUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        }] : []
        
        return NextResponse.json({
          success: true,
          recordings: recordings,
          session: sessionForRecordings
        })
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 })
    }
    
  } catch (error) {
    console.error('Video Conferencing Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process video conferencing request',
      message: error.message
    }, { status: 500 })
  }
}

// GET endpoint to retrieve session information
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  
  if (sessionId) {
    const session = videoSessions.get(sessionId)
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Session not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      session: session
    })
  }
  
  // Return all sessions
  const allSessions = Array.from(videoSessions.values())
  
  return NextResponse.json({
    success: true,
    sessions: allSessions,
    config: {
      jitsi: JITSI_CONFIG,
      trinidadContext: TT_VIDEO_CONTEXT
    },
    features: [
      'HD video quality',
      'Screen sharing',
      'Recording and transcription',
      'Breakout rooms',
      'Whiteboard collaboration',
      'File sharing',
      'Chat and reactions',
      'Polls and surveys',
      'Mobile accessibility',
      'Trinidad & Tobago optimization'
    ]
  })
}