export interface Student {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  createdAt: string
}

export interface Class {
  id: string
  name: string
  description: string
  schedule: string
  weekDays: string[]
  startTime: string
  endTime: string
  maxStudents: number
  currentStudents: number
}

export interface PaymentPlan {
  id: string
  name: string
  durationMonths: number
  price: number
  description: string
}

export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  classId: string
  className: string
  planId: string
  planName: string
  level: 'iniciante' | 'intermediario' | 'avancado'
  startDate: string
  endDate: string
  status: 'ativa' | 'cancelada' | 'finalizada'
}

export interface Attendance {
  id: string
  enrollmentId: string
  studentName: string
  className: string
  date: string
  present: boolean
  feedback?: string
}
