import type { APIRoute } from 'astro'
import { addUserToGroup, createGroup } from '../../models/group/group.services'

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const { data, error } = await createGroup(
        body.name,
        body.description,
        body.userId
    )

    if (error || !data || data.length === 0)
        return new Response(JSON.stringify({ error: error?.message }), {
            status: 500,
        })

    await addUserToGroup(body.userId, data[0].id)

    return new Response(JSON.stringify({ user: data }), {
        status: 200,
    })
}

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
