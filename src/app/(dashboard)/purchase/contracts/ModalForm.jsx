import Loading from '@/components/Loading'
import { createContract, deleteContract, updateContract } from '@/services/contracts'
import { formatCommonDate, showToast } from '@/util/helper'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'

export default function ModalForm({ data, onClose, suppliers, download }) {
  if (data.type === 'edit') {
    data.start_date = formatCommonDate(data.start_date)
    data.end_date = formatCommonDate(data.end_date)
  }

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
        modalData.title = 'Data Kontrak'
        modalData.bgButton = 'rounded bg-[#5A5252] px-3 py-3 text-white'
        modalData.disabled = true
        modalData.action = () => {}

        return modalData
      case 'add':
        modalData.title = 'Tambah Kontrak'
        modalData.bgButton = 'rounded bg-[#5669CC] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          addContract(e)
        }
        return modalData
      case 'edit':
        modalData.title = 'Ubah Kontrak'
        modalData.bgButton = 'rounded bg-[#FBBC04] px-3 py-3 text-white'
        modalData.disabled = false
        modalData.action = (e) => {
          editContract(e)
        }

        return modalData
      case 'delete':
        return modalData
    }
  }

  const modalData = getData()

  const inputs = [
    {
      label: 'ID Kontrak',
      state: 'id',
      form: (
        <input
          disabled
          required
          type="text"
          name="id"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan ID Supplier"
          onChange={(e) => handlePayload('id', e.target.value)}
        />
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
            Pilih Opsi
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
    },
    {
      label: 'Terms Of Payment',
      state: 'terms_of_payment',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['terms_of_payment'] || data?.['terms_of_payment']
              : formData?.['terms_of_payment'] || ''
          }
          required
          type="text"
          name="terms_of_payment"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan Terms Of Payment"
          onChange={(e) => handlePayload('terms_of_payment', e.target.value)}
        />
      ),
    },
    {
      label: 'Down Payment Method',
      state: 'down_payment',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['down_payment'] || data?.['down_payment']
              : formData?.['down_payment'] || ''
          }
          required
          type="text"
          name="down_payment"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Masukkan Down Payment Method"
          onChange={(e) => handlePayload('down_payment', e.target.value)}
        />
      ),
    },
    {
      label: 'Tanggal Mulai Kontrak',
      state: 'start_date',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['start_date'] || data?.['start_date']
              : formData?.['start_date'] || ''
          }
          required
          type="date"
          name="start_date"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          onChange={(e) => handlePayload('start_date', e.target.value)}
        />
      ),
    },
    {
      label: 'Tanggal Berakhir Kontrak',
      state: 'end_date',
      form: (
        <input
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['end_date'] || data?.['end_date']
              : formData?.['end_date'] || ''
          }
          required
          type="date"
          name="end_date"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          onChange={(e) => handlePayload('end_date', e.target.value)}
        />
      ),
    },
    {
      label: 'Pengingat Masa Kontrak',
      state: 'reminder',
      form: (
        <select
          disabled={data?.type === 'view'}
          value={formData?.reminder}
          required
          name="reminder"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          placeholder="Pilih Pengingat Waktu"
          onChange={(e) => handlePayload('reminder', e.target.value)}
        >
          <option value={null}>Pilih Opsi</option>
          {reminders.map((e, i) => (
            <option key={i} value={e} selected={data.type === 'edit' && e === data.reminder}>
              {e} Hari
            </option>
          ))}
        </select>
      ),
    },
    {
      label: 'Catatan',
      state: 'notes',
      form: (
        <textarea
          disabled={data?.type === 'view'}
          value={
            data?.type !== 'add'
              ? formData?.['notes'] || data?.['notes']
              : formData?.['notes'] || ''
          }
          required
          name="notes"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          onChange={(e) => handlePayload('notes', e.target.value)}
        ></textarea>
      ),
    },
    {
      label: 'Lampiran Kontrak',
      state: 'attachment',
      form: (
        <React.Fragment>
          {data.type === 'add' && formData?.attachment ? (
            <span className="text-left">{formData.attachment.name}</span>
          ) : (
            <button
              type="button"
              className="flex w-3/4 items-center justify-center gap-1 rounded-full bg-[#06C2B1] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              onClick={() => {
                if (data.type !== 'view') {
                  hiddenFileInput.current.click()
                  return
                }

                // Do Download File ...
                download(data?.id)
              }}
            >
              <ArrowUpOnSquareIcon className="h-5 w-5 flex-shrink-0" />
              <span>{data?.type === 'view' ? 'Unduh' : 'Unggah'} Kontrak</span>
            </button>
          )}
          <input
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => handlePayload('attachment', e.target.files[0])}
            accept=".pdf, .jpg, .jpeg, .png"
            name="attachment"
            className="block hidden w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-[#D9D9D9] sm:text-sm sm:leading-6"
          />
        </React.Fragment>
      ),
    },
  ]

  const addContract = async (e) => {
    e.preventDefault()

    const fd = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value)
    })

    setLoading(true)
    try {
      const resp = await createContract(fd)
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

  const editContract = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (['supplier_name', 'id', 'created_at', 'updated_at', 'deleted_at', 'type'].includes(key)) { return }
        if (key === 'attachment' && typeof(value) === 'string') return

        fd.append(key, value)
      })


      const resp = await updateContract(fd, data.id)
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
      const resp = await deleteContract(data.id)
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
