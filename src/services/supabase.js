import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vjjdlfwqhpdhryeykljo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqamRsZndxaHBkaHJ5ZXlrbGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzgxODcsImV4cCI6MjAzMjY1NDE4N30.MIBt4BAwtiDfuqxroLboWJ_t0H5EuojQzG49CiebSQA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
