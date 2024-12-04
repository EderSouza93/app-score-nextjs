'use client';

// import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  // const isAuthenticated = useAuth()

  // if(!isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <nav>
            <a href="/" className="text-white hover:underline">
              Logout
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Dashboard!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Painel 1</h3>
            <p className="text-gray-600">Conteúdo genérico para testes.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Painel 2</h3>
            <p className="text-gray-600">Mais informações aqui.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Painel 3</h3>
            <p className="text-gray-600">Outro conteúdo para explorar.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Seu Projeto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
