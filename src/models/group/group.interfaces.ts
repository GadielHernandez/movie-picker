export interface IGroup {
    id: string
    name: string
    description: string
    members: number
    createBy: string
    createdAt: Date
}

export interface IUserGroupDocument {
    id: number
    created_at: string
    groups: IGroupDocument
}

export interface IGroupDocument {
    id: number
    name: string
    members: number
    created_at: string
    created_by: string | any
    description: string
}
