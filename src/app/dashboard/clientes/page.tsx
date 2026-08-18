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
      <div>
        <h1>Clientes</h1>
        <button onClick={abrirNovo}>Novo cliente</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Status</th>
              <th>Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.status}</td>
                <td>{new Date(cliente.data_cadastro).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => abrirEditar(cliente)}>Editar</button>
                  <button onClick={() => handleExcluir(cliente.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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