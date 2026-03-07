"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ClassList } from "@/components/classes/class-list"
import { ClassDetail } from "@/components/classes/class-detail"
import { ClassForm } from "@/components/classes/class-form"
import { classes as initialClasses } from "@/lib/mock-data"
import type { Class } from "@/lib/types"

export default function TurmasPage() {
  const [classes, setClasses] = useState<Class[]>(initialClasses)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)

  const handleAdd = () => {
    setEditingClass(null)
    setFormOpen(true)
  }

  const handleEdit = (cls: Class) => {
    setEditingClass(cls)
    setFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id))
    if (selectedClass?.id === id) {
      setSelectedClass(null)
    }
  }

  const handleSave = (data: Omit<Class, "id" | "currentStudents">) => {
    if (editingClass) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editingClass.id ? { ...c, ...data } : c
        )
      )
      if (selectedClass?.id === editingClass.id) {
        setSelectedClass({ ...editingClass, ...data })
      }
    } else {
      const newClass: Class = {
        ...data,
        id: String(Date.now()),
        currentStudents: 0,
      }
      setClasses((prev) => [...prev, newClass])
    }
    setFormOpen(false)
    setEditingClass(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Turmas" subtitle="Gerencie as turmas da escola" />
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ClassList
                classes={classes}
                selectedId={selectedClass?.id}
                onSelect={setSelectedClass}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedClass ? (
                <ClassDetail classData={selectedClass} onEdit={handleEdit} />
              ) : (
                <div className="h-full flex items-center justify-center bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    Selecione uma turma para ver os detalhes
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ClassForm
        open={formOpen}
        onOpenChange={setFormOpen}
        classData={editingClass}
        onSave={handleSave}
      />
    </div>
  )
}
