"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Calendar, DollarSign, Users, TrendingUp, Percent } from "lucide-react"
import { enrollments } from "@/lib/mock-data"
import type { PaymentPlan } from "@/lib/types"

interface PlanDetailProps {
  plan: PaymentPlan
  onEdit: (plan: PaymentPlan) => void
}

export function PlanDetail({ plan, onEdit }: PlanDetailProps) {
  // Calculate stats
  const planEnrollments = enrollments.filter(e => e.planId === plan.id && e.status === 'ativa')
  const activeSubscribers = planEnrollments.length
  const totalRevenue = activeSubscribers * plan.price
  const pricePerMonth = plan.price / plan.durationMonths
  const discount = plan.durationMonths > 1 
    ? Math.round((1 - (pricePerMonth / 250)) * 100) 
    : 0

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {plan.name}
                </CardTitle>
                {discount > 0 && (
                  <Badge className="bg-primary/20 text-primary">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.description}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit(plan)}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Valor Total</p>
                <p className="font-semibold text-card-foreground">
                  R$ {plan.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.7_0.15_250)]/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[oklch(0.7_0.15_250)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duração</p>
                <p className="font-semibold text-card-foreground">
                  {plan.durationMonths} {plan.durationMonths === 1 ? 'mês' : 'meses'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.75_0.18_55)]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[oklch(0.75_0.18_55)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assinantes</p>
                <p className="font-semibold text-card-foreground">
                  {activeSubscribers}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Receita</p>
                <p className="font-semibold text-card-foreground">
                  R$ {totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-card-foreground">Detalhes do Plano</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Valor mensal equivalente:</span>
                <span className="font-medium text-card-foreground">
                  R$ {pricePerMonth.toFixed(2)}/mês
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Desconto:</span>
                  <span className="font-medium text-primary">
                    {discount}% sobre o preço mensal
                  </span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Economia total:</span>
                <span className="font-medium text-primary">
                  R$ {((250 * plan.durationMonths) - plan.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {activeSubscribers > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Alunos com este plano ({activeSubscribers})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {planEnrollments.map((enrollment) => {
                const endDate = new Date(enrollment.endDate)
                const today = new Date()
                const daysUntilEnd = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const isExpiringSoon = daysUntilEnd <= 30 && daysUntilEnd > 0

                return (
                  <div
                    key={enrollment.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isExpiringSoon
                        ? "bg-[oklch(0.75_0.18_55)]/10 border border-[oklch(0.75_0.18_55)]/30"
                        : "bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {enrollment.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {enrollment.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enrollment.className}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Vence em
                      </p>
                      <p className={`text-sm font-medium ${isExpiringSoon ? 'text-[oklch(0.75_0.18_55)]' : 'text-card-foreground'}`}>
                        {daysUntilEnd} dias
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
