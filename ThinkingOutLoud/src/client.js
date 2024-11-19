import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kaifmdksxtsjnxuemgsg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaWZtZGtzeHRzam54dWVtZ3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MjY5NjgsImV4cCI6MjA0NzMwMjk2OH0.CwANACSwzZVy_ODBN7g-wG4kaANwOWZQGgf4CJU8T0k";
export const supabase = createClient(supabaseUrl, supabaseKey);
