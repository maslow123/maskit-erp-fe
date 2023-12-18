'use client'

import { SlimLayout } from '@/components/SlimLayout'
import { EnvelopeIcon, EyeIcon, EyeslashIcon, LockIcon } from '@/icons'
import { resetPassword } from '@/services/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Login() {
    const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [tokenIsValid, setTokenIsValid] = useState(false)
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    confirm_password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const [passwordShown, setPasswordShown] = useState({
    password: false,
    confirm_password: false,
  })

  const handlePayload = (state, val) => {
    setPayload({ ...payload, [state]: val })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    // TODO ...
    console.log({ payload })
    setIsLoading(true)
    const resp = await resetPassword(payload)
    setIsLoading(false)
  }

  useEffect(() => {
    const validateToken = (token) => {
      // do validate token
      return false
    }

    const validToken = validateToken(token)
    setTokenIsValid(validToken)
  }, [])

  const onShown = (state) => {
    setPasswordShown({ ...passwordShown, [state]: !passwordShown[state] })
  }

  const generateForm = () => {
    if (!tokenIsValid) {
      return (
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <EnvelopeIcon
                className="text-gray-400 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 pl-12 ring-1 ring-inset placeholder:text-blue-theme focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Masukkan email anda"
              onChange={(e) => handlePayload('email', e.target.value)}
            />
          </div>
          <div className="mt-3 flex flex-row justify-end gap-3">
            <Link
              href="/login"
              className="ring-gray-300 hover:bg-gray-50 rounded rounded-lg bg-[red] px-2 py-1 text-sm font-semibold uppercase tracking-widest text-[white] shadow-sm ring-1 ring-inset"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="ring-gray-300 hover:bg-gray-50 rounded rounded-lg bg-lightblue2-theme px-2 py-1 text-sm font-semibold uppercase tracking-widest text-[white] shadow-sm ring-1 ring-inset"
            >
              Kirim
            </button>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="flex flex-col gap-3">
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon
                  className="text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <input
                required
                type={passwordShown.password ? 'text' : 'password'}
                name="password"
                id="password"
                className="border-1 text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md py-1.5 pl-12 pr-12 ring-1 ring-inset placeholder:text-blue-theme focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Masukkan kata sandi anda"
                onChange={(e) => handlePayload('password', e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
                onClick={() => onShown('password')}
              >
                {passwordShown.password ? (
                  <EyeslashIcon
                    className="text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon
                  className="text-gray-400 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <input
                required
                type={passwordShown.confirm_password ? 'text' : 'password'}
                name="password"
                id="password"
                className="border-1 text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md py-1.5 pl-12 pr-12 ring-1 ring-inset placeholder:text-blue-theme focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Masukkan kata sandi anda"
                onChange={(e) => handlePayload('password', e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
                onClick={() => onShown('confirm_password')}
              >
                {passwordShown.confirm_password ? (
                  <EyeslashIcon
                    className="text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 rounded rounded-lg bg-[white] px-2 py-1 text-sm font-semibold uppercase tracking-widest text-blue-theme shadow-sm ring-1 ring-inset"
        >
          Simpan
        </button>
      </React.Fragment>
    )
  }
  return (
    <SlimLayout>
      {/* <Notify
        title="test title"
        description={'test description'}
        isError={false}
      /> */}
      <h2 className="mt-20 text-center text-3xl font-semibold uppercase tracking-widest text-[white]">
        RESET KATA SANDI
      </h2>
      <p className="mt-2 text-center text-xs text-[white]">
        Masukkan email anda yang terdaftar di sistem ERP
      </p>
      <form className="mt-10 grid grid-cols-1 gap-y-8" onSubmit={onSubmit}>
        {generateForm()}
      </form>
    </SlimLayout>
  )
}
