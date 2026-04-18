# Auditoria — TypeScript types vs. Schema Supabase

**Data:** 2026-04-18
**Fonte de verdade:** [`src/types/car.ts`](../../src/types/car.ts)
**Migration que executa o alinhamento:** [`002_align_schema_to_types.sql`](./002_align_schema_to_types.sql)

Decisão tomada pelo utilizador (**Opção A**): os TypeScript types são a fonte de
verdade. O schema é alterado para corresponder aos types, não o contrário.

---

## Interface `Car` (listagem)

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `id` | `string` | KEEP | PK já existe em `cars.id` (UUID). |
| `slug` | `string` | KEEP | Já existe com UNIQUE constraint. |
| `brand` | `string` | KEEP (alias) | Obtido via `brand:brands(name)` no select. |
| `model` | `string` | RENAME `model_name → model` | Alinhamento nominal. |
| `generation` | `string` | KEEP (alias) | Obtido via `generation:generation_code` no select. |
| `category_slug` | `string` | KEEP (alias) | Obtido via `category_slug:categories(slug)`. |
| `category_name` | `string` | KEEP (alias) | Obtido via `category_name:categories(name)`. |
| `power_hp` | `number` | KEEP | Coluna numérica existente. |
| `accel_0_100` | `number` | RENAME `acceleration_0_100 → accel_0_100` | Alinhamento nominal mais conciso. |

---

## Interface `CarDetail` (ficha completa, estende `Car`)

### Identificação e relações

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `brand_id` | `string` | KEEP | FK para `brands.id`. |
| `category_id` | `string` | KEEP | FK para `categories.id`. |
| `variant` | `string` | ADD | Designação comercial (ex: "Competition"). |
| `generation_code` | `string` | KEEP | Código técnico (ex: "F80"); já existia. |
| `year_start` | `number` | KEEP | Ano de início de produção. |
| `year_end` | `number \| null` | KEEP | Nullable para carros ainda em produção. |
| `tagline` | `string` | ADD | Frase editorial curta (hero). |
| `description` | `string` | ADD | Descrição editorial longa (markdown). |

### Motor

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `engine_name` | `string` | KEEP | Nome comercial do bloco (ex: "S55"). |
| `engine_type` | `string` | ADD | Tipo (I6, V8, W12, etc). |
| `engine_layout` | `string` | KEEP | Posição (frontal, central, traseira). |
| `displacement_cc` | `number` | KEEP | Cilindrada em cc. |
| `cylinders` | `number` | ADD | Número de cilindros. |
| `valves_per_cyl` | `number` | ADD | Válvulas por cilindro. |
| `forced_induction` | `string` | KEEP | Sobrealimentação (NA, turbo, supercharger). |

### Performance

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `power_kw` | `number` | KEEP | Potência em kW. |
| `power_rpm` | `string` | ADD (TEXT) | Regime de potência máxima — TEXT para permitir "6500-8200". |
| `torque_nm` | `number` | KEEP | Binário em Nm. |
| `torque_rpm` | `string` | ADD (TEXT) | Regime de binário máximo — TEXT para permitir ranges. |
| `top_speed_kph` | `number` | RENAME `top_speed_kmh → top_speed_kph` | Alinhamento nominal (kph vs kmh). |
| `top_speed_limited` | `boolean` | KEEP | Se o top speed está electronicamente limitado. |
| `accel_0_200` | `number` | RENAME `acceleration_0_200 → accel_0_200` | Consistência com `accel_0_100`. |
| `accel_quarter_mile` | `number` | ADD | Tempo para o ¼ de milha em segundos. |

### Transmissão

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `transmission_type` | `string` | KEEP | Tipo (manual, DCT, AT). |
| `transmission_name` | `string` | ADD | Nome comercial (ex: "M-DCT", "PDK"). |
| `gears` | `number` | RENAME `transmission_gears → gears` | Alinhamento nominal mais conciso. |
| `drive_type` | `string` | RENAME `drivetrain → drive_type` | Alinhamento nominal. |
| `differential` | `string` | ADD | Tipo de diferencial (electrónico, Torsen, etc). |

### Dimensões

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `weight_kg` | `number` | KEEP | Peso em ordem de marcha. |
| `length_mm` | `number` | KEEP | Comprimento. |
| `width_mm` | `number` | KEEP | Largura. |
| `height_mm` | `number` | KEEP | Altura. |
| `wheelbase_mm` | `number` | KEEP | Distância entre eixos. |
| `fuel_tank_liters` | `number` | ADD | Capacidade do depósito. |
| `trunk_liters` | `number` | RENAME `trunk_capacity_liters → trunk_liters` | Alinhamento nominal mais conciso. |

### Consumo

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `fuel_type` | `string` | KEEP | Tipo de combustível. |
| `consumption_combined` | `number` | RENAME `fuel_consumption_combined → consumption_combined` | Alinhamento nominal mais conciso. |
| `co2_emissions` | `number` | KEEP | Emissões CO2 combinadas (g/km). |

### Chassis

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `front_suspension` | `string` | KEEP | Tipo de suspensão frontal. |
| `rear_suspension` | `string` | KEEP | Tipo de suspensão traseira. |
| `front_brakes` | `string` | KEEP | Tipo de travões frontais. |
| `rear_brakes` | `string` | KEEP | Tipo de travões traseiros. |
| `front_tires` | `string` | KEEP | Dimensão dos pneus frontais. |
| `rear_tires` | `string` | KEEP | Dimensão dos pneus traseiros. |

### Preço

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `price_new_eur` | `number` | RENAME `price_eur_new → price_new_eur` | Ordenação de tokens (new_eur é mais legível). |
| `price_used_min_eur` | `number` | RENAME `price_eur_used_low → price_used_min_eur` | Nomenclatura min/max é mais clara que low/high. |
| `price_used_max_eur` | `number` | RENAME `price_eur_used_high → price_used_max_eur` | Idem acima. |

### Avaliação editorial

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `score_performance` | `number` | ADD | Score editorial 0–10 (performance). |
| `score_handling` | `number` | ADD | Score editorial 0–10 (handling). |
| `score_comfort` | `number` | ADD | Score editorial 0–10 (conforto). |
| `score_value` | `number` | ADD | Score editorial 0–10 (relação qualidade/preço). |
| `score_overall` | `number` | ADD | Score global ponderado 0–10. |
| *(removido)* | — | DROP `fun_rating` | Substituído pela estrutura score_*. |
| *(removido)* | — | DROP `daily_driver_rating` | Substituído pela estrutura score_*. |
| *(removido)* | — | DROP `reliability_rating` | Substituído pela estrutura score_*. |

### SEO

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `meta_title` | `string` | ADD | Title tag customizado para SEO on-page. |
| `meta_description` | `string` | ADD | Meta description customizada para SEO on-page. |

### Relações (não são colunas — joins)

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `brands` | `CarBrand` | N/A | Join com tabela `brands`. |
| `categories` | `CarCategory` | N/A | Join com tabela `categories`. |
| `car_highlights` | `CarHighlight[]` | N/A | Join com tabela `car_highlights`. |
| `car_images` | `CarImage[]` | N/A | Join com tabela `car_images`. |

---

## Interface `CarImage`

| Campo no type | Tipo TS | Acção SQL | Justificação |
|---|---|---|---|
| `url` | `string` | KEEP | URL da imagem (Supabase Storage ou CDN). |
| `alt_text` | `string` | KEEP | Descrição alt para acessibilidade. |
| `is_hero` | `boolean` | RENAME `is_primary → is_hero` | Alinhamento semântico (hero image é terminologia editorial). |
| `display_order` | `number` | KEEP | Ordem de apresentação na galeria. |

---

## Colunas dropadas (não presentes nos types)

| Coluna | Acção | Justificação |
|---|---|---|
| `power_to_weight` | DROP | Calculável a partir de `power_hp / weight_kg`. |
| `weight_distribution_front` | DROP | Não usado pelos types. |
| `redline_rpm` | DROP | Substituído por `power_rpm`/`torque_rpm` como TEXT. |
| `body_style` | DROP | Não usado pelos types (inferível via `category`). |
| `seats` | DROP | Não usado pelos types. |

---

## Notas de compatibilidade

- O campo `generation` na listagem é um **alias de select** (`generation:generation_code`), não uma coluna física. Manter `generation_code` como única coluna em `cars`.
- Os campos `brand`, `category_slug`, `category_name` na listagem são também aliases vindos de joins com `brands` e `categories`.
- A migration não toca em tabelas que não precisam de ajuste: `brands`, `categories`, `car_highlights`.
- `published` / `is_published` **não** foi renomeado — verificação mostrou que o código frontend ainda não consome este campo. Fica para quando a Phase B expuser o estado de publicação.
