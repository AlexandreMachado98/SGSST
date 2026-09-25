# ADR-002 — Provedor de Nuvem e Hospedagem

**Data:** 25/09/2026
**Status:** Aceito
**Contexto:**
A plataforma requer alta disponibilidade, conformidade com a LGPD, escalabilidade e integração com serviços de IA, mensageria e armazenamento.
**Decisão:**
A infraestrutura será baseada no **Google Cloud (GCP)**.
**Justificativa:**
- Decisão de negócio e técnica aprovada pelo responsável.
- Facilidade de integração com o Google Gemini para as funções de Inteligência Artificial propostas.
- Cloud Run para orquestração serverless do backend Node.js (NestJS), garantindo escalabilidade automática e baixo custo inicial.
- Cloud SQL for PostgreSQL para banco de dados relacional robusto.
- Cloud Storage para armazenamento de PDFs, laudos e fotos de inspeção de forma segura.
**Consequências:**
- Necessidade de gerenciar a rede VPC e regras de firewall internas no GCP para isolar o banco de dados da internet.
