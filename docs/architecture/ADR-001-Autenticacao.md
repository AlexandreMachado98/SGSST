# ADR-001 — Autenticação e Gestão de Identidades

**Data:** 25/09/2026
**Status:** Aceito
**Contexto:**
O SGSST exige um sistema robusto de autenticação, suportando RBAC/ABAC, segurança contra ataques de força bruta, MFA (Multi-Factor Authentication) e isolamento de tenants (empresas).
**Decisão:**
Adotaremos **Firebase Auth** como provedor de identidade primário.
**Justificativa:**
- Reduz o overhead de desenvolver do zero (recuperação de senha, e-mails de validação).
- Integração nativa com ecossistema Google Cloud.
- Permite uso de _Custom Claims_ para injetar o `tenant_id` e a _role_ do usuário no token JWT, facilitando a aplicação de RLS (Row-Level Security) no PostgreSQL.
- Permite evoluir facilmente para Single Sign-On (SSO) corporativo futuro.
**Consequências:**
- O backend precisará validar tokens JWT emitidos pelo Firebase Auth utilizando o Firebase Admin SDK.
- Usuários não terão senhas salvas no banco do SGSST (apenas uma referência `firebase_uid` na tabela `users`).
