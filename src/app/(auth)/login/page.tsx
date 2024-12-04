'use client';

import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>  

export default function Home() {
  const router = useRouter()
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email: data.email,
        senha: data.senha
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type" : 'application/json'
        }
      }
    )

      console.log(response.data)
      localStorage.setItem('authToken', response.data.token)
    

      console.log('redirecionando para /perfil...')
      router.push('/dashboard')
      console.log('Redirecioanamento executado.')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data.message || 'Erro de autenticação')
      } else {
        setLoginError('Erro inesperado')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-blue-700 font-bold mb-6 text-center">Login</h2>
        
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {loginError}
          </div>
        )}

        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-black">E-mail</label>
            <input 
              type="email" 
              id="email"
              {...register('email')}
              className={`w-full p-2 border rounded text-black ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-black">Senha</label>
            <input 
              type="password" 
              id="password"
              {...register('senha')}
              className={`w-full p-2 border rounded text-black ${
                errors.senha ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.senha && (
              <p className="text-red-500 text-sm mt-1">
                {errors.senha.message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>
        <div className="flex items-center justify-center mt-5">
            <Link className=" mb-2 text-black" href={'/cadastro'}> Cadastre-se </Link>
        </div>
      </div>
    </div> 
  );
}
