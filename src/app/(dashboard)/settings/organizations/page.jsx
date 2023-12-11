'use client'

import ModalPopup from '@/components/ModalPopup'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { useTable } from '@/hooks/use-table'
import { getOrganizationList } from '@/services/organizations'
import '@/styles/tailwind.scss'
import {
  Cog6ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import ModalForm from './ModalForm'

export default function Organizations() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [organization, setOrganization] = useState({})
  const [type, setType] = useState('')

  const isInitialRender = useRef(true)

  const {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    totalRows,
    setTotalRows,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    query,
    setQuery,
    onSearch,
    reload
  } = useTable(getOrganizationList, {
    // name: "",
    // pic_name: "",
    // business_field: "",
    // include_deleted: false,
  })

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    setModalVisible(true)
  }, [organization, type])

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Nama Usaha',
      selector: (row) => row.name,
    },
    {
      name: 'Nama Pengguna',
      selector: (row) => row.pic_name,
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
            onClick={() => {
              setOrganization({ ...row })
              setType('view')
            }}
            type="button"
            class="inline-flex items-center gap-x-0.5 rounded-md bg-[#5A5252] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5A5252] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
          >
            <EyeIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Lihat
          </button>
          <button
            onClick={() => {
              setOrganization({ ...row })
              setType('edit')
            }}
            type="button"
            class="inline-flex items-center gap-x-0.5 rounded-md bg-[#FBBC04] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FBBC04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBBC04]"
          >
            <PencilSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Ubah
          </button>
          <button
            onClick={() => {
              setOrganization({ ...row })
              setType('delete')
            }}
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
          }}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex">
              <div className="sm:flex-auto">
                <button
                  type="button"
                  className="flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
                  onClick={() => {
                    setOrganization({})
                    setType('add')
                  }}
                >
                  <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span>Tambah organisasi</span>
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
                  onChange={(event) => {
                    onSearch({ "name": event.target.value })
                  }}
                />
              </form>
            </div>
            <div className="mt-8 flow-root">
              <ModalPopup
                height={type !== 'delete' ? 800 : 300}
                visible={modalVisible}
                onClose={(currentModalVisible) => reload()}
              >
                <ModalForm
                  type={type}
                  data={organization}
                  onClose={(currentModalVisible) => reload()}
                />
              </ModalPopup>
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <DataTable
                      columns={columns}
                      data={data.organizations || []}
                      progressPending={loading}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={(newPerPage, page) => {
                        setPage(page)
                        setRowsPerPage(newPerPage)
                      }}
                      onChangePage={(page, totalRows) => setPage(page)}
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
