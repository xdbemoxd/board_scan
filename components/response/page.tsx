"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ResponseDisplayProps {
  content: string | null | undefined
  isLoading?: boolean
}

export function ResponseDisplay({ content, isLoading = false }: ResponseDisplayProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isStreaming, setIsStreaming] = useState(true)

  useEffect(() => {
    if (!content) return

    setDisplayedText("")
    setIsStreaming(true)
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedText(content.substring(0, currentIndex + 3))
        currentIndex += 3
      } else {
        setIsStreaming(false)
        clearInterval(interval)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [content])

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted border border-border">
      <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
        {displayedText.split("\n").map((paragraph, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 size={14} className="animate-spin" />
          <span>Obteniendo respuesta...</span>
        </div>
      )}

      {isStreaming && content && <div className="h-5 w-1 bg-primary animate-pulse" />}
    </div>
  )
}