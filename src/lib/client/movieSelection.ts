import categories from '../../data/categories.json'
import movies from '../../data/movies.json'
import persons from '../../data/persons.json'
import type { INominated } from '../../models/categories/category.interfaces'
import type { IMovie } from '../../models/movie/movie.interfaces'
import type { IProfileSelectionDocument } from '../../models/profile/profile.interfaces'

export const setUserSelection = async (
    nominatedId: number,
    categoryId: string,
    movieId?: number,
    personId?: number,
    userId?: string
) => {
    const selection = JSON.stringify({
        userId,
        categoryId,
        nominatedId,
        movieId,
        personId,
    })

    if (!userId) {
        localStorage.setItem(`selection-${categoryId}`, selection)
        return
    }

    const request = await fetch('/api/selections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: selection,
    })

    const response = await request.json()
    return response
}

export const getGuestSelection = (categoryId: string) => {
    const selection = localStorage.getItem(`selection-${categoryId}`)
    if (!selection) return null

    const { nominatedId } = JSON.parse(selection)

    const category = categories.data.find(
        (category) => category.id === categoryId
    )

    const nominate = category?.nominates.find(
        (nom) => nom.id === parseInt(nominatedId)
    ) as INominated

    nominate.movie = movies.data.find(
        (movie) => movie.id === nominate.movieid
    ) as IMovie
    if (nominate.personId)
        nominate.person = persons.data.find(
            (person) => person.id === nominate.personId
        )
    return nominate
}

export const getGuestSelections = () => {
    const selections = categories.data.map((category) => {
        const selection = localStorage.getItem(`selection-${category.id}`)
        if (!selection) return null

        const dbParsed: IProfileSelectionDocument = JSON.parse(selection)
        return dbParsed
    })

    return selections.filter((selection) => selection)
}

export const cleanGuestSelections = () => {
    categories.data.forEach((category) => {
        localStorage.removeItem(`selection-${category.id}`)
    })
}
