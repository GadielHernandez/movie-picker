import type { APIRoute } from 'astro'
import movies from '../../data/movies.json'

export const GET: APIRoute = () => {
    return new Response(JSON.stringify(movies))
}
