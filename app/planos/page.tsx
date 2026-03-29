"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { PlanList } from "@/components/plans/plan-list"
import { PlanDetail } from "@/components/plans/plan-detail"
import { PlanForm } from "@/components/plans/plan-form"
import { paymentPlans as initialPlans } from "@/lib/mock-data"
import type { PaymentPlan } from "@/lib/types"

export default function PlanosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [plans, setPlans] = useState<PaymentPlan[]>(initialPlans)
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PaymentPlan | null>(null)

  const handleAddPlan = (data: Omit<PaymentPlan, "id">) => {
    const newPlan: PaymentPlan = {
      ...data,
      id: String(plans.length + 1),
    }
    setPlans([...plans, newPlan])
    setIsFormOpen(false)
  }

  const handleEditPlan = (data: Omit<PaymentPlan, "id">) => {
    if (!editingPlan) return
    const updated = plans.map((p) =>
      p.id === editingPlan.id ? { ...p, ...data } : p
    )
    setPlans(updated)
    setEditingPlan(null)
    setIsFormOpen(false)
    if (selectedPlan?.id === editingPlan.id) {
      setSelectedPlan({ ...selectedPlan, ...data })
    }
  }

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id))
    if (selectedPlan?.id === id) {
      setSelectedPlan(null)
    }
  }

  const openEditForm = (plan: PaymentPlan) => {
    setEditingPlan(plan)
    setIsFormOpen(true)
  }

  const openNewForm = () => {
    setEditingPlan(null)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header
          title="Planos"
          subtitle="Gerencie os planos de pagamento"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className={selectedPlan ? "lg:w-1/2" : "w-full"}>
              <PlanList
                plans={plans}
                selectedId={selectedPlan?.id}
                onSelect={setSelectedPlan}
                onAdd={openNewForm}
                onEdit={openEditForm}
                onDelete={handleDeletePlan}
              />
            </div>
            {selectedPlan && (
              <div className="lg:w-1/2">
                <PlanDetail
                  plan={selectedPlan}
                  onEdit={openEditForm}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <PlanForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingPlan(null)
        }}
        onSubmit={editingPlan ? handleEditPlan : handleAddPlan}
        initialData={editingPlan}
      />
    </div>
  )
}
