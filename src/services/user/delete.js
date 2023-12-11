'use client';

import { headers } from '../headers'

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/users/${id}`, {
            method: 'DELETE',
            ...headers
        })

        return await response.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default deleteUser
