import Loading from '@/components/Loading'
import { deleteContract, updateContract } from '@/services/contracts'
import { createPlanItem, deletePlanItem, updatePlanItem } from '@/services/plan-items'
import { formatCommonDate, showToast } from '@/util/helper'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'

export default function ModalForm({ data, onClose, suppliers, units }) {
  console.log({ data })
  const [formData, setFormData] = useState({ ...data })
  const [loading, setLoading] = useState(false)
  const reminders = [3, 7, 14]
  const hiddenFileInput = useRef(null)

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
        modalData.title = 'Data Item'
        modalData.bgButton = 'rounded bg-[#5A5252] px-3 py-3 text-white'
        modalData.disabled = true
        modalData.action = () => {}

        return modalData
      case 'add':
        modalData.title = 'Tambah Item'
        modalData.bgButton = 'rounded bg-[#5669CC] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          addPlanItem(e)
        }
        return modalData
      case 'edit':
        modalData.title = 'Ubah Item'
        modalData.bgButton = 'rounded bg-[#FBBC04] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          editPurchaseItem(e)
        }

        return modalData
      case 'delete':
        return modalData
    }
  }

  const modalData = getData()

  const inputs = [   
    {
      label: 'Nama Item',
      state: 'name',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['name'] || data?.['name']
              : formData?.['name'] || ''
          }
          required
          type="text"
          name="name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Item"
          onChange={(e) => handlePayload('name', e.target.value)}
        />
      ),
    },
    {
      label: 'Rata Konsumsi / Minggu',
      state: 'weekly_avg',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['weekly_avg'] || data?.['weekly_avg']
              : formData?.['weekly_avg'] || ''
          }
          required
          type="text"
          name="weekly_avg"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan Rata Konsumsi / Minggu"
          onChange={(e) => handlePayload('weekly_avg', e.target.value)}
        />
      ),
    },
    {
      label: 'Rata Konsumsi / Bulan',
      state: 'monthly_avg',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['monthly_avg'] || data?.['monthly_avg']
              : formData?.['monthly_avg'] || ''
          }
          required
          type="text"
          name="monthly_avg"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan Rata Konsumsi / Bulan"
          onChange={(e) => handlePayload('monthly_avg', e.target.value)}
        />
      ),
    },
    {
      label: 'Unit',
      state: 'unit_id',
      form: (
        <select
          disabled={data?.type === 'view'}
          value={formData?.unit_id}
          required
          type="text"
          name="unit_id"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Pilih Nama Supplier"
          onChange={(e) => handlePayload('unit_id', e.target.value)}
        >
          <option value={null} selected>
            Pilih Unit
          </option>
          {units.map((e, i) => (
            <option
              key={i}
              value={e.id}
              selected={data.type === 'edit' && formData?.unit_id === e.id}
            >
              {e.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: 'Nama Supplier',
      state: 'supplier_id',
      form: (
        <select
          disabled={data?.type === 'view'}
          value={formData?.supplier_id}
          required
          type="text"
          name="supplier_id"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Pilih Nama Supplier"
          onChange={(e) => handlePayload('supplier_id', e.target.value)}
        >
          <option value={null} selected>
            Pilih Supplier
          </option>
          {suppliers.map((e, i) => (
            <option
              key={i}
              value={e.id}
              selected={data.type === 'edit' && formData?.supplier_id === e.id}
            >
              {e.name}
            </option>
          ))}
        </select>
      ),
    }    
  ]

  const addPlanItem = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const data = { ...formData }
      data.weekly_avg = Number(data.weekly_avg)
      data.monthly_avg = Number(data.monthly_avg)
      const resp = await createPlanItem(data)
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

  const editPurchaseItem = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const data = { ...formData }
      data.weekly_avg = Number(data.weekly_avg)
      data.monthly_avg = Number(data.monthly_avg)
      const resp = await updatePlanItem(data, data.id)
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
      const resp = await deletePlanItem(data.id)
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
      {data.type === 'delete' ? (
        <div className="flex-1 py-5 text-center">
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
              disabled={loading}
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
