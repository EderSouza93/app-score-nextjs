'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import Link from "next/link";

// Schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("O email é obrigatório"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipagem derivada do esquema
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("/api/login", data);
      console.log("Login bem-sucedido:", response.data);
      // Adicione lógica para salvar tokens ou redirecionar o usuário
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Adicione lógica para exibir mensagens de erro ao usuário
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl text-center">Liga COHAB</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Sua senha"
                {...register("senha")}
              />
              {errors.senha && (
                <p className="text-red-500 text-sm">{errors.senha.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm">
              Ainda não possui sua conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline">
                realize seu cadastro
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
