import type { AstroCookies } from 'astro'
import type { IProfile } from '../models/profile/profile.interfaces'
import supabase, { supabaseAdmin } from './supabase'

export const getProfile = async (id: string | null) => {
    if (!id) return null
    console.log('id', id)
    const { data, error } = await supabaseAdmin().getUserById(id)
    console.log('data', data, error)
    if (!data.user) return null

    const metadata = data.user?.user_metadata
    const profile: IProfile = {
        id: data.user.id,
        name: metadata?.username,
        image: '',
        description: metadata?.description,
    }

    return profile
}

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
        name: metadata?.username,
        image: '',
        description: metadata?.description,
    }

    return profile
}
