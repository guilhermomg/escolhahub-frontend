"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import {
  getStudentsNotInClass,
  hasActivePlan,
  paymentPlans,
  getStudentById,
  getPlanById,
  getClassById,
} from "@/lib/mock-data"
import type { Class, Enrollment, Student } from "@/lib/types"

interface EnrollmentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classData: Class
  onSave: (enrollment: Omit<Enrollment, "id">) => void
}

export function EnrollmentForm({
  open,
  onOpenChange,
  classData,
  onSave,
}: EnrollmentFormProps) {
  const [availableStudents, setAvailableStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>("")
  const [selectedPlanId, setSelectedPlanId] = useState<string>("")
  const [level, setLevel] = useState<"iniciante" | "intermediario" | "avancado">("iniciante")
  const [studentPlanStatus, setStudentPlanStatus] = useState<{
    hasActive: boolean
    enrollment: Enrollment | null
  } | null>(null)

  useEffect(() => {
    if (open) {
      setAvailableStudents(getStudentsNotInClass(classData.id))
      setSelectedStudentId("")
      setSelectedPlanId("")
      setLevel("iniciante")
      setStudentPlanStatus(null)
    }
  }, [open, classData.id])

  useEffect(() => {
    if (selectedStudentId) {
      const status = hasActivePlan(selectedStudentId)
      setStudentPlanStatus(status)
      if (status.hasActive && status.enrollment) {
        setSelectedPlanId(status.enrollment.planId)
      }
    } else {
      setStudentPlanStatus(null)
    }
  }, [selectedStudentId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudentId || !selectedPlanId) return

    const student = getStudentById(selectedStudentId)
    const plan = getPlanById(selectedPlanId)
    const cls = getClassById(classData.id)

    if (!student || !plan || !cls) return

    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + plan.durationMonths)

    const enrollment: Omit<Enrollment, "id"> = {
      studentId: student.id,
      studentName: student.name,
      classId: cls.id,
      className: cls.name,
      planId: plan.id,
      planName: plan.name,
      level,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      status: "ativa",
    }

    onSave(enrollment)
    onOpenChange(false)
  }

  const isFull = classData.currentStudents >= classData.maxStudents

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            Matricular Aluno em {classData.name}
          </DialogTitle>
        </DialogHeader>

        {isFull ? (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-sm text-destructive">
              Esta turma esta lotada. Nao e possivel matricular novos alunos.
            </p>
          </div>
        ) : availableStudents.length === 0 ? (
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Todos os alunos ja estao matriculados nesta turma.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student" className="text-card-foreground">
                Aluno
              </Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione um aluno" />
                </SelectTrigger>
                <SelectContent>
                  {availableStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {studentPlanStatus && (
              <div
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  studentPlanStatus.hasActive
                    ? "bg-primary/10"
                    : "bg-[oklch(0.75_0.18_55)]/10"
                }`}
              >
                {studentPlanStatus.hasActive ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Aluno possui plano ativo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Plano: {studentPlanStatus.enrollment?.planName} - Valido ate{" "}
                        {new Date(
                          studentPlanStatus.enrollment?.endDate || ""
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-[oklch(0.75_0.18_55)] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Aluno sem plano ativo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Selecione um plano abaixo para criar a matricula
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="plan" className="text-card-foreground">
                Plano
              </Label>
              <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  {paymentPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      <div className="flex items-center gap-2">
                        <span>{plan.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          R$ {plan.price.toFixed(2)}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-card-foreground">
                Nivel do Aluno
              </Label>
              <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediario</SelectItem>
                  <SelectItem value="avancado">Avancado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!selectedStudentId || !selectedPlanId}
              >
                Matricular
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
