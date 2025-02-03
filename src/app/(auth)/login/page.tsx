'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/password-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import api from '@/services/api'
import { ClipLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/logoComponent'
import BackgroundLayout from '@/components/backgroundCurved'

export default function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await api.post('/login', formData)
      toast.success('Login realizado com sucesso!')
      console.log('Resposta do servidor:', response.data)
      // Aqui você pode salvar o token no localStorage ou redirecionar o usuário
    } catch (error) {
      console.error('Erro durante o login:', error)
      toast.error('Erro ao realizar login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BackgroundLayout>
      <main className="relative">
        {/* Logo */}
        <div className="flex justify-center items-center pt-10 lg:justify-start lg:pt-0">
          <Logo
            src="assets/logo.svg"
            alt="Logo Liga COHAB"
            width={100}
            height={100}
            className="lg:ml-8"
            priority={true}
          />
        </div>

        {/* Formulário */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#454B60]">
            Login
          </h1>
          <Card className="w-[350px] md:w-[400px] lg:w-[500px] mb-24">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#454B60]">
                Bem-vindo de volta!
              </CardTitle>
              <CardDescription>
                Faça login para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <PasswordInput
                  placeholder="Senha"
                  className="bg-[#F2F6FA] border-none"
                  value={formData.senha}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#222872] hover:bg-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="#ffffff" />
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
              <div className="text-center text-sm">
                Não possui uma conta?{' '}
                <Link href="/cadastro" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardContent>
          </Card>
          <ToastContainer />
        </div>
      </main>
    </BackgroundLayout>
  )
}
