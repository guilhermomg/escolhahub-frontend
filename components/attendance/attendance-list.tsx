"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Users, BookOpen } from "lucide-react"
import {
  getClassesByWeekDay,
  getWeekDayFromDate,
  getEnrollmentsByClass,
  WEEK_DAYS,
} from "@/lib/mock-data"
import type { Class } from "@/lib/types"

interface AttendanceListProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  onSelectClass: (cls: Class, date: Date) => void
}

export function AttendanceList({
  selectedDate,
  onDateChange,
  onSelectClass,
}: AttendanceListProps) {
  const weekDay = getWeekDayFromDate(selectedDate)
  const dayClasses = getClassesByWeekDay(weekDay)
  const weekDayLabel = WEEK_DAYS.find((d) => d.value === weekDay)?.label || weekDay

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    onDateChange(newDate)
  }

  const isToday =
    selectedDate.toDateString() === new Date().toDateString()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Turmas do Dia</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="px-4 py-2 bg-secondary rounded-lg min-w-[200px] text-center">
                <p className="text-sm font-medium text-foreground">
                  {weekDayLabel}, {selectedDate.toLocaleDateString("pt-BR")}
                </p>
                {isToday && (
                  <Badge variant="secondary" className="mt-1 text-xs bg-primary/20 text-primary">
                    Hoje
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {dayClasses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma turma programada para este dia
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dayClasses.map((cls) => {
                const enrollments = getEnrollmentsByClass(cls.id)
                return (
                  <Card
                    key={cls.id}
                    className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
                    onClick={() => onSelectClass(cls, selectedDate)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-card-foreground">
                            {cls.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {cls.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>
                            {cls.startTime} - {cls.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{enrollments.length} alunos</span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full mt-4"
                      >
                        Registrar Presenca
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
