"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { AttendanceList } from "@/components/attendance/attendance-list"
import { AttendanceCalendar } from "@/components/attendance/attendance-calendar"
import { AttendanceSheet } from "@/components/attendance/attendance-sheet"
import { Button } from "@/components/ui/button"
import { List, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Class } from "@/lib/types"

export default function PresencaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelectClass = (cls: Class, date: Date) => {
    setSelectedClass(cls)
    setSelectedDate(date)
    setSheetOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header 
          title="Presenca" 
          subtitle="Gerencie a presenca dos alunos" 
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "gap-2",
                  viewMode === "list" && "bg-background shadow-sm"
                )}
              >
                <List className="w-4 h-4" />
                Lista
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={cn(
                  "gap-2",
                  viewMode === "calendar" && "bg-background shadow-sm"
                )}
              >
                <CalendarDays className="w-4 h-4" />
                Calendario
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <AttendanceList
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onSelectClass={handleSelectClass}
            />
          ) : (
            <AttendanceCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onSelectClass={handleSelectClass}
            />
          )}
        </main>
      </div>

      {selectedClass && (
        <AttendanceSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          classData={selectedClass}
          date={selectedDate}
        />
      )}
    </div>
  )
}
