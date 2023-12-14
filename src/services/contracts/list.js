'use client';

import { headers } from '../headers'

const getContractList = async (query) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/contracts?${new URLSearchParams(query)}`, {
            method: 'GET',
            ...headers()
        })

        return await data.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getContractList
