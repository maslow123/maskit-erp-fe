/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ModalPopup from '@/components/ModalPopup'
import { useAuth } from '@/context/auth'
import '@/styles/tailwind.scss'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ModalForm from './ModalForm'
import { useTable } from '@/hooks/use-table'
import {
  classNames,
  showToast,
} from '@/util/helper'
import { getSupplierList } from '@/services/suppliers'
import { Menu, Transition } from '@headlessui/react'
import { deleteBatchPlanItem, getPlanItemList } from '@/services/plan-items'
import { NavbarContext } from '@/context/navbar'
import { getUnitList } from '@/services/units'

export default function Page() {
  const { user } = useAuth()
  const { setNavbar } = useContext(NavbarContext)

  const [form, setForm] = useState()
  const [supplierList, setSupplierList] = useState([])
  const [unitList, setUnitList] = useState([])
  const [deleteIds, setDeleteIds] = useState([])

  useEffect(() => {
    setNavbar({
      breadcrumbs: [
        { name: 'Pembelian', href: '/purchase', current: false },
        {
          name: 'Manajemen Perencanaan Pembelian',
          href: '/purchase/plan-item',
          current: true,
        },
      ],
      breadcrumbIcon: (
        <ShoppingCartIcon
          className="h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      ),
    })
  }, [])

  useEffect(() => {
    const getSuppliers = async () => {
      const resp = await getSupplierList({ limit: 10000 })
      setSupplierList([...resp?.data?.suppliers])
    }

    const getUnits = async () => {
      const resp = await getUnitList({ limit: 10000 })
      setUnitList([...resp?.data?.units])
    }

    getSuppliers()
    getUnits()
  }, [])

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
  } = useTable(getPlanItemList, {
    _id: '',
    unit_id: '541c38b5-91d5-4c65-a67b-3639061a79e8',
    name: '',
    weekly_avg: '',
    monthly_avg: '',
  })

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Nama Item',
      selector: (row) => row.name,
    },
    {
      name: 'Rata Konsumsi / Minggu',
      selector: (row) => row.weekly_avg,
    },
    {
      name: 'Rata Konsumsi / Bulan',
      selector: (row) => row.monthly_avg,
    },
    {
      name: 'Unit',
      selector: (row) => row.unit_name,
    },
    {
      name: 'Nama Supplier',
      selector: (row) => row.supplier_name,
    },
    {
      name: 'Aksi',
      width: '300px',
      selector: (row) => (
        <div className="flex flex-row flex-wrap justify-between gap-1">
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
    {
      name: (
        <div className="w-full">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={() => {
              if (deleteIds.length === data?.purchas_plan_items.length) {
                setDeleteIds([])
                return
              }

              let ids = []
              for (let planItem of data?.purchas_plan_items) {
                ids = [...ids, planItem.id]
              }

              setDeleteIds([...ids])
            }}
          />
        </div>
      ),
      selector: (row) => (
        <input
          name="delete"
          type="checkbox"
          checked={deleteIds.filter((id) => id === row.id).length > 0}
          onChange={() => {
            console.log({ row })
            let temp = [...deleteIds]
            const isExist = temp.find((id) => id === row.id)
            if (isExist) {
              temp = temp.filter((item) => item !== row.id)
              setDeleteIds([...temp])
            } else {
              console.log('else')
              temp = [...temp, row.id]
              setDeleteIds([...temp])
            }
            console.log({ temp })
          }}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      ),
    },
  ]

  const deleteBatch = async () => {
    setLoading(true)
    try {
      const resp = await deleteBatchPlanItem(deleteIds)

      if (resp.status >= 300) {
        throw new Error(resp.message)
      }

      showToast('success', resp.message)
      reload()
    } catch (err) {
      showToast('error', err?.message || 'Something Wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex">
            <div className="flex flex-row gap-2 sm:flex-auto">
              <div className="flex flex-row items-center gap-3 font-bold">
                <span>Pilih Supplier</span>

                <select
                  onChange={(e) => {
                    onSearch({
                      supplier_id: e.target.value,
                    })
                  }}
                  name="sort"
                  id=""
                  className="w-[150px] appearance-none rounded-md border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option selected disabled>
                    {' '}
                    Pilih supplier
                  </option>
                  {supplierList?.length > 0 &&
                    supplierList.map((s, i) => (
                      <option key={i} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <form className="relative flex flex-1" action="#" method="GET">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 ml-2 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="border-1 block h-full w-full rounded border-[#D9D9D9] py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Cari Item atau Supplier"
                type="search"
                name="search"
                onChange={(event) => {
                  onSearch({ name: event.target.value })
                }}
              />
            </form>
            {/* Menu Button */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="ml-3 flex items-center justify-between gap-1 rounded-full bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]">
                  <PlusCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Tambah Purchase Request
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
                          // onClick={download}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'group flex items-center px-4 py-2 text-sm',
                          )}
                        >
                          <PlusCircleIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          PR Mingguan
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          // onClick={() => hiddenFileInput.current.click()}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'group flex items-center px-4 py-2 text-sm',
                          )}
                        >
                          <PlusCircleIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          PR Bulanan
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="my-3 flex flex-row justify-between">
            <button
              type="button"
              className="flex items-center justify-between gap-1 rounded-full bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
              onClick={() => {
                setForm({
                  supplier_id: '',
                  unit_id: '541c38b5-91d5-4c65-a67b-3639061a79e8',
                  name: '',
                  weekly_avg: '',
                  monthly_avg: '',
                  type: 'add',
                })
              }}
            >
              <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
              <span>Tambah Item</span>
            </button>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="flex items-center justify-between gap-1 rounded-full bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252] disabled:opacity-50"
                  disabled={deleteIds.length < 1}
                >
                  Aksi
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
                  <div className="rounded-full  py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={deleteBatch}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'group flex items-center rounded-full px-4 py-2 text-sm hover:bg-red hover:text-white',
                          )}
                        >
                          Hapus
                          <TrashIcon
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="mt-8 flow-root">
            <ModalPopup
              height={form?.type === 'delete' ? 200 : 500}
              visible={form != undefined}
              onClose={(currentModalVisible) => {
                if (currentModalVisible) return
                setForm(undefined)
                reload()
              }}
            >
              {form && (
                <ModalForm
                  units={unitList}
                  suppliers={supplierList}
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
                    data={data?.purchase_plan_items || []}
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
        {/* </Navbar> */}
      </div>
    </>
  )
}
