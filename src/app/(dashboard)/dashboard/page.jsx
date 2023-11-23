'use client'
import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { HomeIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
            console.log(sidebarIsOpen)
          }}
        />
        <Navbar
          breadcrumbs={[
            { name: 'Dashboard', href: '/dashboard', current: false },
            // { name: 'Project Nero', href: '#', current: true },
          ]}
          breadcrumbIcon={
            <HomeIcon
              className="h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          }
          title={'Dashboard'}
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
            console.log(sidebarIsOpen)
          }}
        >
          Sample Content
        </Navbar>
      </div>
    </>
  )
}
