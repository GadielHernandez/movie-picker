import type { IMovie } from '../movie/movie.intefaces'
import type { IPerson } from '../persons/person.interfaces'

export interface ICategory {
    id: string
    title: string
    relevant: true
    type: TypeCategory
    nominates: INominated[]
}

export type GetApiCategories = {
    data: ICategory[]
}

export interface INominated {
    id: number
    movieid: number
    personId?: number
    name?: string
    movie?: IMovie
    person?: IPerson
}

export enum TypeCategory {
    MOVIE = 'MOVIES',
    ACTOR = 'ACTOR',
    ACTRESS = 'ACTRESS',
}
