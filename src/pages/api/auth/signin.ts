import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, cookies }) => {
    const { url } = request
    const searchParams = new URL(url).searchParams
    const credentialsEncode = searchParams.get('credentials')
    const credentials = credentialsEncode && atob(credentialsEncode)

    if (!credentials) {
        return new Response(
            JSON.stringify({ error: 'Credentials not found' }),
            { status: 400 }
        )
    }

    const [email, password] = credentials.split(':')

    if (!email || !password) {
        return new Response(
            JSON.stringify({ error: 'Email and password are required' }),
            { status: 400 }
        )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
        })
    }

    const { access_token, refresh_token } = data.session
    cookies.set('sb-access-token', access_token, {
        path: '/',
    })
    cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
    })

    return new Response(JSON.stringify({ user: data.user }), { status: 200 })
}
