import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://irpvarrbmbmuaczjtfbe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycHZhcnJibWJtdWFjemp0ZmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNTk5NjksImV4cCI6MjAyMjczNTk2OX0.o0rx4yJxfphij8afkb9q2xispALOLQB6lc9g7opzS2o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
