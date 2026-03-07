"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Save,
  MessageSquare,
} from "lucide-react"
import {
  getEnrollmentsByClass,
  getAttendanceByClassAndDate,
  addAttendance,
  updateAttendance,
  WEEK_DAYS,
  getWeekDayFromDate,
} from "@/lib/mock-data"
import type { Class, Attendance } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AttendanceSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classData: Class
  date: Date
}

interface StudentAttendance {
  enrollmentId: string
  studentName: string
  present: boolean
  feedback: string
  existingId?: string
}

export function AttendanceSheet({
  open,
  onOpenChange,
  classData,
  date,
}: AttendanceSheetProps) {
  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>([])
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const dateString = date.toISOString().split("T")[0]
  const weekDay = getWeekDayFromDate(date)
  const weekDayLabel = WEEK_DAYS.find((d) => d.value === weekDay)?.label || weekDay

  useEffect(() => {
    if (open && classData) {
      const enrollments = getEnrollmentsByClass(classData.id)
      const existingAttendance = getAttendanceByClassAndDate(classData.id, dateString)

      const list: StudentAttendance[] = enrollments.map((enrollment) => {
        const existing = existingAttendance.find(
          (a) => a.enrollmentId === enrollment.id
        )
        return {
          enrollmentId: enrollment.id,
          studentName: enrollment.studentName,
          present: existing?.present ?? true,
          feedback: existing?.feedback ?? "",
          existingId: existing?.id,
        }
      })

      setAttendanceList(list)
    }
  }, [open, classData, dateString])

  const togglePresence = (enrollmentId: string) => {
    setAttendanceList((prev) =>
      prev.map((item) =>
        item.enrollmentId === enrollmentId
          ? { ...item, present: !item.present }
          : item
      )
    )
  }

  const setFeedback = (enrollmentId: string, feedback: string) => {
    setAttendanceList((prev) =>
      prev.map((item) =>
        item.enrollmentId === enrollmentId ? { ...item, feedback } : item
      )
    )
  }

  const handleSave = () => {
    setSaving(true)

    attendanceList.forEach((item) => {
      const enrollment = getEnrollmentsByClass(classData.id).find(
        (e) => e.id === item.enrollmentId
      )
      if (!enrollment) return

      if (item.existingId) {
        updateAttendance(item.existingId, {
          present: item.present,
          feedback: item.feedback || undefined,
        })
      } else {
        addAttendance({
          enrollmentId: item.enrollmentId,
          studentName: item.studentName,
          className: classData.name,
          date: dateString,
          present: item.present,
          feedback: item.feedback || undefined,
        })
      }
    })

    setTimeout(() => {
      setSaving(false)
      onOpenChange(false)
    }, 500)
  }

  const presentCount = attendanceList.filter((a) => a.present).length
  const absentCount = attendanceList.filter((a) => !a.present).length

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-xl">{classData.name}</SheetTitle>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {classData.startTime} - {classData.endTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {attendanceList.length} alunos
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-secondary">
              {weekDayLabel}, {date.toLocaleDateString("pt-BR")}
            </Badge>
          </div>
        </SheetHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-4 p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{presentCount} presentes</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">{absentCount} ausentes</span>
            </div>
          </div>

          <div className="space-y-2">
            {attendanceList.map((item) => (
              <div
                key={item.enrollmentId}
                className={cn(
                  "rounded-lg border transition-colors",
                  item.present
                    ? "border-primary/30 bg-primary/5"
                    : "border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        item.present ? "bg-primary/20" : "bg-destructive/20"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-medium",
                          item.present ? "text-primary" : "text-destructive"
                        )}
                      >
                        {item.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.studentName}
                      </p>
                      {item.feedback && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Tem feedback
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() =>
                        setExpandedStudent(
                          expandedStudent === item.enrollmentId
                            ? null
                            : item.enrollmentId
                        )
                      }
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={`presence-${item.enrollmentId}`}
                        className={cn(
                          "text-xs",
                          item.present ? "text-primary" : "text-destructive"
                        )}
                      >
                        {item.present ? "Presente" : "Ausente"}
                      </Label>
                      <Switch
                        id={`presence-${item.enrollmentId}`}
                        checked={item.present}
                        onCheckedChange={() => togglePresence(item.enrollmentId)}
                      />
                    </div>
                  </div>
                </div>

                {expandedStudent === item.enrollmentId && (
                  <div className="px-3 pb-3">
                    <Textarea
                      placeholder="Adicionar feedback sobre o aluno nesta aula..."
                      value={item.feedback}
                      onChange={(e) =>
                        setFeedback(item.enrollmentId, e.target.value)
                      }
                      className="min-h-[80px] text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {attendanceList.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum aluno matriculado nesta turma
              </p>
            </div>
          )}
        </div>

        {attendanceList.length > 0 && (
          <div className="pt-4 border-t border-border">
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Salvando..." : "Salvar Presenca"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
