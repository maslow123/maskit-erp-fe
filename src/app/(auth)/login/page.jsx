'use client'
import { SlimLayout } from '@/components/SlimLayout'
import { useAuth } from '@/context/auth'
import { EnvelopeIcon, EyeIcon, EyeslashIcon, LockIcon } from '@/icons'
import { status } from '@/lib/constants'
import login from '@/services/auth/login'
import { showToast } from '@/util/helper'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function Login() {
  const router = useRouter();
  const ctx = useAuth();

  const [payload, setPayload] = useState({
    email: 'superadmin@maskit.co.id',
    password: 'superadmin',
  })
  const [isLoading, setIsLoading] = useState(false)

  const [passwordShown, setPasswordShown] = useState(false)

  const onShown = () => {
    setPasswordShown(!passwordShown)
  }

  const handlePayload = (state, val) => {
    setPayload({ ...payload, [state]: val })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    // TODO ...
    setIsLoading(true)
    try {
      const resp = await login(payload)
      if (resp.status !== status.OK) {        
        showToast('error', resp.message)
        return
      }
      
      Cookies.set('token', resp.data.token);
      setIsLoading(false)
      router.push('/dashboard');
    } catch(e) {
      showToast('error', JSON.stringify(e))
    }

    setIsLoading(false)
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
                className="text-gray-400 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <input
              value={payload.email}
              required
              type="email"
              name="email"
              id="email"
              className="text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 pl-12 ring-1 ring-inset placeholder:text-blue-theme focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Masukkan email anda"
              onChange={(e) => handlePayload('email', e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
            </div>
            <input
              value={payload.password}
              required
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id="password"
              className="border-1 text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md py-1.5 pl-12 pr-12 ring-1 ring-inset placeholder:text-blue-theme focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Masukkan kata sandi anda"
              onChange={(e) => handlePayload('password', e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
              onClick={onShown}
            >
              {passwordShown ? (
                <EyeslashIcon
                  className="text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <EyeIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
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
                className="border-gray-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4 rounded"
              />
            </div>
            <div className="ml-1 text-sm text-xs leading-6 text-[white]">
              <label htmlFor="comments" className="text-white font-medium">
                Ingat Saya
              </label>
            </div>
          </div>
          <Link href={'/reset-password'} className="text-xs text-[white]">
            Lupa kata sandi?
          </Link>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 rounded rounded-lg bg-[white] px-2 py-1 text-sm font-semibold uppercase tracking-widest text-blue-theme shadow-sm ring-1 ring-inset"
        >
          Masuk
        </button>
        <div></div>
      </form>
    </SlimLayout>
  )
}
