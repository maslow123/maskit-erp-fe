'use client';

import { headers } from '../headers'

const list = async (page, limit, search) => {
    try {
        const data = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations?page=${page}&offset=${limit}&name=${search}`,
            {
                method: 'GET',
                ...headers
            },
        )

        const json = await data.json()
        console.log({ json })
        return json

        // return mock
    } catch (e) {
        console.log(e)
        return e
    }
}

export default list
