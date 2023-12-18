'use client';

import { headers } from '../headers';

const updateUnit = async (data, id) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/unit/${id}`, {
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

export default updateUnit
