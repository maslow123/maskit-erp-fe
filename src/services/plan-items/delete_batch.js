'use client';

import { headers } from '../headers'

const deleteBatchSupplier = async (supplierIds) => {
    const payload = {
        data: supplierIds
    }
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/suppliers/batch`,
            {
                method: 'DELETE',
                body: JSON.stringify(payload),
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

export default deleteBatchSupplier
