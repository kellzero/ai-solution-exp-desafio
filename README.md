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

## Observação sobre disponibilidade

No momento da entrega, o Supabase apresenta uma instabilidade confirmada e documentada em seu serviço de Auth (status oficial: https://status.supabase.com), causando lentidão intermitente no login em produção. É um problema de infraestrutura do provedor, fora do controle da aplicação, com correção em rollout ativo pela própria Supabase.

Para garantir a avaliação mesmo durante essa instabilidade, incluí vídeos demonstrando todos os fluxos funcionando: [https://drive.google.com/file/d/1Y3jxh58U9jdX5BkrgxtHB3YI9Ow8EO87/view?usp=drive_link] e [https://drive.google.com/file/d/1LOGI6SJOTNGf6vayMbgqoFn1n1wtTA0I/view?usp=drive_link].