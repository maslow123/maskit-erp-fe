'use client';

import { headers } from '../headers'

const deleteSupplier = async (supplierID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/suppliers/${supplierID}`,
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

export default deleteSupplier
