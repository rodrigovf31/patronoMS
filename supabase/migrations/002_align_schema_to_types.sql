-- ═══════════════════════════════════════════════════════════════════════════
-- Migration 002 — Alinhamento do schema Supabase aos TypeScript types
-- ═══════════════════════════════════════════════════════════════════════════
-- Propósito:
--   Alinhar a estrutura das tabelas `cars` e `car_images` com as interfaces
--   declaradas em `src/types/car.ts` (Car, CarDetail, CarImage).
--
-- Decisão (Opção A, tomada pelo utilizador):
--   Os TypeScript types são a fonte de verdade. Esta migration renomeia
--   colunas, elimina colunas redundantes e adiciona colunas novas para que
--   um `select *` devolva exactamente os campos que o frontend espera.
--
-- Data: 2026-04-18
-- Pré-requisito: Migration 001 (criação original das tabelas) já aplicada.
-- Execução: MANUAL no Supabase Studio — este ficheiro NÃO é executado
--           automaticamente pelo frontend.
-- Rollback: ver bloco comentado no fim do ficheiro.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ===== BLOCO: Renomeações em `cars` =================================
ALTER TABLE cars RENAME COLUMN model_name TO model;
ALTER TABLE cars RENAME COLUMN acceleration_0_100 TO accel_0_100;
ALTER TABLE cars RENAME COLUMN acceleration_0_200 TO accel_0_200;
ALTER TABLE cars RENAME COLUMN top_speed_kmh TO top_speed_kph;
ALTER TABLE cars RENAME COLUMN drivetrain TO drive_type;
ALTER TABLE cars RENAME COLUMN transmission_gears TO gears;
ALTER TABLE cars RENAME COLUMN fuel_consumption_combined TO consumption_combined;
ALTER TABLE cars RENAME COLUMN price_eur_new TO price_new_eur;
ALTER TABLE cars RENAME COLUMN price_eur_used_low TO price_used_min_eur;
ALTER TABLE cars RENAME COLUMN price_eur_used_high TO price_used_max_eur;

-- ===== BLOCO: Renomeação em `car_images` ============================
ALTER TABLE car_images RENAME COLUMN is_primary TO is_hero;

-- ===== BLOCO: Renomeação de capacidade da mala em `cars` ============
-- Assumindo que a coluna original se chamava `trunk_capacity_liters`.
-- Se já estiver com outro nome, ajustar manualmente antes de aplicar.
ALTER TABLE cars RENAME COLUMN trunk_capacity_liters TO trunk_liters;

-- ===== BLOCO: Drops de colunas redundantes/obsoletas em `cars` ======
-- Ratings editoriais antigos (substituídos por score_* abaixo).
ALTER TABLE cars DROP COLUMN IF EXISTS fun_rating;
ALTER TABLE cars DROP COLUMN IF EXISTS daily_driver_rating;
ALTER TABLE cars DROP COLUMN IF EXISTS reliability_rating;

-- Métricas derivadas (calculáveis a partir de power_hp/weight_kg).
ALTER TABLE cars DROP COLUMN IF EXISTS power_to_weight;

-- Distribuição de peso apenas frente (não usada no type).
ALTER TABLE cars DROP COLUMN IF EXISTS weight_distribution_front;

-- redline_rpm como INTEGER; substituído por power_rpm/torque_rpm TEXT
-- (permite formatos como "6500-8200").
ALTER TABLE cars DROP COLUMN IF EXISTS redline_rpm;

-- Campos não presentes no CarDetail type.
ALTER TABLE cars DROP COLUMN IF EXISTS body_style;
ALTER TABLE cars DROP COLUMN IF EXISTS seats;

-- ===== BLOCO: Novas colunas editoriais em `cars` ====================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS variant TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS description TEXT;

-- ===== BLOCO: Novas colunas de motor em `cars` ======================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS engine_type TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS cylinders INTEGER;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS valves_per_cyl INTEGER;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS power_rpm TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS torque_rpm TEXT;

-- ===== BLOCO: Novas colunas de performance em `cars` ================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS accel_quarter_mile NUMERIC;

-- ===== BLOCO: Novas colunas de transmissão em `cars` ================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS transmission_name TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS differential TEXT;

-- ===== BLOCO: Novas colunas de capacidades em `cars` ================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS fuel_tank_liters NUMERIC;
-- `trunk_liters` já existe (renomeada acima). Se a 001 não tinha a coluna,
-- descomentar a linha seguinte:
-- ALTER TABLE cars ADD COLUMN IF NOT EXISTS trunk_liters NUMERIC;

-- ===== BLOCO: Scores editoriais em `cars` ===========================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS score_performance NUMERIC;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS score_handling NUMERIC;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS score_comfort NUMERIC;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS score_value NUMERIC;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS score_overall NUMERIC;

-- ===== BLOCO: SEO em `cars` =========================================
ALTER TABLE cars ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS meta_description TEXT;

COMMIT;

-- ═══════════════════════════════════════════════════════════════════════════
-- ROLLBACK (executar dentro de uma transacção se for necessário reverter):
-- ═══════════════════════════════════════════════════════════════════════════
-- BEGIN;
--
-- -- Drop das novas colunas SEO
-- ALTER TABLE cars DROP COLUMN IF EXISTS meta_description;
-- ALTER TABLE cars DROP COLUMN IF EXISTS meta_title;
--
-- -- Drop dos scores editoriais
-- ALTER TABLE cars DROP COLUMN IF EXISTS score_overall;
-- ALTER TABLE cars DROP COLUMN IF EXISTS score_value;
-- ALTER TABLE cars DROP COLUMN IF EXISTS score_comfort;
-- ALTER TABLE cars DROP COLUMN IF EXISTS score_handling;
-- ALTER TABLE cars DROP COLUMN IF EXISTS score_performance;
--
-- -- Drop das capacidades
-- ALTER TABLE cars DROP COLUMN IF EXISTS fuel_tank_liters;
--
-- -- Drop da transmissão
-- ALTER TABLE cars DROP COLUMN IF EXISTS differential;
-- ALTER TABLE cars DROP COLUMN IF EXISTS transmission_name;
--
-- -- Drop da performance adicional
-- ALTER TABLE cars DROP COLUMN IF EXISTS accel_quarter_mile;
--
-- -- Drop do motor adicional
-- ALTER TABLE cars DROP COLUMN IF EXISTS torque_rpm;
-- ALTER TABLE cars DROP COLUMN IF EXISTS power_rpm;
-- ALTER TABLE cars DROP COLUMN IF EXISTS valves_per_cyl;
-- ALTER TABLE cars DROP COLUMN IF EXISTS cylinders;
-- ALTER TABLE cars DROP COLUMN IF EXISTS engine_type;
--
-- -- Drop editorial
-- ALTER TABLE cars DROP COLUMN IF EXISTS description;
-- ALTER TABLE cars DROP COLUMN IF EXISTS tagline;
-- ALTER TABLE cars DROP COLUMN IF EXISTS variant;
--
-- -- Re-add colunas dropadas
-- ALTER TABLE cars ADD COLUMN seats INTEGER;
-- ALTER TABLE cars ADD COLUMN body_style TEXT;
-- ALTER TABLE cars ADD COLUMN redline_rpm INTEGER;
-- ALTER TABLE cars ADD COLUMN weight_distribution_front NUMERIC;
-- ALTER TABLE cars ADD COLUMN power_to_weight NUMERIC;
-- ALTER TABLE cars ADD COLUMN reliability_rating NUMERIC;
-- ALTER TABLE cars ADD COLUMN daily_driver_rating NUMERIC;
-- ALTER TABLE cars ADD COLUMN fun_rating NUMERIC;
--
-- -- Reverter renomeação da mala
-- ALTER TABLE cars RENAME COLUMN trunk_liters TO trunk_capacity_liters;
--
-- -- Reverter renomeação em car_images
-- ALTER TABLE car_images RENAME COLUMN is_hero TO is_primary;
--
-- -- Reverter renomeações em cars
-- ALTER TABLE cars RENAME COLUMN price_used_max_eur TO price_eur_used_high;
-- ALTER TABLE cars RENAME COLUMN price_used_min_eur TO price_eur_used_low;
-- ALTER TABLE cars RENAME COLUMN price_new_eur TO price_eur_new;
-- ALTER TABLE cars RENAME COLUMN consumption_combined TO fuel_consumption_combined;
-- ALTER TABLE cars RENAME COLUMN gears TO transmission_gears;
-- ALTER TABLE cars RENAME COLUMN drive_type TO drivetrain;
-- ALTER TABLE cars RENAME COLUMN top_speed_kph TO top_speed_kmh;
-- ALTER TABLE cars RENAME COLUMN accel_0_200 TO acceleration_0_200;
-- ALTER TABLE cars RENAME COLUMN accel_0_100 TO acceleration_0_100;
-- ALTER TABLE cars RENAME COLUMN model TO model_name;
--
-- COMMIT;
