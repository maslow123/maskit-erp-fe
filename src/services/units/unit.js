'use client';

import { headers } from '../headers';

const getUnit = async (id) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/unit?${id}`, {
            method: 'GET',
            ...headers()
        })

        return await data.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getUnit
