'use client'

import '@/styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider, { ProtectRoute } from '@/context/auth';
import clsx from 'clsx';
import { Inter, Lexend } from 'next/font/google';
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
            {children}
          </ProtectRoute>
        </AuthProvider>
      </body>
    </html>
  )
}
