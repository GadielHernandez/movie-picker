import type { APIRoute } from 'astro'
import supabase from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, cookies }) => {
    const { url } = request
    const searchParams = new URL(url).searchParams
    const name = searchParams.get('name')
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

    const register = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: name,
                description: 'Mis predicciones para los premios Oscar 2024',
            },
        },
    })

    if (register.error) {
        return new Response(JSON.stringify({ error: register.error }), {
            status: 500,
        })
    }

    let session = register.data?.session
    if (!session) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return new Response(JSON.stringify({ error: error }), {
                status: 500,
            })
        }
        session = data.session
    }

    const { access_token, refresh_token } = session
    cookies.set('sb-access-token', access_token, {
        path: '/',
    })
    cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
    })

    return new Response(JSON.stringify({ user: register.data.user }), {
        status: 200,
    })
}
