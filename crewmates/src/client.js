
// import ...

import { createClient } from "@supabase/supabase-js";
// define URL and KEY
const URL = 'https://rrnwttzcrchmxgfymzmk.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybnd0dHpjcmNobXhnZnltem1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMTMyNDUsImV4cCI6MjA3ODg4OTI0NX0.GMumdAjxLwXEdbgDVktUzGqsmrs99GFwkuLoniDkIZI';

// create supabase client
const supabase = createClient(URL, API_KEY)
// export supabase
export {supabase};