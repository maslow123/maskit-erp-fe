'use client'

import { NavbarContext } from '@/context/navbar'
import cartImage from '@/images/settings/cart.png'
import companyImage from '@/images/settings/company.png'
import documentImage from '@/images/settings/document.png'
import townImage from '@/images/settings/town.png'
import usersImage from '@/images/settings/users.png'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

export default function Settings() {
  const { _, setNavbar } = useContext(NavbarContext)

  setNavbar({
    breadcrumbs: [
      { name: 'Pengaturan', href: '/settings', current: false },
      // { name: 'Project Nero', href: '#', current: true },
    ],
    breadcrumbIcon: (
      <Cog6ToothIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden="true"
      />
    )
  })

  const cards = [
    {
      title: 'Manajemen Organisasi',
      image: companyImage,
      href: '/settings/organizations'
    },
    {
      title: 'Manajemen Pengguna',
      image: usersImage,
      href: '/settings/users'
    },
    {
      title: 'Identitas Organisasi',
      image: townImage,
      href: '/settings/profile'
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

  return (
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
                <h1 className="truncate text-2xl font-medium text-gray-900 ">{card.title}</h1>
                <Image className="text-center" src={card.image} alt="" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  )
}
