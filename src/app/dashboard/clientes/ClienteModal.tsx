'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Cliente } from '@/lib/types'

type Props = {
  cliente: Cliente | null
  onClose: () => void
  onSalvo: () => void
}

export default function ClienteModal({ cliente, onClose, onSalvo }: Props) {
  const [nome, setNome] = useState(cliente?.nome ?? '')
  const [contato, setContato] = useState(cliente?.contato ?? '')
  const [status, setStatus] = useState<'ativo' | 'inativo'>(cliente?.status ?? 'ativo')
  const [salvando, setSalvando] = useState(false)

  const supabase = createClient()

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)

    if (cliente) {
      await supabase
        .from('clientes')
        .update({ nome, contato, status })
        .eq('id', cliente.id)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase
        .from('clientes')
        .insert({ nome, contato, status, user_id: user?.id })
    }

    setSalvando(false)
    onSalvo()
  }
  
  function handleNomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.replace(/[0-9]/g, '')
    setNome(valor)
  }
  function handleContatoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.replace(/[^0-9]/g, '')
    setContato(valor)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-white text-lg font-semibold mb-4">
          {cliente ? 'Editar cliente' : 'Novo cliente'}
        </h2>
        <form onSubmit={handleSalvar} className="space-y-4">
          <input
            placeholder="Nome"
            value={nome}
            onChange={handleNomeChange}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <input
            placeholder="Contato"
            value={contato}
            onChange={handleContatoChange}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo')}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white px-4 py-2">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}