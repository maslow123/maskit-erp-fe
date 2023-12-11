/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ModalPopup from '@/components/ModalPopup'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/auth'
import '@/styles/tailwind.scss'
import {
  ArchiveBoxIcon,
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import ModalForm from './ModalForm'
import { useTable } from '@/hooks/use-table'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@/util/helper'
import { getSupplierList } from '@/services/suppliers'

export default function Page() {
  const { user } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm] = useState()
  const [type, setType] = useState()
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
    moreQuery,
    setMoreQuery,
    onSearch,
    reload,
  } = useTable(getSupplierList, {
    name: '',
    pic_name: '',
    phone_number: '',
    email: '',
    address: '',
  })

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Nama Supplier',
      selector: (row) => row.name,
    },
    {
      name: 'Nama PIC',
      selector: (row) => row.pic_name,
    },
    {
      name: 'No HP',
      selector: (row) => row.phone_number,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Alamat',
      selector: (row) => row.address,
    },
    {
      name: 'Aksi',
      selector: (row) => (
        <div className="flex flex-row flex-wrap justify-between gap-1">
          <button
            // onClick={() => setType('edit')}
            type="button"
            class="inline-flex items-center gap-x-0.5 rounded-md bg-[#FBBC04] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FBBC04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBBC04]"
          >
            <PencilSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Ubah
          </button>
          <button
            onClick={() => setType('delete')}
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
          tab="purchase"
          sidebarOpen={sidebarOpen}
          onSidebarOpen={(sidebarIsOpen) => {
            setSidebarOpen(sidebarIsOpen)
          }}
        />
        <Navbar
          breadcrumbs={[
            { name: 'Pembelian', href: '/purchase', current: false },
            {
              name: 'Manajemen Pemasok',
              href: '/purchase/suppliers',
              current: true,
            },
          ]}
          breadcrumbIcon={
            <ShoppingCartIcon
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
              <div className="flex flex-row gap-2 sm:flex-auto">
                <button
                  type="button"
                  className="flex items-center justify-between gap-1 rounded-full bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
                  onClick={() => {
                    setForm({
                      name: '',
                      pic_name: '',
                      phone_number: '',
                      email: '',
                      address: '',
                    })
                    setType('add')
                  }}
                >
                  <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span>Buat Supplier</span>
                </button>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center justify-between gap-1 rounded-full bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]">
                      Insert Massal
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm',
                              )}
                            >
                              <ArrowDownCircleIcon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Unduh Template
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm',
                              )}
                            >
                              <ArrowUpCircleIcon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Unggah Template
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <form className="relative flex flex-1" action="#" method="GET">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 ml-2 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="border-1 block h-full w-full rounded border-[#D9D9D9] py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Cari Supplier"
                  type="search"
                  name="search"
                  onChange={(event) => {
                    onSearch({ name: event.target.value })
                  }}
                />
              </form>
            </div>
            <div className="mt-8 flow-root">
              <ModalPopup
                height={600}
                visible={form != undefined}
                onClose={(currentModalVisible) => {
                  if (currentModalVisible) return
                  setForm(undefined)
                  reload()
                }}
              >
                {form && (
                  <ModalForm
                    data={form}
                    onClose={(currentModalVisible) => {
                      if (currentModalVisible) return
                      setForm(undefined)
                      reload()
                    }}
                  />
                )}
              </ModalPopup>
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <DataTable
                      columns={columns}
                      data={data?.suppliers || []}
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