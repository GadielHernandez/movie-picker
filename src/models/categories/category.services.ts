import type { APIContext } from 'astro'
import { GET } from '../../pages/api/categories.json'
import type { GetApiResponse } from './category.interfaces'

export async function fetchCategories(Astro: APIContext) {
    let requestCategories = await GET(Astro)
    const categories: GetApiResponse = await requestCategories.json()

    return categories
}
