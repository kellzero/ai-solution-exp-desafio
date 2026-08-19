'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [nome, setNome] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function carregarUsuario() {
      const { data: { user } } = await supabase.auth.getUser()
      setNome(user?.user_metadata?.nome || user?.email || '')
    }
    carregarUsuario()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
        <nav className="flex gap-6 text-slate-300">
          <a href="/dashboard/clientes" className="hover:text-orange-500 transition">Clientes</a>
          <a href="/dashboard/configuracoes" className="hover:text-orange-500 transition">Configurações</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">Olá, {nome}</span>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white transition text-sm">
            Sair
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}