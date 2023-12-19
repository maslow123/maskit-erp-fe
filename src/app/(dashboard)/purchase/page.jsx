'use client'
import { NavbarContext } from '@/context/navbar'
import cartImage from '@/images/purchase/cart.png'
import cartMarketplaceImage from '@/images/purchase/cart_marketplace.png'
import contractImage from '@/images/purchase/contract.png'
import purchasePlanImage from '@/images/purchase/purchase_plan.png'
import supplierImage from '@/images/purchase/supplier.png'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

export default function Purchase() {
  const { setNavbar } = useContext(NavbarContext)

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Pembelian', href: '/purchase', current: false },
        // { name: 'Project Nero', href: '#', current: true },
      ],
      breadcrumbIcon: (
        <ShoppingCartIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      )
    })

  }, [setNavbar])

  const cards = [
    {
      title: 'Manajemen Pemasok',
      image: supplierImage,
      href: '/purchase/suppliers'
    }, {
      title: 'Manajemen Kontrak',
      image: contractImage,
      href: '/purchase/contracts'
    }, {
      title: 'Perencanaan Pembelian',
      image: purchasePlanImage,
      href: '/purchase/plan-item'
    }, {
      title: 'Pembelian Bahan Baku dan Operasional',
      image: cartImage,
      href: '#'
    }, {
      title: 'Pembelian Marketplace',
      image: cartMarketplaceImage,
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
                <Image className="text-center w-20 h-20" src={card.image} alt="" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  )
}
