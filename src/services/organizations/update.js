'use client';

import { headers } from '../headers'

const update = async (data, organizationID) => {
    console.log('before update...', { data }, { organizationID })
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations/${organizationID}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                ...headers
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

export default update
