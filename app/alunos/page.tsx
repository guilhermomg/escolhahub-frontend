"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StudentList } from "@/components/students/student-list"
import { StudentDetail } from "@/components/students/student-detail"
import { StudentForm } from "@/components/students/student-form"
import { students as initialStudents } from "@/lib/mock-data"
import type { Student } from "@/lib/types"

export default function AlunosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const handleAddStudent = (data: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...data,
      id: String(students.length + 1),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setStudents([...students, newStudent])
    setIsFormOpen(false)
  }

  const handleEditStudent = (data: Omit<Student, "id" | "createdAt">) => {
    if (!editingStudent) return
    const updated = students.map((s) =>
      s.id === editingStudent.id ? { ...s, ...data } : s
    )
    setStudents(updated)
    setEditingStudent(null)
    setIsFormOpen(false)
    if (selectedStudent?.id === editingStudent.id) {
      setSelectedStudent({ ...selectedStudent, ...data })
    }
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id))
    if (selectedStudent?.id === id) {
      setSelectedStudent(null)
    }
  }

  const openEditForm = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const openNewForm = () => {
    setEditingStudent(null)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header
          title="Alunos"
          subtitle="Gerencie os alunos da escola"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className={selectedStudent ? "lg:w-1/2" : "w-full"}>
              <StudentList
                students={students}
                selectedId={selectedStudent?.id}
                onSelect={setSelectedStudent}
                onAdd={openNewForm}
                onEdit={openEditForm}
                onDelete={handleDeleteStudent}
              />
            </div>
            {selectedStudent && (
              <div className="lg:w-1/2">
                <StudentDetail
                  student={selectedStudent}
                  onClose={() => setSelectedStudent(null)}
                  onEdit={() => openEditForm(selectedStudent)}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <StudentForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingStudent(null)
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        initialData={editingStudent}
      />
    </div>
  )
}
