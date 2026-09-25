# ADR-003 — Integração e Mensageria do eSocial

**Data:** 25/09/2026
**Status:** Aceito
**Contexto:**
O sistema deve gerar e transmitir eventos de SST (S-2210, S-2220, S-2240) para o governo federal.
**Decisão:**
A integração será feita **do zero (in-house), comunicando diretamente com os Webservices do Serpro**, sem APIs intermediárias de mercado.
**Justificativa:**
- Evita _lock-in_ e custos recorrentes adicionais por envio.
- Permite controle total do XML gerado, fluxos de contingência, guarda de recibos e tratamento específico das mensagens de erro do sistema do governo.
**Consequências:**
- Exigirá a implementação de um _Vault_ de Certificados Digitais A1 seguros.
- Complexidade considerável na leitura de WSDLs/XSDs do Serpro, assinatura SOAP e gestão de fila assíncrona (com retentativas programadas, _dead-letter queues_, etc).
