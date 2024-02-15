import type { AstroCookies } from 'astro'
import { getProfile } from '../models/profile/profile.services'
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

    const profile = await getProfile(data.user.id)

    return profile
}

export default auth
