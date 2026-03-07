"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Clock,
  Calendar,
  Pencil,
  CheckCircle2,
  XCircle,
  BookOpen,
} from "lucide-react"
import {
  getEnrollmentsByClass,
  calculateClassPresenceStats,
  formatWeekDays,
} from "@/lib/mock-data"
import type { Class } from "@/lib/types"

interface ClassDetailProps {
  classData: Class
  onEdit: (cls: Class) => void
}

export function ClassDetail({ classData, onEdit }: ClassDetailProps) {
  const enrollments = getEnrollmentsByClass(classData.id)
  const presenceStats = calculateClassPresenceStats(classData.id)
  const occupancyPercentage = Math.round(
    (classData.currentStudents / classData.maxStudents) * 100
  )
  const availableSpots = classData.maxStudents - classData.currentStudents

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      iniciante: "bg-primary/20 text-primary",
      intermediario: "bg-[oklch(0.7_0.15_250)]/20 text-[oklch(0.7_0.15_250)]",
      avancado: "bg-[oklch(0.75_0.18_55)]/20 text-[oklch(0.75_0.18_55)]",
    }
    const labels: Record<string, string> = {
      iniciante: "Iniciante",
      intermediario: "Intermediario",
      avancado: "Avancado",
    }
    return (
      <Badge variant="secondary" className={colors[level] || ""}>
        {labels[level] || level}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-card-foreground">
                {classData.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {classData.description}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit(classData)}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Capacidade</p>
                <p className="font-semibold text-card-foreground">
                  {classData.maxStudents} alunos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.7_0.15_250)]/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[oklch(0.7_0.15_250)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dias</p>
                <p className="font-semibold text-card-foreground text-sm">
                  {formatWeekDays(classData.weekDays)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.75_0.18_55)]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[oklch(0.75_0.18_55)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Horario</p>
                <p className="font-semibold text-card-foreground">
                  {classData.startTime} - {classData.endTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vagas Livres</p>
                <p className="font-semibold text-card-foreground">
                  {availableSpots} {availableSpots === 1 ? "vaga" : "vagas"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ocupacao da turma</span>
              <span className="font-medium text-card-foreground">
                {classData.currentStudents}/{classData.maxStudents} ({occupancyPercentage}%)
              </span>
            </div>
            <Progress value={occupancyPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Alunos Matriculados ({enrollments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum aluno matriculado nesta turma
              </p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {enrollment.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {enrollment.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enrollment.planName}
                        </p>
                      </div>
                    </div>
                    {getLevelBadge(enrollment.level)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Estatisticas de Presenca
            </CardTitle>
          </CardHeader>
          <CardContent>
            {presenceStats.total === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum registro de presenca
              </p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${presenceStats.percentage * 2.51} 251`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-card-foreground">
                        {presenceStats.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-lg font-semibold text-card-foreground">
                      {presenceStats.total}
                    </p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-lg font-semibold text-primary">
                        {presenceStats.present}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Presencas</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <span className="text-lg font-semibold text-destructive">
                        {presenceStats.absent}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Faltas</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
