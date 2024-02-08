import type { INominated } from '../categories/category.interfaces'

export interface IProfile {
    id: string
    name: string
    image: string
    description: string
    instagram?: string
    tiktok?: string
    twitter?: string
    letterbox?: string
}

export type UpdateProfileData = Omit<IProfile, 'id' | 'image'>

export interface IDBProfileSelection {
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
