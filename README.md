# Desafio Técnico — AI Solution EXP

## Objetivo
Plataforma web com Home pública, autenticação e Dashboard com Gestão de Clientes e Configurações, desenvolvida como desafio técnico do processo seletivo para Desenvolvedor na AI Solution EXP.

## Stack
- Next.js + TypeScript
- Supabase (banco de dados + autenticação)
- Cloudflare Pages (deploy)

## Decisões técnicas
- **Next.js + TypeScript** escolhido deliberadamente (não exigido pelo desafio) para demonstrar domínio direto dos requisitos da vaga.
- **Supabase** como back-end único (DB + Auth), consumido diretamente do client, sem rotas de servidor do Next para a lógica principal.
- **Row Level Security (RLS)** na tabela `clientes`, com policies por `user_id` — isolamento de dados garantido na camada de banco, não só na aplicação.
- **Proteção de rotas via Next.js Middleware**, checando sessão do Supabase antes de renderizar qualquer página sob `/dashboard`.
- **Modal compartilhado** para criação e edição de clientes, evitando duplicar formulário.
- **Configurações** usa `supabase.auth.updateUser()`; nome do usuário salvo em `user_metadata`.
- **Deploy via OpenNext Cloudflare adapter** (`@opennextjs/cloudflare`), não `@cloudflare/next-on-pages` — descontinuado pela Cloudflare em favor do   OpenNext, com suporte completo ao middleware (Node.js runtime).


## Planejamento
Board no Whimsical: [https://whimsical.com/kelvin-home/fluxograma-9yshiHhAm4fKDHEjuVeA6p]

## URL em produção
[https://ai-solution-exp-desafio.kellzer01.workers.dev/]