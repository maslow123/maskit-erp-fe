import Loading from '@/components/Loading'
import { createSupplier, deleteSupplier, updateSupplier } from '@/services/suppliers'
import { showToast } from '@/util/helper'
import React, { useEffect, useState } from 'react'

export default function ModalForm({ data, onClose }) {
  const [formData, setFormData] = useState({ ...data })
  const [loading, setLoading] = useState(false)

  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  const getData = () => {
    let modalData = {
      title: formData?.['title'],
      bgButton: formData?.['bgBut'],
      disabled: false,
      action: () => {},
    }

    switch (data.type) {
      case 'view':
        modalData.title = 'Data Organisasi'
        modalData.bgButton = 'rounded bg-[#5A5252] px-3 py-3 text-white'
        modalData.disabled = true
        modalData.action = () => {}

        return modalData
      case 'add':
        modalData.title = 'Tambah Organisasi'
        modalData.bgButton = 'rounded bg-[#5669CC] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          addSupplier(e)
        }
        return modalData
      case 'edit':
        modalData.title = 'Ubah Organisasi'
        modalData.bgButton = 'rounded bg-[#FBBC04] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          console.log('masuk gaggg')
          editSupplier(e)
        }

        return modalData
      case 'delete':
        return modalData
    }
  }

  const modalData = getData()

  const inputs = [
    {
      label: 'ID Supplier',
      state: 'id',
      form: (
        <input
          value={
            data?.type !== 'add'
              ? formData?.['id'] || data?.['id']
              : formData?.['id'] || ''
          }
          disabled
          required
          type="text"
          name="id"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan ID Supplier"
          onChange={(e) => handlePayload('id', e.target.value)}
        />
      ),
    },
    {
      label: 'Nama Supplier',
      state: 'name',
      form: (
        <input
          value={
            data?.type !== 'add'
              ? formData?.['name'] || data?.['name']
              : formData?.['name'] || ''
          }
          required
          type="text"
          name="name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Supplier"
          onChange={(e) => handlePayload('name', e.target.value)}
        />
      ),
    },
    {
      label: 'Nama Supplier',
      state: 'name',
      form: (
        <input
          value={
            data?.type !== 'add'
              ? formData?.['pic_name'] || data?.['pic_name']
              : formData?.['pic_name'] || ''
          }
          required
          type="text"
          name="pic_name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama PIC"
          onChange={(e) => handlePayload('pic_name', e.target.value)}
        />
      ),
    },
    {
      label: 'Nomor Handphone',
      state: 'name',
      form: (
        <input
          value={
            data?.type !== 'add'
              ? formData?.['phone_number'] || data?.['phone_number']
              : formData?.['phone_number'] || ''
          }
          required
          type="text"
          name="phone_number"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan No HP"
          onChange={(e) => handlePayload('phone_number', e.target.value)}
        />
      ),
    },
    {
      label: 'Email',
      state: 'email',
      form: (
        <input
          value={
            data?.type !== 'add'
              ? formData?.['email'] || data?.['email']
              : formData?.['email'] || ''
          }
          required
          type="text"
          name="email"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Email"
          onChange={(e) => handlePayload('email', e.target.value)}
        />
      ),
    },
    {
      label: 'Alamat',
      state: 'address',
      form: (
        <textarea
          value={
            data?.type !== 'add'
              ? formData?.['address'] || data?.['address']
              : formData?.['address'] || ''
          }
          required
          name="address"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => handlePayload('address', e.target.value)}
        ></textarea>
      ),
    },
  ]

  const addSupplier = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const resp = await createSupplier(formData)
      if (resp.status === 201) {
        showToast('success', resp.message)
        setLoading(false)
        return onClose(false)
      } else {
        throw new Error(JSON.stringify(resp))
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const editSupplier = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...data,
        ...formData,
      }
      const resp = await updateSupplier(payload, data.id)
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
      const resp = await deleteSupplier(data.id)
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
      {data.type === 'delete' 
      ? (
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
        <form onSubmit={modalData?.action} className="space-y-10">
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
            <button
              type="submit"
              disabled={loading || !Object.values(formData).every((e) => e)}
              className="flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252] disabled:cursor-not-allowed disabled:bg-blue-theme/50"
            >
              {loading ? <Loading /> : <span>Simpan</span>}
            </button>
            <button
              type="button"
              className="flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              onClick={() => {
                return onClose(false)
              }}
            >
              {loading ? <Loading /> : <span>Batal</span>}
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  )
}
