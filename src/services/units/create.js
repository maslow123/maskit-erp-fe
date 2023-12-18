'use client';

import { headers } from '../headers'

const createUnit = async (data) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/unit`, {
            method: 'POST',
            body: JSON.stringify(data),
            ...headers()
        })

        return await response.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default createUnit
