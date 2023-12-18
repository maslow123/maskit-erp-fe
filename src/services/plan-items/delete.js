'use client';

import { headers } from '../headers'

const deletePlanItem = async (planItemID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/purchase-plan-item/${planItemID}`,
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

export default deletePlanItem
