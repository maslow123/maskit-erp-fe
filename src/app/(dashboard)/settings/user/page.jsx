/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ModalPopup from '@/components/ModalPopup'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/auth'
import { getUserList } from '@/services/user'
import '@/styles/tailwind.scss'
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ModalForm from './ModalForm'

export default function User() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [form, setForm] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const fetchData = async (query) => {
    setLoading(true)
    try {
      const users = await getUserList(query)
      setData(users.data.users)
      setTotalRows(users.data.total_count)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const reload = useCallback(() => {
    setForm(undefined)

    fetchData({
      name: "",
      organization_id: "",
      offset: "",
      limit: "",
      include_deleted: false,
    })
  }, [])

  useEffect(() => reload(), [])

  useEffect(() => {
    fetchData({
      name: "",
      organization_id: "",
      offset: page,
      limit: rowsPerPage,
      include_deleted: false,
    })
  }, [page, rowsPerPage])

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    user.level == "Super Admin" ? {
      name: 'Nama Usaha',
      selector: (row) => row.level,
    } : {
      name: 'Nama Pengguna',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Aksi',
      selector: (row) => (
        <div className="flex flex-row flex-wrap justify-between gap-1">
          <button
            type="button"
            class="inline-flex items-center gap-x-0.5 rounded-md bg-[#FBBC04] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FBBC04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBBC04]"
          >
            <PencilSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Ubah
          </button>
          <button
            type="button"
            class="hover:bg-[#F24822]-500 focus-visible:outline-[#F24822]-600 inline-flex items-center gap-x-0.5 rounded-md bg-[#F24822] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Hapus
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div>
        <Sidebar
          tab="settings"
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
          }}
        />
        <Navbar
          breadcrumbs={[
            { name: 'Pengaturan', href: '/settings', current: false },
            {
              name: 'Manajemen Pengguna',
              href: '/settings/user',
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
          }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex">
              <div className="sm:flex-auto">
                <button
                  type="button"
                  className="flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
                  onClick={() => {
                    setForm({
                      id: null,
                      level: null,
                      name: null,
                      email: null,
                      password: null,
                    })
                  }}
                >
                  <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span>Tambah Pengguna</span>
                </button>
              </div>
              <form className="relative flex flex-1" action="#" method="GET">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 ml-2 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="border-1 block h-full w-full rounded border-[#D9D9D9] py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Cari Organisasi"
                  type="search"
                  name="search"
                />
              </form>
            </div>
            <div className="mt-8 flow-root">
              <ModalPopup
                height={450}
                visible={form != undefined}
                onClose={(currentModalVisible) => reload()}
              >
                {form && <ModalForm
                  data={form}
                  onClose={(currentModalVisible) => reload()}
                />}
              </ModalPopup>
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
                      onChangeRowsPerPage={(rowsPerPage, page) => {
                        setRowsPerPage(rowsPerPage)
                      }}
                      onChangePage={(page) => {
                        setPage(page)
                      }}
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
