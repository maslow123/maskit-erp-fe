'use client';

import { headers } from '../headers'

const createPlanItem = async (data) => {
    try {
        const response = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/purchase-plan-item`, {
            method: 'POST',
            body: JSON.stringify(data),
            ...headers()
        })

        return await response.json()
    } catch (e) {
        console.log(e)
        return e
    }
}

export default createPlanItem
