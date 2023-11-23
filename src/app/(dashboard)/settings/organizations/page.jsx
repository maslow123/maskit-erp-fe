'use client'
import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import DataTable from 'react-data-table-component'
import '@/styles/tailwind.scss'
export default function Organizations() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const fetchUsers = async (page) => {
    setLoading(true)

    let response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`,
    )

    response = await response.json()
    console.log({ response })
    setData(response.data)
    setTotalRows(response.total)
    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)

    const response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`,
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }
  const columns = [
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'First Name',
      selector: (row) => row.first_name,
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
    },
  ]

  useEffect(() => {
    fetchUsers(1) // fetch page 1 of users
  }, [])

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
            {
              name: 'Manajemen Organisasi',
              href: '/settings/organizations',
              current: true,
            },
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
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Users
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add user
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <DataTable
                      columns={columns}
                      data={data}
                      progressPending={loading}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  )
}
