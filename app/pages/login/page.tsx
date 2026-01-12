import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Suspense } from "react"
import { FormSkeleton } from "@/components/skeleton/formSkeleton/page"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Ingresar</CardTitle>
          <CardDescription>Accede a tu cuenta con tu correo y contraseña</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense fallback={<FormSkeleton />}>
             <LoginForm />
          </Suspense>
          <div className="text-center text-sm">
            <span className="text-slate-600">¿No tienes cuenta? </span>
            <Link href="/pages/register" className="font-semibold text-slate-900 hover:text-slate-700">
              Crear una aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
