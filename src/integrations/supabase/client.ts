// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nfxiyupspeidryqmptkh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5meGl5dXBzcGVpZHJ5cW1wdGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzIxMzQsImV4cCI6MjA1OTQ0ODEzNH0.Q3iwrOzuK9HI31AuSEYgh-Me8X2tYGnU8j2NfqoCX50";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);