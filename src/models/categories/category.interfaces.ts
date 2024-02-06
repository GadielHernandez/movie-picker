import type { IMovie } from '../movie/movie.interfaces'
import type { IPerson } from '../person/person.interfaces'

export interface ICategory {
    id: string
    title: string
    relevant: true
    type: TypeCategory
    nominates: INominated[]
}

export type GetApiResponse = {
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
