'use client';

import { headers } from '../headers'

const updatePlanItem = async (data, planItemID) => {
    try {
        const response = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/purchase-plan-item/${planItemID}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
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

export default updatePlanItem
