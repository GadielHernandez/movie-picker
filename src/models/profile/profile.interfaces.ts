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
