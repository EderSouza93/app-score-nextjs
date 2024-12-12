"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import api from "@/services/api";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    api
      .get("/cargos")
      .then((response) => setCargos(response.data))
      .catch((error) => console.error("Erro ao buscar cargpos:", error));

    api
      .get("/equipes")
      .then((response) => setEquipes(response.data))
      .catch((error) => console.error("Erro ao buscar equipes:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não concidem!");
      return;
    }

    const { confirmarSenha, ...userData } = formData;

    const updatedFormData = {
      ...userData,
      cargoId: parseInt(formData.cargoId, 10),
      equipeId: parseInt(formData.equipeId, 10),
    };

    setLoading(true);
    setErrorMessage("");

    api
      .post("/users", updatedFormData)
      .then((response) => {
        toast.success("Usuário cadastrado com sucesso!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        setErrorMessage("Erro ao cadastrar usuário");
        toast.error("Erro ao cadastrar usuário");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <img src="/assets/logo.svg" alt="Liga Premium" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-[#454B60]">
            Cadastro
          </CardTitle>
          <CardDescription className="text-center font-bold text-[#454B60] pt-12">
            Insira seus dados para cadastro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                placeholder="Senha"
                type="password"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="confirmPassword"
                placeholder="Confirme a senha"
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) =>
                  setFormData({ ...formData, confirmarSenha: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Select
                value={formData.cargoId || undefined}
                onValueChange={(value) =>
                  setFormData({ ...formData, cargoId: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Cargo</SelectItem>
                  {cargos.map((cargos) => (
                    <SelectItem key={cargos.id} value={cargos.id.toString()}>
                      {cargos.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select
                value={formData.equipeId || undefined}
                onValueChange={(value) =>
                  setFormData({ ...formData, equipeId: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Equipe</SelectItem>
                  {equipes.map((equipes) => (
                    <SelectItem key={equipes.id} value={equipes.id.toString()}>
                      {equipes.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Input
                id="instagram"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                required
              />
            </div>
            <div className="text-center text-sm py-5">
              <Checkbox required id="terms" />
              
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Link href="/login" className="text-primary hover:underline mx-3">
                  Eu aceito os termos e condições
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#222872] hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="#ffffff" loading={loading} />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </CardContent>
        <ToastContainer />
      </Card>
    </div>
  );
}
