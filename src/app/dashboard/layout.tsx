'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
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
        <button
          onClick={handleLogout}
          className="text-slate-400 hover:text-white transition text-sm">
          Sair
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}