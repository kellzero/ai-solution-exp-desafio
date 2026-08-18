export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
      <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Gestão de Clientes</span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Plataforma de Gestão de Clientes</h1>
      <p className="text-slate-400 max-w-md mb-8">
        Sistema simples para cadastro e acompanhamento de clientes,
        desenvolvido como desafio técnico para a AI Solution EXP.
      </p>
      <a href="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition">Entrar</a>
    </main>
  )
}