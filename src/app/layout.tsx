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
    <div>
      <header>
        <nav>
          <a href="/dashboard/clientes">Clientes</a>
          <a href="/dashboard/configuracoes">Configurações</a>
        </nav>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <main>{children}</main>
    </div>
  )
}