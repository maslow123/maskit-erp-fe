'use client';

import { headers } from '../headers';

const getOrganization = async () => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations/current`, {
            method: 'GET',
            ...headers()
        },)

        return await data.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getOrganization
