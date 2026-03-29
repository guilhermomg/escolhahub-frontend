"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Search, MoreVertical, Pencil, Trash2, Calendar, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentPlan } from "@/lib/types"

interface PlanListProps {
  plans: PaymentPlan[]
  selectedId?: string
  onSelect: (plan: PaymentPlan) => void
  onAdd: () => void
  onEdit: (plan: PaymentPlan) => void
  onDelete: (id: string) => void
}

export function PlanList({
  plans,
  selectedId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}: PlanListProps) {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = plans.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  const planToDelete = plans.find((p) => p.id === deleteId)

  const sortedPlans = [...filtered].sort((a, b) => a.durationMonths - b.durationMonths)

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Planos de Pagamento ({plans.length})
            </CardTitle>
            <Button onClick={onAdd} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Plano
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar planos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {sortedPlans.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum plano encontrado
              </p>
            ) : (
              sortedPlans.map((plan) => {
                const pricePerMonth = plan.price / plan.durationMonths
                const discount = plan.durationMonths > 1 
                  ? Math.round((1 - (pricePerMonth / 250)) * 100) 
                  : 0

                return (
                  <div
                    key={plan.id}
                    onClick={() => onSelect(plan)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors",
                      selectedId === plan.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50 hover:bg-secondary border border-transparent"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-card-foreground">
                          {plan.name}
                        </p>
                        {discount > 0 && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            -{discount}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {plan.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {plan.durationMonths} {plan.durationMonths === 1 ? 'mês' : 'meses'}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          R$ {plan.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(plan)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteId(plan.id)
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir plano</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o plano {planToDelete?.name}? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId)
                  setDeleteId(null)
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
