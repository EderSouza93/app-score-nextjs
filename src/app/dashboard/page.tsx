'use client'

import React, { useState } from 'react'
import {
  Layout,
  User,
  Users,
  TrendingUp,
  Calendar,
  Award,
  Menu,
} from 'lucide-react'

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState('corretor')
  const [menuAberto, setMenuAberto] = useState(false)

  // Cartões de métricas reutilizáveis
  const renderCartoesMetricas = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">VGV Total</p>
            <p className="text-2xl font-semibold">R$ 1.860.820</p>
          </div>
          <TrendingUp className="text-blue-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Plantões</p>
            <p className="text-2xl font-semibold">15</p>
          </div>
          <Calendar className="text-green-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Pontuação Total</p>
            <p className="text-2xl font-semibold">2.271</p>
          </div>
          <Award className="text-purple-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p className="text-2xl font-semibold">Executivo</p>
          </div>
          <User className="text-orange-500" />
        </div>
      </div>
    </div>
  )

  // Menu mobile
  const renderMenuMobile = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="p-2 rounded-lg bg-white shadow"
      >
        <Menu size={24} />
      </button>

      {menuAberto && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-50">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveRole('corretor')
                setMenuAberto(false)
              }}
              className={`p-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'corretor' ? 'bg-blue-500 text-white' : ''
              }`}
            >
              <User size={20} />
              <span>Corretor</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('gerente')
                setMenuAberto(false)
              }}
              className={`p-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'gerente' ? 'bg-blue-500 text-white' : ''
              }`}
            >
              <Users size={20} />
              <span>Gerente</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('admin')
                setMenuAberto(false)
              }}
              className={`p-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'admin' ? 'bg-blue-500 text-white' : ''
              }`}
            >
              <Layout size={20} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderConteudoPorPerfil = () => {
    switch (activeRole) {
      case 'corretor':
        return (
          <div className="space-y-6">
            {renderCartoesMetricas()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Desempenho Mensal
                </h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  [Área do Gráfico]
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Metas e Objetivos
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <span className="mb-2 md:mb-0">VGV Mensal</span>
                    <div className="w-full md:w-1/2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <span className="mb-2 md:mb-0">Plantões</span>
                    <div className="w-full md:w-1/2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'gerente':
        return (
          <div className="space-y-6">
            {renderCartoesMetricas()}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Desempenho da Equipe
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Corretor</th>
                        <th className="text-right p-2">VGV</th>
                        <th className="text-right p-2">Plantões</th>
                        <th className="text-right p-2">Pontuação</th>
                        <th className="text-right p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Wagner Souza</td>
                        <td className="text-right p-2">R$ 1.860.820</td>
                        <td className="text-right p-2">15</td>
                        <td className="text-right p-2">2.271</td>
                        <td className="text-right p-2">Executivo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case 'admin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Visão Geral</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total de Equipes</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Corretores</span>
                    <span className="font-semibold">54</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VGV Global</span>
                    <span className="font-semibold">R$ 8.547.890</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Desempenho por Equipe
                </h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                  [Gráfico Comparativo]
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Status dos Corretores
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Executivo</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pleno</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sem Status</span>
                    <span className="font-semibold">31</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 md:p-6">
        <div className="mb-6">
          {renderMenuMobile()}
          <div className="hidden lg:flex space-x-4 mb-6">
            <button
              onClick={() => setActiveRole('corretor')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'corretor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
            >
              <User size={20} />
              <span>Corretor</span>
            </button>
            <button
              onClick={() => setActiveRole('gerente')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'gerente' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Users size={20} />
              <span>Gerente</span>
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeRole === 'admin' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              <Layout size={20} />
              <span>Admin</span>
            </button>
          </div>
        </div>
        {renderConteudoPorPerfil()}
      </div>
    </div>
  )
}

export default Dashboard
