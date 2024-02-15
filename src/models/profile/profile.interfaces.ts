import type { INominated } from '../categories/category.interfaces'

export interface IProfile {
    id: string
    name: string
    image?: string
    description: string
    verified: boolean
    instagram?: string
    tiktok?: string
    twitter?: string
    letterboxd?: string
}

export type UpdateProfileData = Omit<IProfile, 'id'>

export interface IProfileSelectionDocument {
    user_id: string
    category_id: string
    movie_id: string
    nominate_id: string
    person_id: string
    created_at: string
}

export interface IProfileSelections {
    [key: string]: INominated
}
