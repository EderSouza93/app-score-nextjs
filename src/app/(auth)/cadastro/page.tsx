'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Cargo {
  id: number;
  nome: string;
}

interface Equipe {
  id: number;
  nome: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    instagram: "",
    cargoId: "",
    equipeId: "",
  });

  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
   api.get('/cargos')
    .then((response) => setCargos(response.data))
    .catch((error) => console.error('Erro ao buscar cargpos:', error));

    api.get('/equipes')
      .then((response) => setEquipes(response.data))
      .catch((error) => console.error('Erro ao buscar equipes:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não concidem!');
        return;
    }

    const { confirmarSenha, ...userData } = formData

    const updatedFormData = {
      ...userData,
      cargoId: parseInt(formData.cargoId, 10),
      equipeId: parseInt(formData.equipeId, 10),
    };
    
    setLoading(true);
    setErrorMessage("");

    api.post('/users', updatedFormData)
      .then((response) => {
        toast.success('Usuário cadastrado com sucesso!');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        setErrorMessage('Erro ao cadastrar usuário')
        toast.error('Erro ao cadastrar usuário')
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
          <CardDescription className="text-center">
            Preencha seus dados para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargoId">Cargo</Label>
              <select
                id="cargoId"
                className="w-full border rounded px-2 py-1"
                value={formData.cargoId}
                onChange={(e) => setFormData({ ...formData, cargoId: e.target.value })}
                required
              >
                <option value="">Selecione um Cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipeId">Equipe</Label>
              <select
                id="equipeId"
                className="w-full border rounded px-2 py-1"
                value={formData.equipeId}
                onChange={(e) => setFormData({ ...formData, equipeId: e.target.value })}
                required
              >
                <option value="">Selecione uma Equipe</option>
                {equipes.map((equipe) => (
                  <option key={equipe.id} value={equipe.id}>
                    {equipe.nome}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <ClipLoader size={20} color="#ffffff" loading={loading} />
              ) : (
                "Cadastrar"
              )}
            </Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
        <ToastContainer/>
      </Card>
    </div>
  );
}