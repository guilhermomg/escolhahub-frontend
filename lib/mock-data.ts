import type { Student, Class, PaymentPlan, Enrollment, Attendance } from './types'

export const students: Student[] = [
  { id: '1', name: 'Ana Silva', email: 'ana@email.com', phone: '(11) 99999-1111', birthDate: '1995-03-15', createdAt: '2024-01-10' },
  { id: '2', name: 'Bruno Costa', email: 'bruno@email.com', phone: '(11) 99999-2222', birthDate: '2000-07-22', createdAt: '2024-02-05' },
  { id: '3', name: 'Carla Mendes', email: 'carla@email.com', phone: '(11) 99999-3333', birthDate: '1998-11-08', createdAt: '2024-02-15' },
  { id: '4', name: 'Diego Oliveira', email: 'diego@email.com', phone: '(11) 99999-4444', birthDate: '2002-05-30', createdAt: '2024-03-01' },
  { id: '5', name: 'Elena Santos', email: 'elena@email.com', phone: '(11) 99999-5555', birthDate: '1990-09-12', createdAt: '2024-03-10' },
  { id: '6', name: 'Felipe Rocha', email: 'felipe@email.com', phone: '(11) 99999-6666', birthDate: '2001-01-25', createdAt: '2024-03-20' },
  { id: '7', name: 'Gabriela Lima', email: 'gabi@email.com', phone: '(11) 99999-7777', birthDate: '1997-06-18', createdAt: '2024-04-01' },
  { id: '8', name: 'Henrique Alves', email: 'henrique@email.com', phone: '(11) 99999-8888', birthDate: '1999-12-03', createdAt: '2024-04-15' },
]

export const classes: Class[] = [
  { id: '1', name: 'Desenho Basico', description: 'Fundamentos do desenho para iniciantes', schedule: 'Seg/Qua 14:00-16:00', maxStudents: 10, currentStudents: 6 },
  { id: '2', name: 'Retrato e Figura Humana', description: 'Tecnicas de retrato e anatomia', schedule: 'Ter/Qui 10:00-12:00', maxStudents: 8, currentStudents: 5 },
  { id: '3', name: 'Pintura Digital', description: 'Introducao a pintura digital', schedule: 'Sex 14:00-17:00', maxStudents: 6, currentStudents: 4 },
  { id: '4', name: 'Aquarela', description: 'Tecnicas de aquarela', schedule: 'Sab 09:00-12:00', maxStudents: 8, currentStudents: 7 },
  { id: '5', name: 'Ilustracao Avancada', description: 'Projetos de ilustracao profissional', schedule: 'Seg/Qua 19:00-21:00', maxStudents: 6, currentStudents: 3 },
]

export const paymentPlans: PaymentPlan[] = [
  { id: '1', name: 'Mensal', durationMonths: 1, price: 250, description: 'Pagamento mensal sem fidelidade' },
  { id: '2', name: 'Trimestral', durationMonths: 3, price: 675, description: '10% de desconto' },
  { id: '3', name: 'Semestral', durationMonths: 6, price: 1200, description: '20% de desconto' },
  { id: '4', name: 'Anual', durationMonths: 12, price: 2100, description: '30% de desconto' },
]

export const enrollments: Enrollment[] = [
  { id: '1', studentId: '1', studentName: 'Ana Silva', classId: '1', className: 'Desenho Basico', planId: '3', planName: 'Semestral', level: 'iniciante', startDate: '2024-01-15', endDate: '2024-07-15', status: 'ativa' },
  { id: '2', studentId: '2', studentName: 'Bruno Costa', classId: '2', className: 'Retrato e Figura Humana', planId: '2', planName: 'Trimestral', level: 'intermediario', startDate: '2024-02-01', endDate: '2024-05-01', status: 'ativa' },
  { id: '3', studentId: '3', studentName: 'Carla Mendes', classId: '1', className: 'Desenho Basico', planId: '1', planName: 'Mensal', level: 'iniciante', startDate: '2024-03-01', endDate: '2024-04-01', status: 'ativa' },
  { id: '4', studentId: '4', studentName: 'Diego Oliveira', classId: '3', className: 'Pintura Digital', planId: '4', planName: 'Anual', level: 'avancado', startDate: '2024-01-10', endDate: '2025-01-10', status: 'ativa' },
  { id: '5', studentId: '5', studentName: 'Elena Santos', classId: '4', className: 'Aquarela', planId: '2', planName: 'Trimestral', level: 'intermediario', startDate: '2024-02-15', endDate: '2024-05-15', status: 'ativa' },
  { id: '6', studentId: '6', studentName: 'Felipe Rocha', classId: '5', className: 'Ilustracao Avancada', planId: '3', planName: 'Semestral', level: 'avancado', startDate: '2024-03-01', endDate: '2024-09-01', status: 'ativa' },
  { id: '7', studentId: '7', studentName: 'Gabriela Lima', classId: '1', className: 'Desenho Basico', planId: '1', planName: 'Mensal', level: 'iniciante', startDate: '2024-03-10', endDate: '2024-04-10', status: 'ativa' },
  { id: '8', studentId: '8', studentName: 'Henrique Alves', classId: '2', className: 'Retrato e Figura Humana', planId: '2', planName: 'Trimestral', level: 'intermediario', startDate: '2024-03-15', endDate: '2024-06-15', status: 'ativa' },
]

export const recentAttendance: Attendance[] = [
  { id: '1', enrollmentId: '1', studentName: 'Ana Silva', className: 'Desenho Basico', date: '2024-03-18', present: true, feedback: 'Excelente progresso no sombreamento' },
  { id: '2', enrollmentId: '2', studentName: 'Bruno Costa', className: 'Retrato e Figura Humana', date: '2024-03-19', present: true, feedback: 'Bom trabalho nas proporcoes' },
  { id: '3', enrollmentId: '3', studentName: 'Carla Mendes', className: 'Desenho Basico', date: '2024-03-18', present: false },
  { id: '4', enrollmentId: '4', studentName: 'Diego Oliveira', className: 'Pintura Digital', date: '2024-03-15', present: true, feedback: 'Dominou as tecnicas de blend' },
  { id: '5', enrollmentId: '5', studentName: 'Elena Santos', className: 'Aquarela', date: '2024-03-16', present: true },
]

export function getExpiringEnrollments(daysAhead: number = 30): Enrollment[] {
  const today = new Date()
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000)
  
  return enrollments.filter(e => {
    const endDate = new Date(e.endDate)
    return e.status === 'ativa' && endDate <= futureDate && endDate >= today
  })
}

export function getStudentsByClass(classId: string): Enrollment[] {
  return enrollments.filter(e => e.classId === classId && e.status === 'ativa')
}

export const revenueData = [
  { month: 'Out', receita: 4200 },
  { month: 'Nov', receita: 4800 },
  { month: 'Dez', receita: 5100 },
  { month: 'Jan', receita: 4600 },
  { month: 'Fev', receita: 5400 },
  { month: 'Mar', receita: 5800 },
]

export function getStudentById(id: string): Student | undefined {
  return students.find(s => s.id === id)
}

export function getEnrollmentsByStudent(studentId: string): Enrollment[] {
  return enrollments.filter(e => e.studentId === studentId)
}

export function getAttendanceByStudent(studentId: string): Attendance[] {
  const studentEnrollments = getEnrollmentsByStudent(studentId)
  const enrollmentIds = studentEnrollments.map(e => e.id)
  return recentAttendance.filter(a => enrollmentIds.includes(a.enrollmentId))
}

export function getPlanById(id: string): PaymentPlan | undefined {
  return paymentPlans.find(p => p.id === id)
}

export function calculatePresenceStats(studentId: string) {
  const attendance = getAttendanceByStudent(studentId)
  const total = attendance.length
  const present = attendance.filter(a => a.present).length
  const absent = total - present
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0
  return { total, present, absent, percentage }
}

export function getNextPaymentInfo(studentId: string) {
  const studentEnrollments = getEnrollmentsByStudent(studentId).filter(e => e.status === 'ativa')
  if (studentEnrollments.length === 0) return null
  
  const nearestEnrollment = studentEnrollments.reduce((nearest, current) => {
    return new Date(current.endDate) < new Date(nearest.endDate) ? current : nearest
  })
  
  const plan = getPlanById(nearestEnrollment.planId)
  const endDate = new Date(nearestEnrollment.endDate)
  const today = new Date()
  const daysUntilEnd = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  return {
    enrollment: nearestEnrollment,
    plan,
    daysUntilEnd,
    isExpiringSoon: daysUntilEnd <= 30 && daysUntilEnd > 0,
    isExpired: daysUntilEnd <= 0
  }
}
