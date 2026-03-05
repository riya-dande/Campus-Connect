import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lrttfotpzeinmvyjyhkj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydHRmb3RwemVpbm12eWp5aGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMDgwNjQsImV4cCI6MjA4NzY4NDA2NH0.vVerJ7hKxuT6NbkOiw7X120W_z7lXcNXOyHcD50-ugI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
