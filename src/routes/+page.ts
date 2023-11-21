import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://rbvilxcckrnumkxmptfz.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidmlseGNja3JudW1reG1wdGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMzkzMTEsImV4cCI6MTk4MjgxNTMxMX0.t_YMcxiFFiXLfzlNl4pX6rDc9VS8gli05C5qahzSPsA'
);

console.log(supabase);
