'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Cliente } from '@/lib/types'
import ClienteModal from './ClienteModal'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null)

  const supabase = createClient()

  async function carregarClientes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('data_cadastro', { ascending: false })

    if (!error && data) setClientes(data)
    setLoading(false)
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  async function handleExcluir(id: string) {
    if (!confirm('Excluir este cliente?')) return
    await supabase.from('clientes').delete().eq('id', id)
    carregarClientes()
  }

  function abrirNovo() {
    setClienteEditando(null)
    setModalAberto(true)
  }

  function abrirEditar(cliente: Cliente) {
    setClienteEditando(cliente)
    setModalAberto(true)
  }

  return (
   <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-white">Clientes</h1>
      <button
        onClick={abrirNovo}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        Novo cliente
      </button>
    </div>

    <table className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <thead className="bg-slate-800 text-slate-400 text-sm uppercase">
        <tr>
          <th className="text-left px-4 py-3">Nome</th>
          <th className="text-left px-4 py-3">Contato</th>
          <th className="text-left px-4 py-3">Status</th>
          <th className="text-left px-4 py-3">Cadastro</th>
          <th className="text-left px-4 py-3">Ações</th>
        </tr>
      </thead>
      <tbody className="text-slate-200 divide-y divide-slate-800">
        {clientes.map((cliente) => (
          <tr key={cliente.id} className="hover:bg-slate-800/50">
            <td className="px-4 py-3">{cliente.nome}</td>
            <td className="px-4 py-3">{cliente.contato}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded-full text-xs ${
                cliente.status === 'ativo'
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {cliente.status}
              </span>
            </td>
            <td className="px-4 py-3">{new Date(cliente.data_cadastro).toLocaleDateString()}</td>
            <td className="px-4 py-3 space-x-3">
              <button onClick={() => abrirEditar(cliente)} className="text-orange-500 hover:text-orange-400">Editar</button>
              <button onClick={() => handleExcluir(cliente.id)} className="text-red-400 hover:text-red-300">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {modalAberto && (
      <ClienteModal
        cliente={clienteEditando}
        onClose={() => setModalAberto(false)}
        onSalvo={() => {
          setModalAberto(false)
          carregarClientes()
        }}
      />
    )}
   </div>
 )
}