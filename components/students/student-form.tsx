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
import type { Student } from "@/lib/types"

interface StudentFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Student, "id" | "createdAt">) => void
  initialData?: Student | null
}

export function StudentForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Student, "id" | "createdAt">>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        birthDate: initialData.birthDate,
      })
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        birthDate: "",
      })
    }
  }, [initialData, reset])

  const onFormSubmit = (data: Omit<Student, "id" | "createdAt">) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Aluno" : "Novo Aluno"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome e obrigatorio" })}
              placeholder="Ex: Maria Silva"
              className="bg-secondary border-border"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email e obrigatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalido",
                },
              })}
              placeholder="Ex: maria@email.com"
              className="bg-secondary border-border"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Telefone e obrigatorio" })}
              placeholder="Ex: (11) 99999-9999"
              className="bg-secondary border-border"
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              {...register("birthDate", {
                required: "Data de nascimento e obrigatoria",
              })}
              className="bg-secondary border-border"
            />
            {errors.birthDate && (
              <p className="text-xs text-destructive">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
