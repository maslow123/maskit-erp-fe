import { create, list } from '@/services/organizations'
import { showToast } from '@/util/helper'
import { useEffect, useState } from 'react'

export default function ModalForm({ data, onClose, type }) {

  const [formData, setFormData] = useState({ ...data })
  const [loading, setLoading] = useState(false)
  const [usahaOptions, setUsahaOptions] = useState([])

  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  useEffect(() => {
    list('').then((res) => {
      setUsahaOptions(res.data.organizations.map((e) => ({
        label: e.name,
        value: e.id,
      })))
    }).catch((e) => console.error(e))
  }, [])

  const inputs = [
    {
      label: 'ID Pengguna',
      state: 'id',
      form: (
        <input
          value={data['id']}
          required
          type="text"
          name="id"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan ID Pengguna"
          onChange={(e) => handlePayload('id', e.target.value)}
        />
      ),
    },
    {
      label: 'Nama Usaha',
      state: 'level',
      form: (
        <select
          value={data['level']}
          required
          type="text"
          name="text"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Pilih Nama Usaha"
          onChange={(e) => handlePayload('level', e.target.value)}
        >
          {usahaOptions.map((e, i) => (
            <option key={i} value={e.value}>{e.label}</option>
          ))}
        </select>
      ),
    },
    {
      label: 'Nama Pengguna',
      state: 'name',
      form: (
        <input
          value={data['name']}
          required
          type="text"
          name="name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Pengguna"
          onChange={(e) => handlePayload('name', e.target.value)}
        />
      ),
    },
    {
      label: 'Email',
      state: 'email',
      form: (
        <input
          value={data['email']}
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
      label: 'Kata Sandi',
      state: 'password',
      form: (
        <input
          value={data['password']}
          required
          type="password"
          name="password"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Kata Sandi"
          onChange={(e) => handlePayload('password', e.target.value)}
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
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="mb-5 text-center">
        <span className="rounded bg-[#5669CC] px-3 py-3 text-white">Tambah Pengguna</span>
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
          className="flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
        >
          <span>Simpan</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-between gap-1 rounded-md bg-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
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
