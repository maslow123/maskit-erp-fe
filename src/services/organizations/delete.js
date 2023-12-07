'use client';

import { headers } from '../headers'

const deleteOrganization = async (organizationID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations/${organizationID}`,
            {
                method: 'DELETE',
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

export default deleteOrganization
