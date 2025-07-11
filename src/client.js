import {createClient} from '@supabase/supabase-js';

const URL = 'https://zrzopdkxzbqfciaueyly.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyem9wZGt4emJxZmNpYXVleWx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjExMjUzNSwiZXhwIjoyMDY3Njg4NTM1fQ.gVvS7UrmblbAhVgOZP64q8_mlPKng_lkQ1LQyiGH6Vk'
export const supabase = createClient(URL, API_KEY)