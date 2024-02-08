import type { APIRoute } from 'astro'
import { setUserSelections } from '../../models/profile/profile.services'

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const { userId, categoryId, nominatedId, movieId, personId } = body
    console.log(userId, categoryId, nominatedId, movieId, personId)
    const { data, error } = await setUserSelections([
        {
            userId,
            categoryId,
            nominatedId,
            movieId,
            personId,
        },
    ])

    if (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify({ data }), {
        status: 200,
    })
}
