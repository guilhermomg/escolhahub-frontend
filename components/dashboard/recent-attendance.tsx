"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentAttendance } from "@/lib/mock-data"
import { CheckCircle2, XCircle } from "lucide-react"

export function RecentAttendance() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground">Presencas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAttendance.slice(0, 5).map((attendance) => (
          <div
            key={attendance.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {attendance.present ? (
              <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {attendance.studentName}
              </p>
              <p className="text-xs text-muted-foreground">
                {attendance.className} - {new Date(attendance.date).toLocaleDateString('pt-BR')}
              </p>
              {attendance.feedback && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  &quot;{attendance.feedback}&quot;
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
