'use client'

import Loading from '@/components/Loading'
import { NavbarContext } from '@/context/navbar'
import { getOrganization, updateCurrentOrganization } from '@/services/organizations'
import { showToast } from '@/util/helper'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'

export default function Profile() {
  const { _, setNavbar } = useContext(NavbarContext)

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Pengaturan', href: '/settings', current: false },
        {
          name: 'Manajemen Pengguna',
          href: '/settings/users',
          current: true,
        },
      ],
      breadcrumbIcon: (
        <Cog6ToothIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      )
    })
  }, [])

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    business_field: "",
    address: "",
    pic_name: "",
    phone_number: "",
    fax_number: "",
    website: "",
    email: "",
    bank_name: "",
    bank_branch: "",
    bank_acc_no: "",
  })

  useEffect(() => {
    setLoading(true)
    getOrganization()
      .then((res) => {
        setFormData(res.data.organization)
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const handlePayload = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }))
  }

  const inputs = [
    {
      label: 'Nama Perusahaan',
      state: 'name',
      form: (
        <input
          value={formData.name}
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
      label: 'Bidang Perusahaan',
      state: 'business_field',
      form: (
        <input
          value={formData.business_field}
          required
          type="text"
          name="business_field"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Bidang Perusahaan"
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
          value={formData.address}
          name="address"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-slate-50 sm:text-sm sm:leading-6"
          placeholder="Masukkan alamat perusahaan"
          onChange={(e) => handlePayload('address', e.target.value)}
        ></textarea>
      ),
    },
    {
      label: 'Nama Penanggung Jawab Perusahaan',
      state: 'pic_name',
      form: (
        <input
          value={formData.pic_name}
          required
          type="text"
          name="pic_name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Penanggung Jawab Perusahaan"
          onChange={(e) => handlePayload('pic_name', e.target.value)}
        />
      ),
    },
    {
      label: 'No. Telp. Perusahaan',
      state: 'phone_number',
      form: (
        <input
          value={formData.phone_number}
          required
          type="text"
          name="phone_number"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan No. Telp. Perusahaan"
          onChange={(e) => handlePayload('phone_number', e.target.value)}
        />
      ),
    },
    {
      label: 'Fax Perusahaan',
      state: 'fax_number',
      form: (
        <input
          value={formData.fax_number}
          required
          type="text"
          name="fax_number"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Fax Perusahaan"
          onChange={(e) => handlePayload('fax_number', e.target.value)}
        />
      ),
    },
    {
      label: 'Website',
      state: 'website',
      form: (
        <input
          value={formData.website}
          required
          type="text"
          name="website"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Website Perusahaan"
          onChange={(e) => handlePayload('website', e.target.value)}
        />
      ),
    },
    {
      label: 'Email Perusahaan',
      state: 'email',
      form: (
        <input
          value={formData.email}
          required
          type="email"
          name="email"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Email Perusahaan"
          onChange={(e) => handlePayload('email', e.target.value)}
        />
      ),
    },
    {
      label: 'Bank',
      state: 'bank_name',
      form: (
        <input
          value={formData.bank_name}
          required
          type="text"
          name="bank_name"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan Nama Bank Perusahaan"
          onChange={(e) => handlePayload('bank_name', e.target.value)}
        />
      ),
    },
    {
      label: 'KCP Bank',
      state: 'bank_branch',
      form: (
        <input
          value={formData.bank_branch}
          required
          type="text"
          name="bank_branch"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan KCP Bank Perusahaan"
          onChange={(e) => handlePayload('bank_branch', e.target.value)}
        />
      ),
    },
    {
      label: 'No. Rekening',
      state: 'bank_acc_no',
      form: (
        <input
          value={formData.bank_acc_no}
          required
          type="text"
          name="bank_acc_no"
          className="block w-3/4 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Masukkan No. Rekening"
          onChange={(e) => handlePayload('bank_acc_no', e.target.value)}
        />
      ),
    },
  ]

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const resp = await updateCurrentOrganization(formData)

      if (resp.status >= 300) {
        throw new Error(resp.message)
      }

      showToast('success', resp.message)
    } catch (err) {
      showToast('error', err?.message || "Something Wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
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
          {loading ? <Loading /> : <span>Ubah</span>}
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
