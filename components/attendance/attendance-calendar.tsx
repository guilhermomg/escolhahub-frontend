"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react"
import {
  getClassesByWeekDay,
  getWeekDayFromDate,
  getEnrollmentsByClass,
  WEEK_DAYS,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { Class } from "@/lib/types"

interface AttendanceCalendarProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  onSelectClass: (cls: Class, date: Date) => void
}

export function AttendanceCalendar({
  selectedDate,
  onDateChange,
  onSelectClass,
}: AttendanceCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate))

  const weekDay = getWeekDayFromDate(selectedDate)
  const dayClasses = getClassesByWeekDay(weekDay)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + delta)
    setCurrentMonth(newMonth)
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === new Date().toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const getClassCountForDay = (date: Date | null) => {
    if (!date) return 0
    const dayWeek = getWeekDayFromDate(date)
    return getClassesByWeekDay(dayWeek).length
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Calendario</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="min-w-[150px] text-center font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const classCount = getClassCountForDay(date)
              return (
                <button
                  key={index}
                  disabled={!date}
                  onClick={() => date && onDateChange(date)}
                  className={cn(
                    "aspect-square p-1 rounded-lg flex flex-col items-center justify-center text-sm transition-colors relative",
                    !date && "invisible",
                    date && "hover:bg-secondary",
                    isSelected(date) && "bg-primary text-primary-foreground hover:bg-primary/90",
                    isToday(date) && !isSelected(date) && "border-2 border-primary"
                  )}
                >
                  <span>{date?.getDate()}</span>
                  {classCount > 0 && !isSelected(date) && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(classCount, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      ))}
                    </div>
                  )}
                  {classCount > 0 && isSelected(date) && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(classCount, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            Turmas - {WEEK_DAYS.find((d) => d.value === weekDay)?.label}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {selectedDate.toLocaleDateString("pt-BR")}
          </p>
        </CardHeader>
        <CardContent>
          {dayClasses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma turma neste dia
            </p>
          ) : (
            <div className="space-y-3">
              {dayClasses.map((cls) => {
                const enrollments = getEnrollmentsByClass(cls.id)
                return (
                  <div
                    key={cls.id}
                    className="p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() => onSelectClass(cls, selectedDate)}
                  >
                    <h4 className="font-medium text-sm text-card-foreground">
                      {cls.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cls.startTime} - {cls.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {enrollments.length}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
