"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { WEEK_DAYS } from "@/lib/mock-data"
import type { Class } from "@/lib/types"

interface ClassFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classData: Class | null
  onSave: (data: Omit<Class, "id" | "currentStudents">) => void
}

export function ClassForm({
  open,
  onOpenChange,
  classData,
  onSave,
}: ClassFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    weekDays: [] as string[],
    startTime: "",
    endTime: "",
    maxStudents: 10,
  })

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name,
        description: classData.description,
        weekDays: classData.weekDays,
        startTime: classData.startTime,
        endTime: classData.endTime,
        maxStudents: classData.maxStudents,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        weekDays: [],
        startTime: "",
        endTime: "",
        maxStudents: 10,
      })
    }
  }, [classData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const schedule = `${formData.weekDays
      .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
      .join("/")} ${formData.startTime}-${formData.endTime}`
    onSave({
      ...formData,
      schedule,
    })
  }

  const toggleWeekDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      weekDays: prev.weekDays.includes(day)
        ? prev.weekDays.filter((d) => d !== day)
        : [...prev.weekDays, day],
    }))
  }

  const isValid =
    formData.name.trim() &&
    formData.weekDays.length > 0 &&
    formData.startTime &&
    formData.endTime &&
    formData.maxStudents > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {classData ? "Editar Turma" : "Nova Turma"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Turma *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ex: Desenho Basico"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descricao</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Descreva o conteudo da turma..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Dias da Semana *</Label>
            <div className="grid grid-cols-4 gap-2">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={day.value}
                    checked={formData.weekDays.includes(day.value)}
                    onCheckedChange={() => toggleWeekDay(day.value)}
                  />
                  <label
                    htmlFor={day.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {day.label.slice(0, 3)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Horario Inicio *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, startTime: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Horario Fim *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Capacidade Maxima *</Label>
            <Input
              id="maxStudents"
              type="number"
              min={1}
              max={50}
              value={formData.maxStudents}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  maxStudents: parseInt(e.target.value) || 1,
                }))
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              {classData ? "Salvar Alteracoes" : "Criar Turma"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
