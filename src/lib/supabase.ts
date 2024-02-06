import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
)

export const supabaseAdmin = () => {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = import.meta.env
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })

    const adminAuthClient = supabase.auth.admin

    return adminAuthClient
}

export default supabase
