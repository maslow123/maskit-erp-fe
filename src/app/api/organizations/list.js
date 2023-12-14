'use server'
import { headers } from "../headers"

export default async function handler(req, res) {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/organizations`, {
            ...headers(),
        })

        console.log({ data })
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}