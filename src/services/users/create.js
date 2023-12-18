'use client';

import { headers } from '../headers'

const createUser = async (data) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/users`, {
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

export default createUser
