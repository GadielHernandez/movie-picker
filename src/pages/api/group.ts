import type { APIRoute } from 'astro'
import { addUserToGroup } from '../../models/group/group.services'

export const PUT: APIRoute = async ({ request }) => {
    const body = await request.json()
    const { data, error } = await addUserToGroup(body.userId, body.groupId)

    if (error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })

    return new Response(JSON.stringify({ user: data }), {
        status: 200,
    })
}
