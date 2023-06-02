import { createClient } from "@supabase/auth-helpers-sveltekit";
import { PUBLIC_DB_ANON_KEY, PUBLIC_DB_URL } from "$env/static/public";

export const supabaseClient = createClient(PUBLIC_DB_URL, PUBLIC_DB_ANON_KEY);