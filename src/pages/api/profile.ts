import type { APIRoute } from 'astro'
import { updateCurrentProfile } from '../../models/profile/profile.services'
import type { UpdateProfileData } from '../../models/profile/profile.interfaces'
import auth from '../../lib/auth'

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const {
        data: { user },
    } = await auth().getUser()

    if (!user)
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
        })

    const { data, error } = await updateCurrentProfile(
        user.id,
        body as UpdateProfileData
    )

    if (error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })

    return new Response(JSON.stringify({ update: true }), {
        status: 200,
    })
}
