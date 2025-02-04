import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portal de Pontuação da Liga',
  description: 'Acompanhe sua pontuação',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
