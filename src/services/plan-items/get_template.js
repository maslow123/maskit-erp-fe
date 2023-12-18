'use client';

import { headers } from '../headers'

const getTemplate = async () => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/suppliers/batch`, {
            method: 'GET',
            ...headers()
        })

        const blobFile = await data.blob()
        const file = window.URL.createObjectURL(blobFile)
        // window.location.assign(file)
        const filename = 'supplier-batch-template.xlsx';

        // Buat elemen <a> untuk menginisialisasi unduhan
        const a = document.createElement('a');
        a.href = file;
        a.download = filename;

        // Tambahkan elemen <a> ke dokumen dan klik otomatis
        document.body.appendChild(a);
        a.click();

        // Hapus elemen <a> setelah unduhan selesai
        document.body.removeChild(a);
    } catch (e) {
        console.log(e)
        return e
    }
}

export default getTemplate
