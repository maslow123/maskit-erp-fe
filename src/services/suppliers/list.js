'use client';

import { headers } from '../headers'

const getSupplierList = async (query) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/suppliers?${new URLSearchParams(query)}`, {
            method: 'GET',
            ...headers()
        })

        return await data.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getSupplierList
