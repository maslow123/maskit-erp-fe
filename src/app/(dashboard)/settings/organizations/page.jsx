'use client'
import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import {
  Cog6ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import DataTable from 'react-data-table-component'
import '@/styles/tailwind.scss'
import { list } from '@/services/organizations'
import ModalPopup from '@/components/ModalPopup'
import ModalForm from './ModalForm'
import { debounce } from 'lodash'
export default function Organizations() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [organization, setOrganization] = useState({})
  const [type, setType] = useState('')  
  const [searchTerm, setSearchTerm] = useState('');

  const isInitialRender = useRef(true)

  useEffect(() => {
    fetchData(page)
  }, [])

  const search = async (query) => {
    // Implement your search logic here
    console.log('Searching for:', query);
    // fetchData(page)
  };

  // Debounced search function
  const debouncedSearch = debounce(search, 1000); // Adjust the debounce delay as needed (300 milliseconds in this example)

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };
  
  const fetchData = async (page) => {
    setLoading(true)
    try {
      const offset = (page - 1) * perPage;
      const organizations = await list(page, offset, searchTerm)
      setData(organizations.data.organizations)
      setTotalRows(organizations.data.total_count)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handlePageChange = (page) => {
    setPage(page)
    fetchData(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)

    setPage(page)
    setPerPage(newPerPage)
    setLoading(false)
  }

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

  useEffect(() => {
    fetchData(1) // fetch page 1 of users
  }, [])

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
                  className="block flex items-center justify-between gap-1 rounded-md bg-blue-theme px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A5252]"
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
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </form>
            </div>
            <div className="mt-8 flow-root">
              <ModalPopup
                height={type !== 'delete' ? 800 : 300}
                visible={modalVisible}
                onClose={(currentModalVisible) => {
                  setModalVisible(currentModalVisible)
                  fetchData(page)
                }}
              >
                <ModalForm
                  type={type}
                  data={organization}
                  onClose={(currentModalVisible) => {
                    setModalVisible(currentModalVisible)
                    fetchData(page)
                  }}
                />
              </ModalPopup>
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <DataTable
                      columns={columns}
                      data={data || []}
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
