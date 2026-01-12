"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { X } from "lucide-react"
import { queryG } from '../../types/qGem';
import { queryGemini } from "@/app/lib/GeminiResponse/action"
import { ResponseDisplay } from "../response/page"

export function Chat() {
  const [ text, setText ] = useState( "" )
  const [ image64, setImage64 ] = useState< string | null >()
  const [ preview, setPreview ] = useState< string | null >( null )
  const [ fileName, setFileName ] = useState< string | null >( null )
  const [ responseAi, setResponseAI ] = useState< string | null | undefined >( null )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file : File | undefined = e.target.files?.[0]
    const aux = await getBase64(file)

    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      setFileName(file.name)
      setImage64(aux)
      
    }

  }

  const removeImage = () => {
    setPreview(null)
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

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

  const handleSubmit = async () => {
    if (!text.trim() && !preview) {

      console.log(text)

      return
    }

    const data : queryG = { query:text, image64, fileName }

    // Aquí puedes enviar los datos (text + image) a tu backend
    //console.log("Enviando:", data)

    const response = await queryGemini(data)
    
    setResponseAI(response)

    // Reset después de enviar
    setText("")
    removeImage()
    setImage64("")
  }

  return (
    
    <div className="flex flex-col w-full max-w-xl gap-4 p-4">
    
      <div className="flex items-end gap-2">
    
        <div className="flex-1 flex flex-col gap-2">
    
          {/* Text input */}

           {preview && (
            <div className="relative w-full max-w-sm rounded-lg border border-border overflow-hidden bg-muted">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-32 object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                aria-label="Eliminar imagen"
              >
                <X size={16} />
              </button>
              <div className="text-xs text-muted-foreground px-2 py-1 truncate">{fileName}</div>
            </div>
          )}
    
          <Input
            type="text"
            placeholder="Escribe tu mensaje o sube una imagen..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (text.trim() || preview)) {
                handleSubmit()
              }
            }}
            className="bg-white dark:bg-neutral-900 text-foreground"
          />

         
        
        </div>

        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Subir imagen"
        />

        <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} title="Subir imagen">
          📷
        </Button>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() && !preview}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Enviar
        </Button>
      </div>
      
      <ResponseDisplay content={responseAi} />

    </div>
  )
}