'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ConfiguracoesPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function carregarUsuario() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email ?? '')
        setNome(user.user_metadata?.nome ?? '')
      }
    }
    carregarUsuario()
  }, [])

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMensagem(null)

    const updates: { email?: string; password?: string; data?: { nome: string } } = {
      data: { nome },
    }
    if (email) updates.email = email
    if (novaSenha) updates.password = novaSenha

    const { error } = await supabase.auth.updateUser(updates)

    setSalvando(false)
    setMensagem(error ? 'Erro ao salvar.' : 'Dados atualizados com sucesso.')
    setNovaSenha('')
  }

  return (
    <div>
      <h1>Configurações</h1>
      <form onSubmit={handleSalvar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nova senha (deixe em branco para não alterar)"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        {mensagem && <p>{mensagem}</p>}
        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  )
}