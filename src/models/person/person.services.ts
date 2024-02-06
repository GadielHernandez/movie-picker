import type { APIContext } from 'astro'
import { GET } from '../../pages/api/persons.json'
import type { GetApiResponse } from './person.interfaces'

export async function fetchPersons(
    Astro: APIContext<Record<string, any>, Record<string, string | undefined>>
) {
    const requestPersons = await GET(Astro)
    const persons: GetApiResponse = await requestPersons.json()

    return persons
}
