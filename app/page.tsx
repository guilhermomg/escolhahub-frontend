import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ClassList } from "@/components/dashboard/class-list"
import { ExpiringPlans } from "@/components/dashboard/expiring-plans"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentAttendance } from "@/components/dashboard/recent-attendance"
import { students, classes, enrollments } from "@/lib/mock-data"
import { Users, BookOpen, ClipboardList, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const activeEnrollments = enrollments.filter(e => e.status === 'ativa').length
  const totalRevenue = 5800

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64">
        <Header 
          title="Dashboard" 
          subtitle="Visao geral da sua escola" 
        />
        
        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total de Alunos"
              value={students.length}
              subtitle="Cadastrados no sistema"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Turmas Ativas"
              value={classes.length}
              subtitle="Em andamento"
              icon={BookOpen}
            />
            <StatCard
              title="Matriculas Ativas"
              value={activeEnrollments}
              subtitle="Alunos frequentando"
              icon={ClipboardList}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Receita Mensal"
              value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`}
              subtitle="Faturamento de Marco"
              icon={DollarSign}
              trend={{ value: 7, isPositive: true }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              <RevenueChart />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClassList />
                <RecentAttendance />
              </div>
            </div>

            {/* Right Column - 1/3 */}
            <div className="space-y-6">
              <ExpiringPlans />
              
              {/* Level Distribution */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Distribuicao por Nivel</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Iniciante</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-chart-2 rounded-full" style={{ width: '37%' }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">3</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Intermediario</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-chart-3 rounded-full" style={{ width: '37%' }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">3</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avancado</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-chart-1 rounded-full" style={{ width: '25%' }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
