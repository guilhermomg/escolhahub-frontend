"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  User,
  MapPin,
  GraduationCap,
  ArrowRight
} from "lucide-react"

// Mock classes data - in real app this would come from API filtering only classes with public registration enabled
const availableClasses = [
  {
    id: "1",
    name: "Ballet Infantil - Baby Class",
    teacher: "Profª Maria Silva",
    schedule: "Sábado - 10:30 às 11:30",
    format: "Presencial",
    location: "Sala 3 - Estúdio Principal",
    enrollmentFee: 100,
    monthlyFee: 390,
    description: "Aulas de ballet para crianças iniciantes, focando em coordenação motora e expressão artística.",
    vacancies: 5,
  },
  {
    id: "2",
    name: "Inglês Avançado",
    teacher: "Prof. John Santos",
    schedule: "Terça e Quinta - 19:00 às 20:30",
    format: "Presencial",
    location: "Sala 5",
    enrollmentFee: 150,
    monthlyFee: 450,
    description: "Curso de inglês para alunos de nível avançado.",
    vacancies: 8,
  },
  {
    id: "3",
    name: "Música para Iniciantes",
    teacher: "Prof. Carlos Eduardo",
    schedule: "Segunda e Quarta - 18:00 às 19:00",
    format: "Presencial",
    location: "Sala de Música",
    enrollmentFee: 120,
    monthlyFee: 380,
    description: "Introdução à teoria musical e prática instrumental.",
    vacancies: 3,
  },
]

export default function InscricaoPublicaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">EscolaHub</h1>
              <p className="text-xs text-muted-foreground">Turmas Disponíveis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Inscrições Abertas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o curso ideal para você e faça sua inscrição online de forma rápida e segura
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableClasses.map((classItem) => (
            <Card key={classItem.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={classItem.vacancies > 5 ? "default" : "secondary"}>
                    {classItem.vacancies} vagas
                  </Badge>
                  <Badge variant="outline">{classItem.format}</Badge>
                </div>
                <CardTitle className="text-xl">{classItem.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {classItem.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{classItem.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{classItem.teacher}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{classItem.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Matrícula:</span>
                    <span className="font-semibold">R$ {classItem.enrollmentFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mensalidade:</span>
                    <span className="font-semibold">R$ {classItem.monthlyFee.toFixed(2)}/mês</span>
                  </div>
                  <Link href={`/inscricao/${classItem.id}`} className="w-full">
                    <Button className="w-full gap-2">
                      Inscrever-se
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Como funciona a inscrição?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h3 className="font-semibold">Escolha o curso</h3>
                <p className="text-sm text-muted-foreground">
                  Navegue pelas opções disponíveis e escolha o curso que mais combina com você
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <h3 className="font-semibold">Preencha os dados</h3>
                <p className="text-sm text-muted-foreground">
                  Complete o formulário com suas informações pessoais e dados de pagamento
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h3 className="font-semibold">Confirme o pagamento</h3>
                <p className="text-sm text-muted-foreground">
                  Realize o pagamento via PIX, cartão ou boleto e pronto! Você está matriculado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Dúvidas? Entre em contato:</p>
          <p className="mt-2">
            <strong>Email:</strong> contato@escolahub.com.br | <strong>WhatsApp:</strong> (00) 0000-0000
          </p>
          <p className="mt-4 text-xs">© 2026 EscolaHub - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
