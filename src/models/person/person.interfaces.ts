export interface IPerson {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
}

export type GetApiResponse = {
    data: IPerson[]
}
