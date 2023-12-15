'use client'

import '@/styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import AuthProvider, { ProtectRoute } from '@/context/auth';
import { NavbarContext } from '@/context/navbar';
import clsx from 'clsx';
import { Inter, Lexend } from 'next/font/google';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: {
    template: '%s - TaxPal',
    default: 'TaxPal - Accounting made simple for small businesses',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navbar, setNavbar] = useState({
    breadcrumbs: [],
    breadcrumbIcon: <></>,
    title: ""
  })

  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <ToastContainer hideProgressBar autoClose={3000} />
        <AuthProvider>
          <ProtectRoute>
            <Sidebar
              sidebarOpen={sidebarOpen}
              onSidebarOpen={(sidebarIsOpen) => setSidebarOpen(sidebarIsOpen)}
            />
            <NavbarContext.Provider value={{ navbar, setNavbar }}>
              <div className="lg:pl-72">
                <Navbar
                  breadcrumbs={navbar.breadcrumbs}
                  breadcrumbIcon={navbar.breadcrumbIcon}
                  title={navbar.title}
                  sidebarOpen={sidebarOpen}
                  onSidebarOpen={(sidebarIsOpen) => setSidebarOpen(sidebarIsOpen)}
                />
                <main className="py-10">
                  <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
              </div>
            </NavbarContext.Provider>
          </ProtectRoute>
        </AuthProvider>
      </body>
    </html>
  )
}
