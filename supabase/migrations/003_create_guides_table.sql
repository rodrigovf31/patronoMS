-- ═══════════════════════════════════════════════════════════════════════════
-- Migration 003 — Criação da tabela `guides`
-- ═══════════════════════════════════════════════════════════════════════════
-- Propósito:
--   Suportar a secção editorial "Guias & Insights" do PerformanceHub.
--   Conteúdo long-form em markdown, indexável por slug para URLs canónicas
--   do tipo /guides/:slug.
--
-- Data: 2026-04-18
-- Execução: MANUAL no Supabase Studio.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ===== BLOCO: Tabela guides =========================================
CREATE TABLE IF NOT EXISTS guides (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT        NOT NULL,
  slug              TEXT        NOT NULL UNIQUE,
  excerpt           TEXT        NOT NULL,
  content           TEXT        NOT NULL,
  category          TEXT        NOT NULL,
  cover_image_url   TEXT,
  is_published      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para queries frequentes.
CREATE INDEX IF NOT EXISTS idx_guides_slug         ON guides (slug);
CREATE INDEX IF NOT EXISTS idx_guides_is_published ON guides (is_published);
CREATE INDEX IF NOT EXISTS idx_guides_category     ON guides (category);

-- ===== BLOCO: Trigger para manter updated_at ========================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_guides_set_updated_at ON guides;
CREATE TRIGGER trg_guides_set_updated_at
  BEFORE UPDATE ON guides
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- ===== BLOCO: Row Level Security ===================================
-- Leitura pública apenas para guias publicados; escrita restringida a
-- service_role (dashboard/CMS). Ajustar se for introduzido um role editor.
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "guides_public_read_published" ON guides;
CREATE POLICY "guides_public_read_published"
  ON guides FOR SELECT
  USING (is_published = TRUE);

COMMIT;

-- ═══════════════════════════════════════════════════════════════════════════
-- ROLLBACK:
-- ═══════════════════════════════════════════════════════════════════════════
-- BEGIN;
--   DROP TABLE IF EXISTS guides CASCADE;
--   -- Não remove set_updated_at(): pode ser partilhada com outras tabelas.
-- COMMIT;
