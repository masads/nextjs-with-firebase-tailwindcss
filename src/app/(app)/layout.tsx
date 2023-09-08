
import { AuthContextProvider } from "@/lib/AuthContext"
import { Toaster } from "react-hot-toast"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <> 
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <AuthContextProvider >

        {children}
      </AuthContextProvider>
    </>
  )
}
