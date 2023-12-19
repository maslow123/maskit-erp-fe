'use client'

import { NavbarContext } from '@/context/navbar'
import managementPPNImage from '@/images/sale/settings/management_ppn.png'
import managementUnitImage from '@/images/sale/settings/management_unit.png'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

export default function SaleSettings() {
  const { setNavbar } = useContext(NavbarContext)

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Penjualan', href: '/sale', current: false },
        { name: 'Pengaturan Penjualan', href: '/sale/settings', current: false },
      ],
      breadcrumbIcon: (
        <Cog6ToothIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      )
    })
  }, [setNavbar])

  const cards = [
    {
      title: 'Management Unit',
      image: managementUnitImage,
      href: '/sale/settings/units'
    }, {
      title: 'Management PPN',
      image: managementPPNImage,
      href: '#'
    },
  ]

  return (
    <div
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
                <Image className="text-center w-20 h-20" src={card.image} alt="" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
