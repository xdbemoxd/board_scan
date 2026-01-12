"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Upload } from "lucide-react"
import Image from "next/image"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Aquí irá la lógica de registro
    setTimeout(() => {
      setIsLoading(false)
      console.log("Register:", formData)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Carga de imagen */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Foto de Perfil</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-lg p-6 cursor-pointer hover:border-slate-400 transition-colors flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100"
        >
          {imagePreview ? (
            <div className="relative w-20 h-20">
              <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="rounded-lg object-cover" />
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">Haz clic para subir una imagen</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          aria-label="Subir imagen de perfil"
        />
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium">
          Nombre
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Juan"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>

      {/* Apellido */}
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium">
          Apellido
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Pérez"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Correo Electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  )
}
