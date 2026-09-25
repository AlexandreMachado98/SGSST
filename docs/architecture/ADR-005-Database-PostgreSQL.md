# ADR-005 — Banco de Dados e Isolamento de Tenant

**Data:** 25/09/2026
**Status:** Aceito
**Contexto:**
A plataforma multiempresa (SaaS) precisa isolar dados (Tenants) rigorosamente e garantir que nenhum usuário consiga ver registros de empresas que não tenha permissão.
**Decisão:**
Adotaremos **PostgreSQL** com a funcionalidade nativa de **Row-Level Security (RLS)**.
**Justificativa:**
- Ao invés de um banco de dados por cliente (muito caro) ou filtragem apenas em nível de código de aplicação (propenso a vazamentos por falha humana na query), o RLS assegura que o próprio banco de dados aborte consultas de dados alheios.
- Os schemas serão divididos: `public`, `sst_core`, `sst_health`, `sst_inspections`, limitando também as permissões do usuário do banco (Role) de acordo com o módulo.
**Consequências:**
- Toda _query_ do backend precisará setar a sessão local de banco de dados (`set_config('app.current_tenant_id', 'id', false)`) antes da transação.
