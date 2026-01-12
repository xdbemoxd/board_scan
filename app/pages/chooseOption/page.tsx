import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ChooseOption() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-slate-900">Bienvenido</h1>
          <p className="text-xl text-slate-600">Sistema de Autenticación</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/pages/login/">
            <Button size="lg" className="px-8">
              Ingresar
            </Button>
          </Link>
          <Link href="/pages/register">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Crear Cuenta
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
