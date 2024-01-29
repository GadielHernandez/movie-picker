import type { APIRoute } from 'astro'
import movies from '../../data/persons.json'

export const getPersons: APIRoute = () => {
    return new Response(JSON.stringify(movies))
}
