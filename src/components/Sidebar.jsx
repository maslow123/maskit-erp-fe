'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BeakerIcon,
  HomeIcon,
  ServerStackIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import erp_logo from '@/images/logos/erp-logo.png'
import Image from 'next/image'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Pembelian', href: '#', icon: ShoppingCartIcon, current: false },
  { name: 'Persediaan', href: '#', icon: ServerStackIcon, current: false },
  { name: 'Produksi', href: '#', icon: BeakerIcon, current: false },
  { name: 'Penjualan', href: '#', icon: DocumentChartBarIcon, current: false },
  { name: 'Keuangan', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Pengaturan', href: '#', icon: Cog6ToothIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-gray-900/80 fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="text-white h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="bg-blue-theme text-white flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    /> */}
                    <Image
                      className="bg-gray-50 h-8 w-8 rounded-full"
                      src={erp_logo}
                      alt=""
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-blue-theme text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-blue-theme',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? 'text-white'
                                      : 'text-indigo-200 group-hover:text-white',
                                    'h-6 w-6 shrink-0',
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <a
                          href="#"
                          className="text-indigo-200 hover:bg-blue-theme hover:text-white group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        >
                          <Cog6ToothIcon
                            className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="bg-blue-theme text-white flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">            
            <Image
              className="rounded-full ml-[50px]"
              src={erp_logo}
              alt=""
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-blue-theme text-white'
                            : 'text-indigo-200 hover:text-white hover:bg-blue-theme',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-white'
                              : 'text-indigo-200 group-hover:text-white',
                            'h-6 w-6 shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="text-indigo-200 hover:bg-blue-theme hover:text-white group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                >
                  <Cog6ToothIcon
                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
