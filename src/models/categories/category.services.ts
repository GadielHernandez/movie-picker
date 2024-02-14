import type { APIContext } from 'astro'
import { GET } from '../../pages/api/categories.json'
import type { GetApiResponse, INominated } from './category.interfaces'
import movies from '../../data/movies.json'
import persons from '../../data/persons.json'
import categories from '../../data/categories.json'
import type { IMovie } from '../movie/movie.interfaces'

export async function fetchCategories(Astro: APIContext) {
    let requestCategories = await GET(Astro)
    const categories: GetApiResponse = await requestCategories.json()

    return categories
}

export function fillNominateData(nominate: INominated, categoryId: string) {
    const category = categories.data.find(
        (category) => category.id === categoryId
    )
    if (!category) return nominate

    const catNominate = category.nominates.find((nom) => nom.id === nominate.id)
    if (!catNominate) return nominate

    nominate.name = catNominate.name
    nominate.movie = movies.data.find(
        (movie) => movie.id === nominate.movieid
    ) as IMovie

    if (nominate.personId)
        nominate.person = persons.data.find(
            (person) => person.id === nominate.personId
        )

    return nominate
}
