import { create, deleteOrganization, update } from '@/services/organizations'
import { showToast } from '@/util/helper'
import React, { useEffect, useState } from 'react'

export default function ModalForm({ data, onClose, type }) {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  const getData = () => {
    let data = {
      title: formData?.['title'],
      bgButton: formData?.['bgBut'],
      disabled: false,
      action: () => {},
    }

    switch (type) {
      case 'view':
        data.title = 'Data Organisasi'
        data.bgButton = 'rounded bg-[#5A5252] px-3 py-3 text-white'
        data.disabled = true
        data.action = () => {}

        return data
      case 'add':
        data.title = 'Tambah Organisasi'
        data.bgButton = 'rounded bg-[#5669CC] px-3 py-3 text-white'
        data.disabled = false
        data.action = (e) => {
          addOrganization(e)
        }
        return data
      case 'edit':
        data.title = 'Ubah Organisasi'
        data.bgButton = 'rounded bg-[#FBBC04] px-3 py-3 text-white'
        data.disabled = false
        data.action = (e) => {
          console.log('masuk gaggg')
          editOrganization(e)
        }

        return data
      case 'delete':
        return data
    }
  }

  const modalData = getData()

  const inputs = [
    {
      label: 'Nama Usaha',
      state: 'name',
      form: (
        <input
          value={type !== 'add' ? formData?.['name'] || data?.['name'] : formData?.['name'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="text"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['pic_name'] || data?.['pic_name'] : formData?.['pic_name'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="text"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['email'] || data?.['email'] : formData?.['email'] || ''}
          disabled={modalData?.disabled}
          required
          type="email"
          name="email"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['business_field'] || data?.['business_field'] : formData?.['business_field'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="business_field"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['address'] || data?.['address'] : formData?.['address'] || ''}
          disabled={modalData?.disabled}
          name="address"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['phone_number'] || data?.['phone_number'] : formData?.['phone_number'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="phone_number"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['fax_number'] || data?.['fax_number'] : formData?.['fax_number'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="fax_number"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['website'] || data?.['website'] : formData?.['website'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="website"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['bank_name'] || data?.['bank_name'] : formData?.['bank_name'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="bank_name"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['bank_branch'] || data?.['bank_branch'] : formData?.['bank_branch'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="bank_branch"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
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
          value={type !== 'add' ? formData?.['bank_acc_no'] || data?.['bank_acc_no'] : formData?.['bank_acc_no'] || ''}
          disabled={modalData?.disabled}
          required
          type="text"
          name="bank_acc_no"
          id="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
          placeholder="Masukkan No Rekening"
          onChange={(e) => handlePayload('bank_acc_no', e.target.value)}
        />
      ),
    },
  ]

  const addOrganization = async (e) => {
    e.preventDefault()
    const payload = {
      ...data,
      ...formData,
    }
    setLoading(true)
    try {
      const resp = await create(payload)
      if (resp.status === 201) {
        showToast('success', resp.message)
        setLoading(false)
        setFormData(null)
        return onClose(false)
      } else {
        throw new Error(JSON.stringify(resp))
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const editOrganization = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...data,
        ...formData,
      }
      const resp = await update(payload, data.id)
      if (resp.status === 200) {
        showToast('success', resp.message)
        setLoading(false)
        setFormData(null)
        return onClose(false)
      } else {
        throw new Error(JSON.stringify(resp))
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const deleteData = async () => {
    setLoading(true)
    try {
      const resp = await deleteOrganization(data.id)
      if (resp.status === 200) {
        showToast('success', resp.message)
        setLoading(false)
        setFormData(null)
        return onClose(false)
      } else {
        throw new Error(JSON.stringify(resp))
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      {type === 'delete' ? (
        <div className="py-5 flex-1 text-center">
          <span>Anda yakin ingin menghapus data ini?</span>
          <div className="mt-5 flex flex-row justify-end gap-3">
            <button
              onClick={() => deleteData()}
              type="button"
              disabled={loading}
              className="block flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
            >
              <span>Simpan</span>
            </button>
            <button
              type="button"
              className="block flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              onClick={() => {
                setFormData(null)
                return onClose(false)
              }}
            >
              <span>Batal</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={modalData?.action}>
          <div className="mb-5 text-center">
            <span className={`rounded ${modalData?.bgButton}`}>
              {modalData?.title}
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
            {['add', 'edit'].includes(type) && (
              <button
                type="submit"
                disabled={loading}
                className="block flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              >
                <span>Simpan</span>
              </button>
            )}
            <button
              type="button"
              className="block flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              onClick={() => {
                setFormData(null)
                return onClose(false)
              }}
            >
              <span>Batal</span>
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  )
}
