import supabase from '../../lib/supabase'
import type { IUserGroupDocument } from './group.interfaces'
import type { IProfile } from '../profile/profile.interfaces'

export async function createGroup(
    name: string,
    description: string,
    userId: string
) {
    return supabase
        .from('groups')
        .insert({
            name,
            description,
            created_by: userId,
        })
        .select()
}

export async function getGroups(userId: string) {
    const query: any = await supabase
        .from('groups-users')
        .select(
            'id, groups(id, name, description, members, created_by(name), created_at)'
        )
        .eq('user_id', userId)

    if (query.error) return []
    const groups = query.data.map((data: IUserGroupDocument) => {
        return {
            id: data.groups.id,
            name: data.groups.name,
            description: data.groups.description,
            members: data.groups.members,
            createBy: data.groups.created_by.name,
            createdAt: data.groups.created_at,
        }
    })

    return groups
}

export async function getGroup(id: number) {
    const { data } = await supabase.from('groups').select().eq('id', id)
    if (!data || data.length === 0) return null
    return data[0]
}

export async function getGroupMembers(groupId: number) {
    const { data }: { data: any } = await supabase
        .from('groups-users')
        .select('users(*)')
        .eq('group_id', groupId)

    if (!data) return []

    return data.map(({ users }: { users: IProfile }) => {
        return {
            id: users.id,
            name: users.name,
            image: users.image,
            description: users.description,
            verified: users.verified,
        } as IProfile
    })
}

export async function addUserToGroup(userId: string, groupId: number) {
    const { data, error } = await supabase
        .from('groups-users')
        .insert({
            user_id: userId,
            group_id: groupId,
        })
        .select()

    if (error) return { error }

    const increment = await supabase.rpc('IncrementGroupMembers', {
        group_id: groupId,
    })

    if (increment.error) return { error: increment.error }

    return { data }
}
