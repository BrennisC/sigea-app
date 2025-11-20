
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_JS_SUPABASE_URL!
const supabaseKey = process.env.NEXT_JS_SUPABASE_ANON_KEY!


export const supabase = createClient(
    supabaseUrl,
    supabaseKey, {
    auth: {
        persistSession: false,
    },
})

export { supabase as supabaseAdmin }

