import { $ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxxweepbqzmwygfxasoc.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eHdlZXBicXptd3lnZnhhc29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTYzOTksImV4cCI6MjAyOTI5MjM5OX0.smDKOLZVnsTUBX_RESpLN4N9Y96oS_fhSy0nBPzDBMM";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const createAdminUser = $(async () => {
  const {data, error} = await supabase.auth.signUp({
    email: "admin@test.com",
    password: "1q2w3E*",
    options: {
      data: {
        role: "super_admin"
      }
    }
  })
  if(error) {
    console.log("Unable to create admin user:\n", error);
    return null;
  }
  console.log(data);
  return data;
});
