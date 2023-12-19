'use client';

import { headers } from '../headers'

const deleteBatchPlanItem = async (supplierIds) => {
    const payload = {
        data: supplierIds
    }
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/purchase-plan-item/batch`,
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

export default deleteBatchPlanItem
