'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Users, Mail, Phone, Briefcase, UserPlus, Trash2 } from 'lucide-react'

interface Volunteer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  occupation: string
  expertise: string[]
  availability: string[]
  backgroundCheckCompleted: boolean
  createdAt: string
}

export default function VolunteersTab() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('/api/volunteers')
      if (!response.ok) throw new Error('Failed to fetch volunteers')
      const data = await response.json()
      setVolunteers(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load volunteers',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this volunteer?')) return

    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete volunteer')

      toast({
        title: 'Success',
        description: 'Volunteer removed successfully',
      })

      fetchVolunteers()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove volunteer',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading volunteers...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Volunteer Directory</CardTitle>
            <CardDescription>
              {volunteers.length} volunteer{volunteers.length !== 1 ? 's' : ''} registered
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Volunteer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Volunteer</DialogTitle>
                <DialogDescription>
                  Add a new volunteer tutor to the programme
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Volunteer registration form coming soon...
              </p>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {volunteers.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No volunteers registered yet. Click "Add Volunteer" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {volunteers.map((volunteer) => (
            <Card key={volunteer.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {volunteer.firstName} {volunteer.lastName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {volunteer.occupation}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(volunteer.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Badge variant={volunteer.backgroundCheckCompleted ? 'default' : 'secondary'}>
                    {volunteer.backgroundCheckCompleted ? 'Verified' : 'Pending Verification'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{volunteer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{volunteer.phone}</span>
                  </div>
                </div>

                {volunteer.expertise && volunteer.expertise.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Areas of Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.expertise.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {volunteer.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{volunteer.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {volunteer.availability && volunteer.availability.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Available:</p>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.availability.map((day) => (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
