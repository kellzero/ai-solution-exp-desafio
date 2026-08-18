# Desafio Técnico — AI Solution EXP

## Objetivo
Plataforma web com Home pública, autenticação e Dashboard com Gestão de Clientes e Configurações, desenvolvida como desafio técnico do processo seletivo para Desenvolvedor na AI Solution EXP.

## Stack
- Next.js + TypeScript
- Supabase (banco de dados + autenticação)
- Cloudflare Pages (deploy)

## Decisões técnicas
- Uso de Row Level Security (RLS) no Supabase com policies por `user_id`, garantindo isolamento de dados entre usuários na camada de banco.
- Proteção de rotas via Next.js Middleware, checando sessão do Supabase antes de renderizar qualquer página sob /dashboard.
- CRUD de Clientes implementado com Supabase (SDK client-side), usando um modal compartilhado para criação e edição, e RLS garantindo que cada usuário só acesse seus próprios clientes.

## Planejamento
Board no Whimsical: [https://whimsical.com/kelvin-home/fluxograma-9yshiHhAm4fKDHEjuVeA6p]