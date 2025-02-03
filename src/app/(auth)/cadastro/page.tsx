'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/password-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/logoComponent'
import BackgroundLayout from '@/components/backgroundCurved'

interface Cargo {
  id: number
  nome: string
}

interface Equipe {
  id: number
  nome: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    instagram: '',
    cargoId: '',
    equipeId: '',
  })

  const [cargos, setCargos] = useState<Cargo[]>([])
  const [equipes, setEquipes] = useState<Equipe[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    api
      .get('/cargos')
      .then((response) => setCargos(response.data))
      .catch((error) => {
        console.error('Erro ao buscar cargos:', error)
        setErrorMessage('Erro ao carregar cargos. Por favor, tente novamente.')
      })

    api
      .get('/equipes')
      .then((response) => setEquipes(response.data))
      .catch((error) => {
        console.error('Erro ao buscar equipes:', error)
        setErrorMessage('Erro ao carregar cargos. Por favor, tente novamente.')
      })
  }, [])

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem!')
      return
    }

    const cargoSelecionado = cargos.find(
      (cargo) => cargo.id === parseInt(formData.cargoId, 10)
    )
    const equipeSelecionada = equipes.find(
      (equipe) => equipe.id === parseInt(formData.equipeId, 10)
    )

    const updatedFormData = {
      ...formData,
      cargo: cargoSelecionado ? cargoSelecionado.nome : '',
      equipe: equipeSelecionada ? equipeSelecionada.nome : '',
    }

    setLoading(true)
    setErrorMessage('')

    api
      .post('/cadastrar', updatedFormData)
      .then((response) => {
        toast.success('Usuário cadastrado com sucesso!')
        setTimeout(() => {
          router.push('/login')
        }, 5000)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error)
        setErrorMessage('Erro ao cadastrar usuário')
        toast.error('Erro ao cadastrar usuário')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <BackgroundLayout>
      <main className="relative min-h-screen">
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
            Cadastro
          </h1>
          <Card className="w-[350px] md:w-[400px] lg:w-[500px] mb-24">
            <CardHeader className="space-y-1">
              <CardDescription className="text-center font-bold text-[#454B60]">
                Insira seus dados para cadastro
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs */}
                <Input
                  id="nome"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="email"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="instagram"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  required
                />
                <PasswordInput
                  id="senha"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                />
                <PasswordInput
                  id="confirmarSenha"
                  className="bg-[#F2F6FA] border-none"
                  placeholder="Confirme a senha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  required
                />

                {/* Selects */}
                <Select
                  value={formData.cargoId || undefined}
                  onValueChange={(value) =>
                    setFormData({ ...formData, cargoId: value })
                  }
                  required
                >
                  <SelectTrigger className="w-full bg-[#F2F6FA] border-none">
                    <SelectValue placeholder="Cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargos.map((cargo) => (
                      <SelectItem key={cargo.id} value={cargo.id.toString()}>
                        {cargo.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.equipeId || undefined}
                  onValueChange={(value) =>
                    setFormData({ ...formData, equipeId: value })
                  }
                  required
                >
                  <SelectTrigger className="w-full bg-[#F2F6FA] border-none">
                    <SelectValue placeholder="Equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipes.map((equipe) => (
                      <SelectItem key={equipe.id} value={equipe.id.toString()}>
                        {equipe.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox required id="terms" />
                  <label htmlFor="terms" className="text-sm leading-none">
                    Eu aceito os{' '}
                    <Link
                      href="/termos"
                      className="text-primary hover:underline"
                    >
                      termos e condições
                    </Link>
                  </label>
                </div>

                {/* Botão */}
                <Button
                  type="submit"
                  className="w-full bg-[#222872] hover:bg-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="#ffffff" loading={loading} />
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </main>
    </BackgroundLayout>
  )
}
