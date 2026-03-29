"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ClassList } from "@/components/classes/class-list"
import { ClassDetail } from "@/components/classes/class-detail"
import { ClassForm } from "@/components/classes/class-form"
import { EnrollmentForm } from "@/components/classes/enrollment-form"
import { classes as initialClasses, addEnrollment } from "@/lib/mock-data"
import type { Class, Enrollment } from "@/lib/types"

export default function TurmasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [classes, setClasses] = useState<Class[]>(initialClasses)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)
  const [enrollingClass, setEnrollingClass] = useState<Class | null>(null)

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

  const handleEnroll = (cls: Class) => {
    setEnrollingClass(cls)
    setEnrollmentOpen(true)
  }

  const handleSaveEnrollment = (enrollment: Omit<Enrollment, "id">) => {
    addEnrollment(enrollment)
    setClasses((prev) =>
      prev.map((c) =>
        c.id === enrollment.classId
          ? { ...c, currentStudents: c.currentStudents + 1 }
          : c
      )
    )
    if (selectedClass?.id === enrollment.classId) {
      setSelectedClass({
        ...selectedClass,
        currentStudents: selectedClass.currentStudents + 1,
      })
    }
    setEnrollmentOpen(false)
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
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header
          title="Turmas"
          subtitle="Gerencie as turmas da escola"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-6">
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
                <ClassDetail classData={selectedClass} onEdit={handleEdit} onEnroll={handleEnroll} />
              ) : (
                <div className="h-96 flex items-center justify-center bg-card rounded-lg border border-border">
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

      {enrollingClass && (
        <EnrollmentForm
          open={enrollmentOpen}
          onOpenChange={setEnrollmentOpen}
          classData={enrollingClass}
          onSave={handleSaveEnrollment}
        />
      )}
    </div>
  )
}
