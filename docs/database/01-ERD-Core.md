# Estrutura do Banco de Dados (ERD Inicial)
**Fase 4 - Mapa de Banco de Dados**

Este diagrama apresenta o núcleo relacional do SGSST. Ele reflete o isolamento por `tenant_id` (Organização) e a segregação lógica de informações sensíveis (Saúde) vs Operacionais.

```mermaid
erDiagram
    %% Core / Auth
    Organization {
        uuid id PK
        string name
        string cnpj
        string status
    }
    Company {
        uuid id PK
        uuid organization_id FK
        string name
        string cnpj
    }
    User {
        uuid id PK
        string firebase_uid
        string email
        string name
    }
    UserCompanyRole {
        uuid user_id FK
        uuid company_id FK
        string role "Admin, Engenheiro, Medico, etc"
    }

    %% Funcionários e Estrutura
    Employee {
        uuid id PK
        uuid company_id FK
        string name
        string cpf
        string matricula
        string status
    }

    %% Segurança e Checklists (sst_inspections)
    ChecklistTemplate {
        uuid id PK
        uuid company_id FK
        string title
        jsonb fields
        int version
    }
    ChecklistExecution {
        uuid id PK
        uuid company_id FK
        uuid template_id FK
        uuid executed_by FK
        timestamp executed_at
        jsonb answers
        string signature_hash
    }
    NonConformity {
        uuid id PK
        uuid company_id FK
        uuid execution_id FK
        string description
        string severity
        string status
    }
    ActionPlan {
        uuid id PK
        uuid non_conformity_id FK
        uuid responsible_id FK
        string what
        string why
        date deadline
        string status
    }

    %% Saúde Ocupacional (sst_health)
    MedicalExam {
        uuid id PK
        uuid employee_id FK
        string exam_type
        date scheduled_date
        string result "Apto, Inapto, etc"
    }
    ASO {
        uuid id PK
        uuid employee_id FK
        uuid doctor_id FK
        date issue_date
        string result
        string pdf_hash
    }

    %% Relacionamentos
    Organization ||--o{ Company : "possui"
    User ||--o{ UserCompanyRole : "tem papel em"
    Company ||--o{ UserCompanyRole : "tem usuários"
    Company ||--o{ Employee : "emprega"
    Company ||--o{ ChecklistTemplate : "cria"
    Company ||--o{ NonConformity : "registra"
    ChecklistTemplate ||--o{ ChecklistExecution : "gera"
    ChecklistExecution ||--o{ NonConformity : "pode gerar"
    NonConformity ||--o{ ActionPlan : "pode exigir"
    Employee ||--o{ MedicalExam : "realiza"
    Employee ||--o{ ASO : "possui"

```

## Considerações de Banco
- **Row-Level Security (RLS):** Todas as tabelas que possuem `company_id` ou `organization_id` (com exceção das tabelas de configuração global) terão políticas de RLS.
- **Tenant Context:** O backend passará o contexto do Tenant ativo antes das transações.
- **Trilha de Auditoria:** Uma tabela `audit_log` (Schema Append-Only) guardará `table_name`, `record_id`, `action`, `old_data` (JSONB), `new_data` (JSONB), `user_id`, garantindo rastreabilidade histórica completa.
