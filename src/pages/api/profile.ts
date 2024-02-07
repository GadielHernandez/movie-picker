import type { APIRoute } from 'astro'
import { updateCurrentProfile } from '../../models/profile/profile.services'
import type { UpdateProfileData } from '../../models/profile/profile.interfaces'

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const { data, error } = await updateCurrentProfile(
        body as UpdateProfileData
    )

    if (error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })

    return new Response(JSON.stringify({ user: data.user }), {
        status: 200,
    })
}
