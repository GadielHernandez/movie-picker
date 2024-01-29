import type { APIRoute } from 'astro'
import movies from '../../data/movies.json'

export const getMovies: APIRoute = () => {
    return new Response(JSON.stringify(movies))
}

export const getMovie = (req: Request) => {
    const { url } = req
    const searchParams = new URL(url).searchParams
    const movieId = Number(searchParams.get('movie'))
    const movie = movies.data.find((movie) => movie.id === movieId)

    return new Response(JSON.stringify(movie))
}
