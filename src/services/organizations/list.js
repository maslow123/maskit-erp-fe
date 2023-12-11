'use client';

import { headers } from '../headers';

const getOrganizationList = async (query) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations?${new URLSearchParams(query)}`, {
            method: 'GET',
            ...headers
        },)

        return await data.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getOrganizationList
