import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>Completa los campos para crear tu nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RegisterForm/>
          <div className="text-center text-sm">
            <span className="text-slate-600">¿Ya tienes cuenta? </span>
            <Link href="/pages/login" className="font-semibold text-slate-900 hover:text-slate-700">
              Ingresar aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
