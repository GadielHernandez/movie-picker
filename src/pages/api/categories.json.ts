import type { APIRoute } from 'astro'
import categories from '../../data/categories.json'

export const GET: APIRoute = () => {
    return new Response(JSON.stringify(categories))
}
