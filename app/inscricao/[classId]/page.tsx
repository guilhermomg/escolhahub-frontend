import { InscricaoForm } from "@/components/inscricao/inscricao-form"

export function generateStaticParams() {
  return [
    { classId: "1" },
    { classId: "2" },
  ]
}

interface PageProps {
  params: Promise<{
    classId: string
  }>
}

export default async function InscricaoPage({ params }: PageProps) {
  const { classId } = await params
  
  return <InscricaoForm classId={classId} />
}
