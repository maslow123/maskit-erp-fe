'use client'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { logout } from '@/util/helper'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Navbar() {
  const router = useRouter()
  const ctx = useAuth()

  const onLogout = async () => {
    await logout(ctx, router)
  }

  
  const userNavigation = [
    { name: 'Your profile', href: '#', onClick: () => {} },
    { name: 'Sign out', href: '#', onClick: onLogout },
  ]
  return (
    <div>
      <div className="lg:pl-72">
        <div className="border-gray-200 bg-white sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-gray-700 -m-2.5 p-2.5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="bg-gray-900/10 h-6 w-px lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="text-gray-400 pointer-events-none absolute inset-y-0 left-0 h-full w-5"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="text-gray-900 placeholder:text-gray-400 block h-full w-full border-0 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 -m-2.5 p-2.5"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="lg:bg-gray-900/10 hidden lg:block lg:h-6 lg:w-px"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="bg-gray-50 h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />                  
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="text-gray-900 ml-4 text-sm font-semibold leading-6"
                      aria-hidden="true"
                    >
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      className="text-gray-400 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="bg-white ring-gray-900/5 absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md py-2 shadow-lg ring-1 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={item.onClick}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'text-gray-900 block px-3 py-1 text-sm leading-6',
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </div>
  )
}
