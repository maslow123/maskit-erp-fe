'use client';

import { headers } from '../headers'

const createContract = async (data) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/contracts`, {
            method: 'POST',
            body: data,
            ...headers('form-data')
        })

        return await response.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default createContract
