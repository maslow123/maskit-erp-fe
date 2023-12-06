'use client';

import { headers } from '../headers'

const mock = [
    {
        id: 'string',
        name: 'string',
        business_field: 'string',
        pic_name: 'string',
        address: 'string',
        email: 'string',
        phone_number: 'string',
        fax_number: 'string',
        website: 'string',
        bank_name: 'string',
        bank_branch: 'string',
        bank_acc_no: 'string',
        created_at: '2023-11-26T04:39:42.093Z',
        updated_at: '2023-11-26T04:39:42.093Z',
        deleted_at: '2023-11-26T04:39:42.093Z',
    },
    {
        id: 'string',
        name: 'string',
        business_field: 'string',
        pic_name: 'string',
        address: 'string',
        email: 'string',
        phone_number: 'string',
        fax_number: 'string',
        website: 'string',
        bank_name: 'string',
        bank_branch: 'string',
        bank_acc_no: 'string',
        created_at: '2023-11-26T04:39:42.093Z',
        updated_at: '2023-11-26T04:39:42.093Z',
        deleted_at: '2023-11-26T04:39:42.093Z',
    },
    {
        id: 'string',
        name: 'string',
        business_field: 'string',
        pic_name: 'string',
        address: 'string',
        email: 'string',
        phone_number: 'string',
        fax_number: 'string',
        website: 'string',
        bank_name: 'string',
        bank_branch: 'string',
        bank_acc_no: 'string',
        created_at: '2023-11-26T04:39:42.093Z',
        updated_at: '2023-11-26T04:39:42.093Z',
        deleted_at: '2023-11-26T04:39:42.093Z',
    },
]

const list = async (query) => {
    try {
        const data = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations`,
            {
                method: 'GET',
                ...headers
            },
        )

        const json = await data.json()
        console.log({ json })
        return json

        // return mock
    } catch (e) {
        console.log(e)
        return e
    }
}

export default list
