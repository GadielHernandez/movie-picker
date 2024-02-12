import type {
    IProfile,
    IProfileSelectionDocument,
    IProfileSelections,
    UpdateProfileData,
} from './profile.interfaces'
import supabase, { supabaseAdmin } from '../../lib/supabase'
import auth from '../../lib/auth'
import { fillNominateData } from '../categories/category.services'

export async function updateCurrentProfile(data: UpdateProfileData) {
    return await auth().updateUser({
        data: { ...data },
    })
}

export async function getProfile(id: string | null) {
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

export async function getProfileSelections(id: string) {
    const query = await supabase
        .from('oscars-selections')
        .select()
        .eq('user_id', id)

    if (query.error) return {}

    const data: IProfileSelectionDocument[] = query.data || []
    const selections: IProfileSelections = {}
    data.forEach((selection) => {
        const nominate = fillNominateData({
            id: parseInt(selection.nominate_id, 10),
            movieid: parseInt(selection.movie_id, 10),
            personId: parseInt(selection.person_id, 10),
        })

        selections[selection.category_id] = nominate
    })

    return selections
}

export async function setUserSelections(
    selections: {
        userId: string
        categoryId: string
        nominatedId: number
        movieId?: number
        personId?: number
    }[]
) {
    const batch = selections.map((selection) => {
        return {
            user_id: selection.userId,
            category_id: selection.categoryId,
            nominate_id: selection.nominatedId,
            movie_id: selection.movieId,
            person_id: selection.personId,
        }
    })
    console.log('batch', batch, selections)
    const { data, error } = await supabase
        .from('oscars-selections')
        .upsert(batch)
        .select()

    return { data, error }
}
