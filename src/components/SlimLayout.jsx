import Image from 'next/image'
import erp from '@/images/logos/erp.png'

export function SlimLayout({ children }) {
  return (
    <>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            src={erp}
            alt=""
          />
        </div>
        <div className="sm:flex sm:justify-center bg-blue-theme relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl">
          <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
