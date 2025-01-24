import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_PROJECT_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_API_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
