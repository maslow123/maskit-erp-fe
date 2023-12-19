'use client'

import erp_logo from '@/images/logos/erp-logo.png'
import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  BeakerIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  HomeIcon,
  ServerStackIcon,
  ShoppingCartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar({ onSidebarOpen, sidebarOpen }) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
    }, {
      name: 'Pembelian',
      href: '/purchase',
      icon: ShoppingCartIcon,
    }, {
      name: 'Persediaan',
      href: '#',
      icon: ServerStackIcon,
    }, {
      name: 'Produksi',
      href: '#',
      icon: BeakerIcon,
    }, {
      name: 'Penjualan',
      href: '/sale',
      icon: DocumentChartBarIcon,
    }, {
      name: 'Keuangan',
      href: '#',
      icon: ChartBarIcon,
    }, {
      name: 'Pengaturan',
      href: '/settings',
      icon: Cog6ToothIcon,
    },
  ]
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={() => onSidebarOpen(!sidebarOpen)}
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
            <div className="fixed inset-0 bg-gray-900/80" />
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
                      onClick={() => onSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue px-6 pb-4 text-white">
                  <div className="flex h-16 shrink-0 items-center">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    /> */}
                    <Image
                      className="h-8 w-8 rounded-full bg-gray-50"
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
                                  pathname.includes(item.href)
                                    ? 'bg-blue text-white'
                                    : 'text-indigo-200 hover:bg-blue hover:text-white',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    pathname.includes(item.href)
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
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-blue hover:text-white"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
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
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue px-6 pb-4 text-white">
          <div className="flex h-16 shrink-0 items-center">
            <Image className="ml-[50px] rounded-full" src={erp_logo} alt="" />
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
                          pathname.includes(item.href)
                            ? 'bg-blue text-white'
                            : 'text-indigo-200 hover:bg-blue hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            pathname.includes(item.href)
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
                <button
                  type="button"
                  className="inline-flex text-blue-theme items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm"
                >
                  <ArrowRightOnRectangleIcon
                    className="-ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
