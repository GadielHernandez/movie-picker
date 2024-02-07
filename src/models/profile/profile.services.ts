import type { IProfile, UpdateProfileData } from './profile.interfaces'
import { supabaseAdmin } from '../../lib/supabase'
import auth from '../../lib/auth'

export const updateCurrentProfile = async (data: UpdateProfileData) => {
    return await auth().updateUser({
        data: { ...data },
    })
}

export const getProfile = async (id: string | null) => {
    if (!id) return null

    const { data } = await supabaseAdmin().getUserById(id)
    if (!data.user) return null

    const metadata = data.user?.user_metadata
    const profile: IProfile = {
        id: data.user.id,
        name: metadata?.username,
        image: '',
        description: metadata?.description,
        instagram: metadata?.instagram,
        twitter: metadata?.twitter,
        tiktok: metadata?.tiktok,
        letterbox: metadata?.letterboxd,
    }

    return profile
}
