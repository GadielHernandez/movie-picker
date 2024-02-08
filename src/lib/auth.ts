import type { AstroCookies } from 'astro'
import type { IProfile } from '../models/profile/profile.interfaces'
import supabase from './supabase'

const auth = () => supabase.auth

export const setUserSession = async (cookies: AstroCookies) => {
    const accessToken = cookies.get('sb-access-token')
    const refreshToken = cookies.get('sb-refresh-token')

    if (!accessToken || !refreshToken) return null

    const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
    })

    if (error || !data.user) {
        cookies.delete('sb-access-token', {
            path: '/',
        })
        cookies.delete('sb-refresh-token', {
            path: '/',
        })
        return null
    }

    const metadata = data.user?.user_metadata
    const profile: IProfile = {
        id: data.user.id,
        name: metadata?.name,
        image: '',
        description: metadata?.description,
        instagram: metadata?.instagram,
        twitter: metadata?.twitter,
        tiktok: metadata?.tiktok,
        letterbox: metadata?.letterbox,
    }

    return profile
}

export default auth
