import AuthProvider, { ProtectRoute } from '@/context/auth'
import Dashboard from './(dashboard)/dashboard/page'
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <AuthProvider>      
      <ProtectRoute>
        <Dashboard/>
      </ProtectRoute>
    </AuthProvider>
  )
}
