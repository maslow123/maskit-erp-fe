'use client'
import Notify from '@/components/Notify'
import { SlimLayout } from '@/components/SlimLayout'
import { EnvelopeIcon, EyeIcon, EyeslashIcon, LockIcon } from '@/icons'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Login() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [tokenIsValid, setTokenIsValid] = useState(false)
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    confirm_password: '',
  })

  const [passwordShown, setPasswordShown] = useState({
    password: false,
    confirm_password: false,
  })

  const handlePayload = (state, val) => {
    setPayload({ ...payload, [state]: val })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO ...
    console.log({ payload })
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
              onChange={(e) => handlePayload('email', e.target.value)}
            />
          </div>
          <div className="mt-3 flex flex-row justify-end gap-3">
            <Link
              href="/login"
              className="rounded rounded-lg bg-[red] px-2 py-1 text-sm font-semibold uppercase tracking-widest text-[white] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="bg-lightblue2 rounded rounded-lg px-2 py-1 text-sm font-semibold uppercase tracking-widest text-[white] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Kirim
            </button>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className='flex flex-col gap-3'>
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                required
                type={passwordShown.password ? 'text' : 'password'}
                name="password"
                id="password"
                className="border-1 placeholder:text-blue block w-full rounded-md py-1.5 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Masukkan kata sandi anda"
                onChange={(e) => handlePayload('password', e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
                onClick={() => onShown('password')}
              >
                {passwordShown.password ? (
                  <EyeslashIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400"
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
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                required
                type={passwordShown.confirm_password ? 'text' : 'password'}
                name="password"
                id="password"
                className="border-1 placeholder:text-blue block w-full rounded-md py-1.5 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Masukkan kata sandi anda"
                onChange={(e) => handlePayload('password', e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-4 flex cursor-pointer items-center pl-3"
                onClick={() => onShown('confirm_password')}
              >
                {passwordShown.confirm_password ? (
                  <EyeslashIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-blue rounded rounded-lg bg-[white] bg-white px-2 py-1 text-sm font-semibold uppercase tracking-widest text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
