"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
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
import type { PaymentPlan } from "@/lib/types"

interface PlanFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<PaymentPlan, "id">) => void
  initialData?: PaymentPlan | null
}

export function PlanForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: PlanFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<PaymentPlan, "id">>({
    defaultValues: {
      name: "",
      durationMonths: 1,
      price: 0,
      description: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        durationMonths: initialData.durationMonths,
        price: initialData.price,
        description: initialData.description,
      })
    } else {
      reset({
        name: "",
        durationMonths: 1,
        price: 0,
        description: "",
      })
    }
  }, [initialData, reset, open])

  const handleFormSubmit = (data: Omit<PaymentPlan, "id">) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Plano" : "Novo Plano"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Plano</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              placeholder="Ex: Mensal, Trimestral, Anual..."
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durationMonths">Duração (meses)</Label>
              <Input
                id="durationMonths"
                type="number"
                min="1"
                {...register("durationMonths", {
                  required: "Duração é obrigatória",
                  min: { value: 1, message: "Mínimo 1 mês" },
                  valueAsNumber: true,
                })}
                placeholder="1"
              />
              {errors.durationMonths && (
                <p className="text-sm text-destructive">
                  {errors.durationMonths.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", {
                  required: "Valor é obrigatório",
                  min: { value: 0, message: "Valor deve ser positivo" },
                  valueAsNumber: true,
                })}
                placeholder="250.00"
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Descrição é obrigatória",
              })}
              placeholder="Ex: Pagamento mensal sem fidelidade"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Criar Plano"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
