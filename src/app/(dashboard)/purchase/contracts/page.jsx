/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ModalPopup from '@/components/ModalPopup'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { useAuth } from '@/context/auth'
import '@/styles/tailwind.scss'
import {
  ArrowDownCircleIcon,
  ChevronDownIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ModalForm from './ModalForm'
import { useTable } from '@/hooks/use-table'
import {
  classNames,
  formatCommonDate,
  formatDate,
  showToast,
} from '@/util/helper'
import { getSupplierList } from '@/services/suppliers'
import { downloadContract, getContractList } from '@/services/contracts'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

export default function Page() {
  const { user } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm] = useState()
  const [supplierList, setSupplierList] = useState([])

  useEffect(() => {
    const getSuppliers = async () => {
      const resp = await getSupplierList({ limit: 10000 })
      setSupplierList([...resp?.data?.suppliers])
    }

    getSuppliers()
  }, [])

  const download = async (contractID) => {
    await downloadContract(contractID)
  }
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
    setQuery,
    onSearch,
    reload,
  } = useTable(getContractList, {
    supplier_id: '',
    terms_of_payment: '',
    down_payment: '',
    start_date: '',
    end_date: '',
    reminder: '',
    notes: '',
    attachment: null,
  })

  const sort = [
    {
      label: 'ID',
      value: 'id'
    },
    {
      label: 'Supplier',
      value: 'supplier_name'
    },
    {
      label: 'Berakhir Kontrak',
      value: 'end_date'
    },
  ]
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Nama Supplier',
      selector: (row) => row.supplier_name,
    },
    {
      name: 'Term Of Payment',
      selector: (row) => row.terms_of_payment,
    },
    {
      name: 'Down Payment Method',
      selector: (row) => row.down_payment,
    },
    {
      name: 'Tanggal Berakhir Kontrak',
      selector: (row) => formatCommonDate(row.start_date),
    },
    {
      name: 'Catatan',
      selector: (row) => row.notes,
    },
    {
      name: 'Lampiran Kontrak',
      selector: (row) => (
        <button
          onClick={() => download(row.id)}
          className="border-3 inline-flex w-full items-center gap-x-0.5 rounded-full border border-[#D9D9D9] bg-[#FCB900] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FCB900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCB900]"
        >
          <ArrowUpOnSquareIcon className="ml-0.5 h-5 w-5" aria-hidden="true" />
          Unduh
        </button>
      ),
    },
    {
      name: 'Aksi',
      selector: (row) => (
        <div className="flex flex-row flex-wrap justify-between gap-1">
          <button
            onClick={() => setForm({ ...row, type: 'view' })}
            type="button"
            className="inline-flex items-center gap-x-0.5 rounded-md bg-[#5A5252] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5A5252] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
          >
            <EyeIcon className="ml-0.5 h-5 w-5" aria-hidden="true" />
            Lihat
          </button>
          <button
            onClick={() => setForm({ ...row, type: 'edit' })}
            type="button"
            className="inline-flex items-center gap-x-0.5 rounded-md bg-[#FBBC04] px-1.5 py-0.5 text-sm font-semibold !text-white text-white shadow-sm hover:bg-[#FBBC04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBBC04]"
          >
            <PencilSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Ubah
          </button>
          <button
            onClick={() => setForm({ ...row, type: 'delete' })}
            type="button"
            className="hover:bg-[#F24822]-500 focus-visible:outline-[#F24822]-600 inline-flex items-center gap-x-0.5 rounded-md bg-[#F24822] px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
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
              name: 'Manajemen Kontrak',
              href: '/purchase/contracts',
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
                      supplier_id: '',
                      terms_of_payment: '',
                      down_payment: '',
                      start_date: '',
                      end_date: '',
                      reminder: '',
                      notes: '',
                      attachment: null,
                      type: 'add',
                    })
                  }}
                >
                  <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span>Buat Kontrak</span>
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
                  placeholder="Cari Kontrak"
                  type="search"
                  name="search"
                  onChange={(event) => {
                    onSearch({ name: event.target.value })
                  }}
                />
              </form>
            </div>
            <div className="mt-8 flow-root">
              <div className="flex flex-row gap-3 items-center mb-5">
                <span>Sort by</span>

                <select
                  onChange={e => {
                    setQuery({
                      order: 'ASC',
                      order_by: e.target.value
                    })
                  }}
                  name="sort"
                  id=""
                  className="w-[150px] appearance-none rounded-md border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  {
                    sort.map((s, i) => (
                      <option key={i} value={s.value}>{s.label}</option>
                    ))
                  }
                </select>
              </div>
              <ModalPopup
                height={form?.type === 'delete' ? 200 : 800}
                visible={form != undefined}
                onClose={(currentModalVisible) => {
                  if (currentModalVisible) return
                  setForm(undefined)
                  reload()
                }}
              >
                {form && (
                  <ModalForm
                    suppliers={supplierList}
                    data={form}
                    onClose={(currentModalVisible) => {
                      if (currentModalVisible) return
                      setForm(undefined)
                      reload()
                    }}
                    download={download}
                  />
                )}
              </ModalPopup>
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <DataTable
                      columns={columns}
                      data={data?.contracts || []}
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
