import { createClient } from "@supabase/supabase-js";

// Estas variáveis são injetadas pelo Vite em build time.
// O prefixo VITE_ é obrigatório — sem ele, o Vite não as expõe ao client.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validação em runtime: se as variáveis não existirem, falha cedo com mensagem clara.
// Isto evita erros crípticos mais tarde (e.g., "fetch failed" sem contexto).
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variáveis de ambiente em falta: VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY. " +
    "Verifica o ficheiro .env.local na raiz do projeto."
  );
}

// Singleton: este módulo é avaliado uma única vez pelo bundler.
// Cada import de `supabase` recebe a mesma instância.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
