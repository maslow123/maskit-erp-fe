import { NavbarContext } from '@/context/navbar'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'

export default function Profile() {
  const { _, setNavbar } = useContext(NavbarContext)

  setNavbar({
    breadcrumbs: [
      { name: 'Pengaturan', href: '/settings', current: false },
      {
        name: 'Manajemen Pengguna',
        href: '/settings/users',
        current: true,
      },
    ],
    breadcrumbIcon: (
      <Cog6ToothIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden="true"
      />
    )
  })

  return (
    <div>Profile</div>
  )
}
