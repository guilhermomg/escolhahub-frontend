"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
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
import { Plus, Search, MoreVertical, Pencil, Trash2, Users, Clock, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatWeekDays } from "@/lib/mock-data"
import type { Class } from "@/lib/types"

interface ClassListProps {
  classes: Class[]
  selectedId?: string
  onSelect: (cls: Class) => void
  onAdd: () => void
  onEdit: (cls: Class) => void
  onDelete: (id: string) => void
}

export function ClassList({
  classes,
  selectedId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}: ClassListProps) {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const copyRegistrationLink = (classId: string, className: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const link = `${window.location.origin}/inscricao/${classId}`
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: "Link copiado!",
        description: `Link de inscrição para "${className}" copiado.`,
      })
    })
  }

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  )

  const classToDelete = classes.find((c) => c.id === deleteId)

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "bg-destructive/20 text-destructive"
    if (percentage >= 70) return "bg-[oklch(0.75_0.18_55)]/20 text-[oklch(0.75_0.18_55)]"
    return "bg-primary/20 text-primary"
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Lista de Turmas ({classes.length})
            </CardTitle>
            <Button onClick={onAdd} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Turma
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou descricao..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma turma encontrada
              </p>
            ) : (
              filtered.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => onSelect(cls)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors",
                    selectedId === cls.id
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-secondary/50 hover:bg-secondary border border-transparent"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-card-foreground truncate">
                        {cls.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs shrink-0", getOccupancyColor(cls.currentStudents, cls.maxStudents))}
                      >
                        {cls.currentStudents}/{cls.maxStudents}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatWeekDays(cls.weekDays)} {cls.startTime}-{cls.endTime}
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
                        onClick={(e) => copyRegistrationLink(cls.id, cls.name, e)}
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        Copiar Link de Inscrição
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(cls)
                        }}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteId(cls.id)
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir turma</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {classToDelete?.name}? Esta acao nao
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
