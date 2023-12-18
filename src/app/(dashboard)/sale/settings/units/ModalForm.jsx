/* eslint-disable react-hooks/exhaustive-deps */
import Loading from '@/components/Loading'
import { createUnit, updateUnit } from '@/services/units'
import { showToast } from '@/util/helper'
import { useState } from 'react'

export default function ModalForm({ data, onClose }) {
  const [formData, setFormData] = useState({ ...data })
  const [loading, setLoading] = useState(false)

  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  const inputs = [
    {
      label: 'Nama Unit',
      state: 'name',
      form: (
        <input
          value={formData.name}
          required
          type="text"
          name="name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Unit"
          onChange={(e) => handlePayload('name', e.target.value)}
        />
      ),
    }
  ]

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      let resp

      if (formData.id) {
        const { id, rest } = formData
        resp = await updateUnit(rest, id)
      } else {
        resp = await createUnit(formData)
      }

      if (resp.status >= 300) {
        throw new Error(resp.message)
      }

      showToast('success', resp.message)
      return onClose(false)
    } catch (err) {
      showToast('error', err?.message || "Something Wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="mb-5 text-center">
        <span className="rounded bg-[#5669CC] px-3 py-3 text-white">{formData.id ? "Edit" : "Tambah"} Unit</span>
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
          disabled={loading || !Object.values(formData).every(e => e)}
          className="flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252] disabled:cursor-not-allowed disabled:bg-blue-theme/50"
        >
          {loading ? <Loading /> : <span>{formData.id ? "Ubah" : "Simpan"}</span>}
        </button>
        <button
          type="button"
          className="flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
          onClick={() => onClose(false)}
        >
          {loading ? <Loading /> : <span>Batal</span>}
        </button>
      </div>
    </form>
  )
}
