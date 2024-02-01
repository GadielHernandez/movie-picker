import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request }) => {
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

    const result = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username: name },
        },
    })

    if (result.error) {
        return new Response(JSON.stringify({ error: result.error }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify({ user: result.data.user }), {
        status: 200,
    })
}
