"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { classes, getStudentsByClass } from "@/lib/mock-data"
import type { Class, Enrollment } from "@/lib/types"
import { Users, Clock, ChevronRight } from "lucide-react"

export function ClassList() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [studentsInClass, setStudentsInClass] = useState<Enrollment[]>([])

  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem)
    setStudentsInClass(getStudentsByClass(classItem.id))
  }

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-chart-4"
    if (percentage >= 70) return "text-chart-3"
    return "text-chart-2"
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "iniciante":
        return <Badge variant="secondary" className="bg-chart-2/20 text-chart-2 border-0">Iniciante</Badge>
      case "intermediario":
        return <Badge variant="secondary" className="bg-chart-3/20 text-chart-3 border-0">Intermediario</Badge>
      case "avancado":
        return <Badge variant="secondary" className="bg-chart-1/20 text-chart-1 border-0">Avancado</Badge>
      default:
        return null
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground">Turmas Ativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => handleClassClick(classItem)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{classItem.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {classItem.schedule}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className={`text-sm font-medium ${getOccupancyColor(classItem.currentStudents, classItem.maxStudents)}`}>
                    {classItem.currentStudents}/{classItem.maxStudents}
                  </span>
                  <p className="text-xs text-muted-foreground">alunos</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {selectedClass?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {selectedClass?.schedule}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {selectedClass?.currentStudents} de {selectedClass?.maxStudents} alunos
            </div>
            
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Alunos Matriculados</h4>
              {studentsInClass.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum aluno matriculado</p>
              ) : (
                <div className="space-y-2">
                  {studentsInClass.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                    >
                      <span className="text-sm text-foreground">{enrollment.studentName}</span>
                      {getLevelBadge(enrollment.level)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
