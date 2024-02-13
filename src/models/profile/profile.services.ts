import type {
    IProfile,
    IProfileSelectionDocument,
    IProfileSelections,
    UpdateProfileData,
} from './profile.interfaces'
import supabase from '../../lib/supabase'
import { fillNominateData } from '../categories/category.services'

export async function updateCurrentProfile(
    id: string,
    data: UpdateProfileData
) {
    return supabase
        .from('users')
        .update({ ...data })
        .eq('id', id)
        .select()
}

export async function getProfile(id: string | null) {
    if (!id) return null

    const { data } = await supabase.from('users').select().eq('id', id)
    if (!data || data.length === 0) return null

    const user = data[0]
    const profile: IProfile = {
        id: user.id,
        name: user.name,
        image: user.image,
        description: user.description,
        instagram: user.instagram,
        twitter: user.twitter,
        tiktok: user.tiktok,
        letterbox: user.letterboxd,
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

    const { data, error } = await supabase
        .from('oscars-selections')
        .upsert(batch)
        .select()

    return { data, error }
}
