'use client';

import { headers } from '../headers'

const updateContract = async (data, contractID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/contracts/${contractID}`,
            {
                method: 'PUT',
                body: data,
                headers: {
                    ...headers('form-data').headers,
                    Accept: 'application/json',
                }
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

export default updateContract
