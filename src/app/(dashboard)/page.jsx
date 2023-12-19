'use client'

import 'react-toastify/dist/ReactToastify.css';

import { NavbarContext } from '@/context/navbar';
import { HomeIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { setNavbar } = useContext(NavbarContext)

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Dashboard', href: '/', current: false },
      ],
      breadcrumbIcon: (
        <HomeIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      )
    })
  }, [setNavbar])

  return (
    <div>
      Dashboard
    </div>
  )
}
