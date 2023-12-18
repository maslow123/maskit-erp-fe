'use client';

import { headers } from '../headers';

const updateCurrentOrganization = async (data) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations/current`, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...headers()
        })

        return await response.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default updateCurrentOrganization
