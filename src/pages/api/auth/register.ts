import type { APIRoute } from 'astro'
import supabase from '../../../lib/supabase'
import { setUserSelections } from '../../../models/profile/profile.services'

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()
    const { name, selections } = body
    const credentialsEncode = body.credentials
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

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error || !data?.user) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
        })
    }

    await supabase.from('users').insert([
        {
            id: data?.user?.id,
            name,
            description: 'Mis predicciones para los premios Oscar 2024',
        },
    ])

    let session = data?.session
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

    if (!selections || selections.length === 0)
        return new Response(JSON.stringify({ user: data.user }), {
            status: 200,
        })

    const selectionsWithUserId = selections.map((selection: any) => {
        return {
            ...selection,
            userId: data?.user?.id,
        }
    })
    await setUserSelections(selectionsWithUserId)

    return new Response(JSON.stringify({ user: data.user }), {
        status: 200,
    })
}
