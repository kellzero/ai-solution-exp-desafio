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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{cliente ? 'Editar cliente' : 'Novo cliente'}</h2>
        <form onSubmit={handleSalvar}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            placeholder="Contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo')}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <div>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}