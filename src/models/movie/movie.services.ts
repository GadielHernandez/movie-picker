import type { APIContext } from 'astro'
import { GET } from '../../pages/api/movies.json'
import type { GetApiResponse } from './movie.interfaces'

export async function fetchMovies(
    Astro: APIContext<Record<string, any>, Record<string, string | undefined>>
) {
    const requestMovies = await GET(Astro)
    const movies: GetApiResponse = await requestMovies.json()

    return movies
}
