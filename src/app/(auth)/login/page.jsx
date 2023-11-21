'use client'
import { SlimLayout } from '@/components/SlimLayout'
import { EnvelopeIcon, EyeIcon, EyeslashIcon, LockIcon } from '@/icons'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  })

  const [passwordShown, setPasswordShown] = useState(false)

  const onShown = () => {
    setPasswordShown(!passwordShown)
  }

  const handlePayload = (state, val) => {
    setPayload({ ...payload, [state]: val });
  }
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO ...
    console.log({ payload })
  }
  return (
    <SlimLayout>
      <h2 className="mt-20 text-center text-4xl font-semibold uppercase tracking-widest text-[white]">
        Masuk ERP
      </h2>
      <p className="mt-2 text-center text-xs text-[white]">
        Selamat Datang Di Sistem ERP PT Perpustakaan
      </p>
      <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={onSubmit}>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="placeholder:text-blue block w-full rounded-md border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Masukkan email anda"
              onChange={e => handlePayload('email', e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              required
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id="password"
              className="border-1 placeholder:text-blue block w-full rounded-md py-1.5 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Masukkan kata sandi anda"
              onChange={e => handlePayload('password', e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
              onClick={onShown}
            >
              {passwordShown ? (
                <EyeslashIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-1 text-sm leading-6 text-[white] text-xs">
              <label htmlFor="comments" className="font-medium text-gray-900">
                Ingat Saya
              </label>
            </div>
          </div>
          <Link href={"/reset-password"} className='text-xs text-[white]'>Lupa kata sandi?</Link>
        </div>
        <button
          type="submit"
          className="text-blue rounded rounded-lg bg-[white] bg-white px-2 py-1 text-sm font-semibold uppercase tracking-widest text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Simpan
        </button>
        <div></div>
      </form>
    </SlimLayout>
  )
}
