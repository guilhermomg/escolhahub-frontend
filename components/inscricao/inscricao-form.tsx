"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CreditCard,
  QrCode,
  FileText,
  Check,
  GraduationCap
} from "lucide-react"

// Mock class data - in real app this would come from API
export const mockClasses = {
  "1": {
    id: "1",
    name: "Ballet Infantil - Baby Class",
    teacher: "Profª Maria Silva",
    schedule: "Sábado - 10:30 às 11:30",
    format: "Presencial",
    location: "Sala 3 - Estúdio Principal",
    enrollmentFee: 100,
    monthlyFee: 390,
    description: "Aulas de ballet para crianças iniciantes, focando em coordenação motora e expressão artística.",
  },
  "2": {
    id: "2",
    name: "Inglês Avançado",
    teacher: "Prof. John Santos",
    schedule: "Terça e Quinta - 19:00 às 20:30",
    format: "Presencial",
    location: "Sala 5",
    enrollmentFee: 150,
    monthlyFee: 450,
    description: "Curso de inglês para alunos de nível avançado.",
  }
}

type RegistrationType = "responsible" | "self"
type PaymentMethod = "pix" | "credit" | "boleto"

interface InscricaoFormProps {
  classId: string
}

export function InscricaoForm({ classId }: InscricaoFormProps) {
  const classData = mockClasses[classId as keyof typeof mockClasses]

  const [registrationType, setRegistrationType] = useState<RegistrationType>("responsible")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [couponCode, setCouponCode] = useState("")

  const [responsibleData, setResponsibleData] = useState({
    cpf: "",
    name: "",
    phone: "",
    birthDate: "",
    email: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  })

  const [studentData, setStudentData] = useState({
    cpf: "",
    name: "",
    phone: "",
    birthDate: "",
    email: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  })

  const [howFoundUs, setHowFoundUs] = useState("")

  if (!classData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Turma não encontrada</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalValue = classData.enrollmentFee + classData.monthlyFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      alert("Por favor, aceite os termos para continuar.")
      return
    }
    // In real app, this would submit to API
    alert("Inscrição realizada com sucesso! (modo demonstração)")
  }

  const handleResponsibleChange = (field: string, value: string) => {
    setResponsibleData(prev => ({ ...prev, [field]: value }))
  }

  const handleStudentChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }))
  }

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
              <p className="text-xs text-muted-foreground">Inscrição Online</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{classData.name}</CardTitle>
              <CardDescription>{classData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Horário</p>
                    <p className="text-muted-foreground">{classData.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Professor(a)</p>
                    <p className="text-muted-foreground">{classData.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Local</p>
                    <p className="text-muted-foreground">{classData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="secondary">{classData.format}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Type */}
          <Card>
            <CardHeader>
              <CardTitle>Quem está se inscrevendo?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={registrationType} onValueChange={(value) => setRegistrationType(value as RegistrationType)}>
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="responsible" id="responsible" />
                  <Label htmlFor="responsible" className="cursor-pointer flex-1">
                    <p className="font-medium">Sou apenas o responsável financeiro</p>
                    <p className="text-sm text-muted-foreground">Realizarei o pagamento em nome do aluno que será inscrito</p>
                  </Label>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="self" id="self" />
                  <Label htmlFor="self" className="cursor-pointer flex-1">
                    <p className="font-medium">Sou o aluno e responsável financeiro</p>
                    <p className="text-sm text-muted-foreground">Participarei do curso e serei o responsável pelo pagamento</p>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Financial Responsible Form */}
          <Card>
            <CardHeader>
              <CardTitle>Responsável Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resp-cpf">CPF</Label>
                  <Input
                    id="resp-cpf"
                    value={responsibleData.cpf}
                    onChange={(e) => handleResponsibleChange("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-name">Nome Completo</Label>
                  <Input
                    id="resp-name"
                    value={responsibleData.name}
                    onChange={(e) => handleResponsibleChange("name", e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-phone">Telefone</Label>
                  <Input
                    id="resp-phone"
                    value={responsibleData.phone}
                    onChange={(e) => handleResponsibleChange("phone", e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-birthdate">Data de Nascimento</Label>
                  <Input
                    id="resp-birthdate"
                    type="date"
                    value={responsibleData.birthDate}
                    onChange={(e) => handleResponsibleChange("birthDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="resp-email">E-mail</Label>
                  <Input
                    id="resp-email"
                    type="email"
                    value={responsibleData.email}
                    onChange={(e) => handleResponsibleChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resp-cep">CEP</Label>
                  <Input
                    id="resp-cep"
                    value={responsibleData.cep}
                    onChange={(e) => handleResponsibleChange("cep", e.target.value)}
                    placeholder="00000-000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-state">Estado</Label>
                  <Input
                    id="resp-state"
                    value={responsibleData.state}
                    onChange={(e) => handleResponsibleChange("state", e.target.value)}
                    placeholder="UF"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-city">Cidade</Label>
                  <Input
                    id="resp-city"
                    value={responsibleData.city}
                    onChange={(e) => handleResponsibleChange("city", e.target.value)}
                    placeholder="Cidade"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="resp-neighborhood">Bairro</Label>
                  <Input
                    id="resp-neighborhood"
                    value={responsibleData.neighborhood}
                    onChange={(e) => handleResponsibleChange("neighborhood", e.target.value)}
                    placeholder="Bairro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-number">Número</Label>
                  <Input
                    id="resp-number"
                    value={responsibleData.number}
                    onChange={(e) => handleResponsibleChange("number", e.target.value)}
                    placeholder="123"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="resp-street">Rua</Label>
                  <Input
                    id="resp-street"
                    value={responsibleData.street}
                    onChange={(e) => handleResponsibleChange("street", e.target.value)}
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resp-complement">Complemento</Label>
                  <Input
                    id="resp-complement"
                    value={responsibleData.complement}
                    onChange={(e) => handleResponsibleChange("complement", e.target.value)}
                    placeholder="Apto, bloco, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Form - Only if responsible is different */}
          {registrationType === "responsible" && (
            <Card>
              <CardHeader>
                <CardTitle>Dados do Aluno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-cpf">CPF</Label>
                    <Input
                      id="student-cpf"
                      value={studentData.cpf}
                      onChange={(e) => handleStudentChange("cpf", e.target.value)}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Nome Completo</Label>
                    <Input
                      id="student-name"
                      value={studentData.name}
                      onChange={(e) => handleStudentChange("name", e.target.value)}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-phone">Telefone</Label>
                    <Input
                      id="student-phone"
                      value={studentData.phone}
                      onChange={(e) => handleStudentChange("phone", e.target.value)}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-birthdate">Data de Nascimento</Label>
                    <Input
                      id="student-birthdate"
                      type="date"
                      value={studentData.birthDate}
                      onChange={(e) => handleStudentChange("birthDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="student-email">E-mail</Label>
                    <Input
                      id="student-email"
                      type="email"
                      value={studentData.email}
                      onChange={(e) => handleStudentChange("email", e.target.value)}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-cep">CEP</Label>
                    <Input
                      id="student-cep"
                      value={studentData.cep}
                      onChange={(e) => handleStudentChange("cep", e.target.value)}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-state">Estado</Label>
                    <Input
                      id="student-state"
                      value={studentData.state}
                      onChange={(e) => handleStudentChange("state", e.target.value)}
                      placeholder="UF"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-city">Cidade</Label>
                    <Input
                      id="student-city"
                      value={studentData.city}
                      onChange={(e) => handleStudentChange("city", e.target.value)}
                      placeholder="Cidade"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="student-neighborhood">Bairro</Label>
                    <Input
                      id="student-neighborhood"
                      value={studentData.neighborhood}
                      onChange={(e) => handleStudentChange("neighborhood", e.target.value)}
                      placeholder="Bairro"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-number">Número</Label>
                    <Input
                      id="student-number"
                      value={studentData.number}
                      onChange={(e) => handleStudentChange("number", e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="student-street">Rua</Label>
                    <Input
                      id="student-street"
                      value={studentData.street}
                      onChange={(e) => handleStudentChange("street", e.target.value)}
                      placeholder="Nome da rua"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-complement">Complemento</Label>
                    <Input
                      id="student-complement"
                      value={studentData.complement}
                      onChange={(e) => handleStudentChange("complement", e.target.value)}
                      placeholder="Apto, bloco, etc."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extra Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Extras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="how-found">Como você nos conheceu?</Label>
                <Input
                  id="how-found"
                  value={howFoundUs}
                  onChange={(e) => setHowFoundUs(e.target.value)}
                  placeholder="Digite aqui..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5" />
                      <p className="font-medium">PIX</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <p className="font-medium">Cartão de Crédito</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <p className="font-medium">Boleto</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                Resumo do Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Taxa de Inscrição</span>
                <span className="font-medium">R$ {classData.enrollmentFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mensalidade (1º mês)</span>
                <span className="font-medium">R$ {classData.monthlyFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card>
            <CardHeader>
              <CardTitle>Código de Cupom (Opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Insira seu código de cupom"
              />
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card>
            <CardHeader>
              <CardTitle>Termos e Condições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  Concordo com os termos de serviço e política de privacidade
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!acceptedTerms}
          >
            Finalizar Inscrição
          </Button>
        </form>
      </div>
    </div>
  )
}
