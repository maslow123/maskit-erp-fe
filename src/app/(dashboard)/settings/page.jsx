'use client'
import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import cartImage from '@/images/settings/cart.png'
import usersImage from '@/images/settings/users.png'
import townImage from '@/images/settings/town.png'
import companyImage from '@/images/settings/company.png'
import documentImage from '@/images/settings/document.png'
import Image from 'next/image'
import Link from 'next/link'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Settings() {
  const cards = [
    {
      title: 'Manajemen Organisasi',
      image: companyImage,
      href: '/settings/organizations'
    },
    {
      title: 'Manajemen Pengguna',
      image: usersImage,
      href: '#'
    },
    {
      title: 'xxxxx',
      image: townImage,
      href: '#'
    },
    {
      title: 'xxxxx',
      image: cartImage,
      href: '#'
    },
    {
      title: 'xxxxx',
      image: documentImage,
      href: '#'
    },
  ]
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Sidebar
          tab="settings"
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
            console.log(sidebarIsOpen)
          }}
        />
        <Navbar
          breadcrumbs={[
            { name: 'Pengaturan', href: '/settings', current: false },
            // { name: 'Project Nero', href: '#', current: true },
          ]}
          breadcrumbIcon={
            <Cog6ToothIcon
              className="h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          }
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
            console.log(sidebarIsOpen)
          }}
        >
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map((card, i) => (
              <Link
                href={card.href}
                key={i}
                className="col-span-1 divide-y divide-gray-200 rounded-lg border bg-white shadow"
              >
                <div className="flex w-full items-center justify-center space-x-6 p-6">
                  <div className="items-center truncate">
                    <div className="flex flex-col items-center gap-4 space-x-3">
                      <h1 className="truncate text-2xl font-bold font-medium text-gray-900 ">
                        {card.title}
                      </h1>
                      <Image className="text-center" src={card.image} alt="" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </Navbar>
      </div>
    </>
  )
}
