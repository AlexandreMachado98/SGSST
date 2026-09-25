# ADR-004 — Estratégia Mobile

**Data:** 25/09/2026
**Status:** Aceito
**Contexto:**
Há a necessidade de aplicativo em campo (offline) para checklists e inspeções, e já existe um app Kotlin Android construído anteriormente pelo cliente.
**Decisão:**
**Reaproveitaremos o aplicativo Kotlin Android nativo existente** para a área de relatórios/checklists. Essa etapa será deixada para a fase final.
**Justificativa:**
- Reaproveitamento de código e economia de recursos iniciais.
- Evita reescrever um módulo que já funciona satisfatoriamente.
**Consequências:**
- O backend deverá expor APIs REST/GraphQL que sirvam o app legado de forma compatível.
- A decisão de unificar bases de código (ex: portar para React Native no futuro) fica postergada até que haja justificativa de negócio (ex: lançamento para iOS).
- O aplicativo Kotlin deverá ser adaptado posteriormente para autenticar via Firebase Auth (ADR-001).
