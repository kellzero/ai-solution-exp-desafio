export type Cliente = {
  id: string
  user_id: string
  nome: string
  contato: string
  status: 'ativo' | 'inativo'
  data_cadastro: string
}