"use client"

import { useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { language } = useLanguage()

  useEffect(() => {
    // Update the HTML lang attribute based on current language
    document.documentElement.lang = language.toLowerCase()
  }, [language])

  return <>{children}</>
}
