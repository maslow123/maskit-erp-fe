'use client';

import { headers } from '../headers'

const deleteContract = async (contractID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/contracts/${contractID}`,
            {
                method: 'DELETE',
                ...headers()
            },
        )

        const json = await response.json()
        console.log({ json })
        return json

        // return mock
    } catch (e) {
        console.log(e)
        return e
    }
}

export default deleteContract
