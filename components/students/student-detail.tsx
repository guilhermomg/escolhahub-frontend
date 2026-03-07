"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Pencil,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react"
import {
  getEnrollmentsByStudent,
  calculatePresenceStats,
  getNextPaymentInfo,
} from "@/lib/mock-data"
import type { Student } from "@/lib/types"

interface StudentDetailProps {
  student: Student
  onClose: () => void
  onEdit: () => void
}

export function StudentDetail({ student, onClose, onEdit }: StudentDetailProps) {
  const enrollments = getEnrollmentsByStudent(student.id)
  const presenceStats = calculatePresenceStats(student.id)
  const paymentInfo = getNextPaymentInfo(student.id)

  const activeEnrollments = enrollments.filter((e) => e.status === "ativa")

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR")
  }

  const levelColors = {
    iniciante: "bg-chart-2/20 text-chart-2 border-chart-2/30",
    intermediario: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    avancado: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  }

  const levelLabels = {
    iniciante: "Iniciante",
    intermediario: "Intermediario",
    avancado: "Avancado",
  }

  return (
    <Card className="bg-card border-border sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Aluno desde {formatDate(student.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Contato</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Nascimento: {formatDate(student.birthDate)}</span>
            </div>
          </div>
        </div>

        {/* Payment Alert */}
        {paymentInfo && (paymentInfo.isExpiringSoon || paymentInfo.isExpired) && (
          <div
            className={`p-3 rounded-lg flex items-start gap-3 ${
              paymentInfo.isExpired
                ? "bg-destructive/10 border border-destructive/30"
                : "bg-chart-3/10 border border-chart-3/30"
            }`}
          >
            <AlertTriangle
              className={`w-5 h-5 shrink-0 ${
                paymentInfo.isExpired ? "text-destructive" : "text-chart-3"
              }`}
            />
            <div>
              <p
                className={`text-sm font-medium ${
                  paymentInfo.isExpired ? "text-destructive" : "text-chart-3"
                }`}
              >
                {paymentInfo.isExpired
                  ? "Plano vencido!"
                  : `Plano vence em ${paymentInfo.daysUntilEnd} dias`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {paymentInfo.enrollment.planName} - {paymentInfo.enrollment.className}
              </p>
            </div>
          </div>
        )}

        {/* Financial Summary */}
        {paymentInfo && paymentInfo.plan && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Situacao Financeira
            </h4>
            <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plano atual</span>
                <span className="font-medium">{paymentInfo.plan.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor</span>
                <span className="font-medium">
                  R$ {paymentInfo.plan.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vencimento</span>
                <span className="font-medium">
                  {formatDate(paymentInfo.enrollment.endDate)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Enrollments */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Matriculas ({activeEnrollments.length} ativa
            {activeEnrollments.length !== 1 ? "s" : ""})
          </h4>
          <div className="space-y-2">
            {enrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma matricula encontrada
              </p>
            ) : (
              enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-secondary/50 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {enrollment.className}
                    </span>
                    <Badge
                      variant="outline"
                      className={levelColors[enrollment.level]}
                    >
                      {levelLabels[enrollment.level]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {formatDate(enrollment.startDate)} -{" "}
                      {formatDate(enrollment.endDate)}
                    </span>
                    <Badge
                      variant={
                        enrollment.status === "ativa" ? "default" : "secondary"
                      }
                      className={
                        enrollment.status === "ativa"
                          ? "bg-chart-1/20 text-chart-1 border-chart-1/30"
                          : ""
                      }
                    >
                      {enrollment.status.charAt(0).toUpperCase() +
                        enrollment.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Presence Stats */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Estatisticas de Presenca
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-chart-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xl font-bold">{presenceStats.present}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Presencas</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-destructive">
                <XCircle className="w-4 h-4" />
                <span className="text-xl font-bold">{presenceStats.absent}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Faltas</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <span
                className={`text-xl font-bold ${
                  presenceStats.percentage >= 75
                    ? "text-chart-1"
                    : presenceStats.percentage >= 50
                    ? "text-chart-3"
                    : "text-destructive"
                }`}
              >
                {presenceStats.percentage}%
              </span>
              <p className="text-xs text-muted-foreground mt-1">Frequencia</p>
            </div>
          </div>
          {presenceStats.total === 0 && (
            <p className="text-xs text-muted-foreground text-center">
              Nenhum registro de presenca ainda
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
