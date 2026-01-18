"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, EyeOff, Upload } from "lucide-react"
import { useActionState } from 'react';
import { UpdateDataUser } from "@/app/lib/editUserAction/actions"

interface UserData {
  name: string;
  lastname: string; // O el nombre exacto que venga de tu BD
  email: string;
  image?: string;
}

interface ParamProps {
  user: UserData;
}

export function EditProfileForm( {user} :ParamProps ) {

  const [showPassword, setShowPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | undefined >(user.image)
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: "",
    image: null as File | null,
  })

  const initialState = {
    message: null,
    error: false
  };

  const [errorMessage, formAction, isPending] = useActionState(
      UpdateDataUser,
      initialState,
    );

  const getBase64 = (file: File | undefined): Promise<string> => {
    
    return new Promise((resolve, reject) => {
     
      const reader = new FileReader();
    
      if (file !== undefined) {
        reader.readAsDataURL(file);

        reader.onload = () => {
        // Cuando termina, resolvemos la promesa con el resultado
          resolve(reader.result as string);
        };

        reader.onerror = (error) => {
        // Si falla, rechazamos la promesa
          reject(error);
        };
        
      }
    
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagen: file,
      }))

      const aux = await getBase64(file) 
      const base64Data = aux.includes(",") 
        ? aux.split(",")[1] 
        : aux;
      setPreviewImage(base64Data)

      console.log(aux)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
          <CardDescription>Actualiza tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Avatar Section */}
            <input type="hidden" name="image" value={previewImage || ""} />

            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={ previewImage || "/placeholder.svg"} alt="Foto de perfil" />
                <AvatarFallback>
                  {formData.name[0]}
                  {formData.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-input" />
                <Label
                  htmlFor="image-input"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Cambiar Foto
                </Label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  name="lastname"
                  type="text"
                  placeholder="Tu apellido"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="contraseña">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Dejar en blanco para no cambiar"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Dejar vacío si no deseas cambiar tu contraseña</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}