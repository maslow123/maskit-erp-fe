'use client';

import { headers } from '../headers'

const batchInsertSupplier = async (payload) => {
    try {
        const resp = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/suppliers/batch`, {
            method: 'POST',
            body: payload,
            ...headers('multipart/form-data')
        })

        const data = await resp.json()
        return data

    } catch (e) {
        console.log(e)
        return e
    }
}

export default batchInsertSupplier
