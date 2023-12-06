import { create } from '@/services/organizations'
import { showToast } from '@/util/helper'
import React, { useState } from 'react'

export default function ModalForm({ data, onClose, type }) {
  
  const [formData, setFormData] = useState({ ...data })
  const [loading, setLoading] = useState(false)
  
  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  const generateTitle = () => {
    switch(type) {
      case 'view':
        return 'Data Organisasi'
      case 'add':
      case 'edit':
      case 'delete':
    }
  }
  const inputs = [
    {
      label: 'Nama Usaha',
      state: 'name',
      form: (
        <input
          value={data['name'] || ''}
          required
          type="text"
          name="text"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan nama usaha"
          onChange={(e) => handlePayload('name', e.target.value)}
        />
      ),
    },
    {
      label: 'Nama Pengguna',
      state: 'pic_name',
      form: (
        <input
          value={data['pic_name'] || ''}
          required
          type="text"
          name="text"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan nama pengguna"
          onChange={(e) => handlePayload('pic_name', e.target.value)}
        />
      ),
    },
    {
      label: 'Email',
      state: 'email',
      form: (
        <input
          value={data['email'] || ''}
          required
          type="email"
          name="email"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan email"
          onChange={(e) => handlePayload('email', e.target.value)}
        />
      ),
    },
    {
      label: 'Bidang Perusahaan',
      state: 'business_field',
      form: (
        <input
          value={data['business_field'] || ''}
          required
          type="text"
          name="business_field"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan bidang perusahaan"
          onChange={(e) => handlePayload('business_field', e.target.value)}
        />
      ),
    },
    {
      label: 'Alamat Perusahaan',
      state: 'address',
      form: (
        <textarea
          required
          value={data['address'] || ''}
          name="address"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan alamat perusahaan"
          onChange={(e) => handlePayload('address', e.target.value)}
        ></textarea>
      ),
    },
    {
      label: 'No Telp Perusahaan',
      state: 'phone_number',
      form: (
        <input
          value={data['phone_number'] || ''}
          required
          type="text"
          name="phone_number"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan no telpon perusahaan"
          onChange={(e) => handlePayload('phone_number', e.target.value)}
        />
      ),
    },
    {
      label: 'Fax Perusahaan',
      state: 'fax_number',
      form: (
        <input
          value={data['fax_number'] || ''}
          required
          type="text"
          name="fax_number"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan fax perusahaan"
          onChange={(e) => handlePayload('fax_number', e.target.value)}
        />
      ),
    },
    {
      label: 'Website perusahaan',
      state: 'website',
      form: (
        <input
          value={data['website'] || ''}
          required
          type="text"
          name="website"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan website perusahaan"
          onChange={(e) => handlePayload('website', e.target.value)}
        />
      ),
    },
    {
      label: 'Bank',
      state: 'bank_name',
      form: (
        <input
          value={data['bank_name'] || ''}
          required
          type="text"
          name="bank_name"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan bank"
          onChange={(e) => handlePayload('bank_name', e.target.value)}
        />
      ),
    },
    {
      label: 'KCP Bank',
      state: 'bank_branch',
      form: (
        <input
          value={data['bank_branch'] || ''}
          required
          type="text"
          name="bank_branch"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan KCP Bank"
          onChange={(e) => handlePayload('bank_branch', e.target.value)}
        />
      ),
    },
    {
      label: 'No Rekening',
      state: 'bank_acc_no',
      form: (
        <input
          value={data['bank_acc_no'] || ''}
          required
          type="text"
          name="bank_acc_no"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan No Rekening"
          onChange={(e) => handlePayload('bank_acc_no', e.target.value)}
        />
      ),
    },
  ]


  const onSubmit = async (e) => {
    e.preventDefault()

    console.log({ formData })
    setLoading(true)
    try {
      const resp = await create(formData)
      if (resp.status === 201) {
        showToast('success', resp.message)
        setLoading(false)
        return onClose(false)
      } else {
        throw new Error(JSON.stringify(resp))
      }
    } catch(e) {
      console.error(e)
      setLoading(false)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-5 text-center">
        <span className="rounded bg-[#5669CC] px-3 py-3 text-white">
          Tambah
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {inputs.map((input, i) => (
          <div
            className="flex flex-row flex-wrap items-center justify-between gap-2"
            key={i}
          >
            <span className="text-sm">{input.label}</span>
            {input.form}
          </div>
        ))}
      </div>
      <div className="my-5 flex flex-row justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="block flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
          >
            <span>Simpan</span>
          </button>
          <button
            type="button"
            className="block flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
            onClick={() => {
              return onClose(false)
            }}
          >
            <span>Batal</span>
          </button>
      </div>
    </form>
  )
}
