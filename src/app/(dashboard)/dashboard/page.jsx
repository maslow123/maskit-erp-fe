'use client'

import { NavbarContext } from '@/context/navbar';
import { HomeIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';

export default function Dashboard() {
  const { _, setNavbar } = useContext(NavbarContext)

  setNavbar({
    breadcrumbs: [
      { name: 'Dashboard', href: '/dashboard', current: false },
    ],
    breadcrumbIcon: (
      <HomeIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden="true"
      />
    )
  })

  return (
    <div>
      Dashboard
    </div>
  )
}
