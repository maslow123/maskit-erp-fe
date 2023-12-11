'use client';

import { headers } from '../headers'

const list = async (page, limit, search) => {
    try {
        let query = `page=${page}&offset=${limit}`;
        if (search) {
            query = `${query}&name=${search}`;
        }
        const data = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations?${query}`,
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
