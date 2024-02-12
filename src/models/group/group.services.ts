import supabase from '../../lib/supabase'
import type { IUserGroupDocument } from './group.interfaces'
import { supabaseAdmin } from '../../lib/supabase'
import type { IProfile } from '../profile/profile.interfaces'

export async function getGroups(userId: string) {
    const query: any = await supabase
        .from('groups-users')
        .select('id, groups(*)')
        .eq('user_id', userId)

    if (query.error) return []

    const data = query.data.map((group: IUserGroupDocument) => {
        return {
            id: group.groups.id,
            name: group.groups.name,
            description: group.groups.description,
            members: group.groups.members,
            createBy: group.groups.created_by,
            createdAt: group.groups.created_at,
        }
    })
    return data
}

export async function getGroup(id: number) {
    const { data } = await supabase.from('groups').select()
    if (!data || data.length === 0) return null
    return data[0]
}

export async function getGroupMembers(groupId: number) {
    const USERS_BY_PAGE = 1000
    const { data } = await supabase
        .from('groups-users')
        .select('user_id')
        .eq('group_id', groupId)

    if (!data) return []

    const usersData = []
    while (usersData.length < data.length) {
        const {
            data: { users },
        } = await supabaseAdmin().listUsers({
            page: 1,
            perPage: USERS_BY_PAGE,
        })

        const usersFinded = users.filter((user) =>
            data.some((d) => d.user_id === user.id)
        )
        usersData.push(...usersFinded)

        if (users.length < USERS_BY_PAGE) break
    }

    return usersData.map((user) => {
        return {
            id: user.id,
            name: user.user_metadata.name,
            email: user.email,
            image: '',
            description: user.user_metadata.description,
        } as IProfile
    })
}

export async function addUserToGroup(userId: string, groupId: number) {
    return supabase.from('groups-users').insert({
        user_id: userId,
        group_id: groupId,
    })
}
