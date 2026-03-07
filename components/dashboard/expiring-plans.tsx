"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getExpiringEnrollments } from "@/lib/mock-data"
import { AlertTriangle, Phone } from "lucide-react"

export function ExpiringPlans() {
  const expiringEnrollments = getExpiringEnrollments(30)

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgencyBadge = (days: number) => {
    if (days <= 7) {
      return <Badge className="bg-destructive/20 text-destructive border-0">Urgente</Badge>
    }
    if (days <= 14) {
      return <Badge className="bg-chart-3/20 text-chart-3 border-0">Em breve</Badge>
    }
    return <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">30 dias</Badge>
  }

  if (expiringEnrollments.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="w-5 h-5 text-chart-3" />
            Planos a Vencer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nenhum plano vencendo nos proximos 30 dias
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="w-5 h-5 text-chart-3" />
          Planos a Vencer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {expiringEnrollments.map((enrollment) => {
          const daysLeft = getDaysUntilExpiry(enrollment.endDate)
          return (
            <div
              key={enrollment.id}
              className="flex items-center justify-between p-3 rounded-lg bg-chart-3/5 border border-chart-3/20"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{enrollment.studentName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {enrollment.planName} - {enrollment.className}
                </p>
                <p className="text-xs text-chart-3 mt-1">
                  Vence em {daysLeft} dia{daysLeft !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getUrgencyBadge(daysLeft)}
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
