'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setErro('E-mail ou senha inválidos.')
      return
    }

    router.push('/dashboard/clientes')
    router.refresh() // garante que o middleware releia a sessão nova
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
  <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-sm space-y-4">
    <h1 className="text-white text-xl font-semibold mb-2">Entrar</h1>
    <input
      type="email"
      placeholder="E-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
    />
    <input
      type="password"
      placeholder="Senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required
      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
    />
    {erro && <p className="text-orange-400 text-sm">{erro}</p>}
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition"
    >
      Entrar
    </button>
  </form>
</div>
  )
}