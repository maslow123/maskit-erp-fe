'use client'

import { NavbarContext } from '@/context/navbar'
import costumerListImage from '@/images/sale/costumer_list.png'
import deliveryOrderImage from '@/images/sale/delivery_order.png'
import invoiceImage from '@/images/sale/invoice.png'
import onlineSalesImage from '@/images/sale/online_sales.png'
import pointOfSaleImage from '@/images/sale/point_of_sale.png'
import priceQuotationImage from '@/images/sale/price_quotation.png'
import returnImage from '@/images/sale/return.png'
import salesSettingsImage from '@/images/sale/sales_settings.png'
import taxInvoiceImage from '@/images/sale/tax_invoice.png'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

export default function Sale() {
  const { setNavbar } = useContext(NavbarContext)

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Penjualan', href: '/sale', current: false },
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
      title: 'Daftar Pelanggan',
      image: costumerListImage,
      href: '#'
    }, {
      title: 'Penawaran Harga',
      image: priceQuotationImage,
      href: '#'
    }, {
      title: 'Faktur',
      image: invoiceImage,
      href: '#'
    }, {
      title: 'Pesan Antar',
      image: deliveryOrderImage,
      href: '#'
    }, {
      title: 'Faktur Pajak',
      image: taxInvoiceImage,
      href: '#'
    }, {
      title: 'Penjualan Online',
      image: onlineSalesImage,
      href: '#'
    }, {
      title: 'Point Of Sale',
      image: pointOfSaleImage,
      href: '#'
    }, {
      title: 'Pengembalian',
      image: returnImage,
      href: '#'
    }, {
      title: 'Pengaturan Penjualan',
      image: salesSettingsImage,
      href: '/sale/settings'
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
