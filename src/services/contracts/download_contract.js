'use client'

import { headers } from '../headers'

const downloadContract = async (contractID) => {
    try {
        const data = await fetch(
            `${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/contracts/attachment/${contractID}`,
            {
                method: 'GET',
                ...headers(),
            },
        )

        const headerss = data.headers

        // Iterate through the headers using forEach
        headerss.forEach((value, name) => {
            console.log(`${name}: ${value}`)
        })
        const contentDisposition = data.headers.get('Content-Disposition')
        console.log({ contentDisposition })
        let filename = ''
        if (contentDisposition && contentDisposition.includes('attachment')) {
            // Extract the filename from the Content-Disposition header
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            const matches = filenameRegex.exec(contentDisposition)

            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '')
                console.log('Filename:', filename)
            } else {
                console.error(
                    'Unable to extract filename from Content-Disposition header',
                )
            }
        } else {
            console.error(
                'Content-Disposition header not found or does not indicate an attachment',
            )
        }
        const blobFile = await data.blob()
        const file = window.URL.createObjectURL(blobFile)
        // window.location.assign(file)

        // Buat elemen <a> untuk menginisialisasi unduhan
        const a = document.createElement('a')
        a.href = file
        a.download = filename

        // Tambahkan elemen <a> ke dokumen dan klik otomatis
        document.body.appendChild(a)
        a.click()

        // Hapus elemen <a> setelah unduhan selesai
        document.body.removeChild(a)
    } catch (e) {
        console.log(e)
        return e
    }
}

export default downloadContract
