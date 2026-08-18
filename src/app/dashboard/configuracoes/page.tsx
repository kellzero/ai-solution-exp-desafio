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
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-white mb-6">Configurações</h1>
      <form onSubmit={handleSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
        />
        <input
          type="password"
          placeholder="Nova senha (deixe em branco para não alterar)"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
        />
        {mensagem && <p className="text-sm text-orange-400">{mensagem}</p>}
        <button
          type="submit"
          disabled={salvando}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition"
        >
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  )
}