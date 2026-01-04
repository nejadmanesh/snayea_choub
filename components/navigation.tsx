"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="#" className="text-2xl font-bold tracking-tight">
            حمید رضا شفیع‌آبادی
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#portfolio" className="text-sm hover:text-accent transition-colors">
              نمونه کارها
            </Link>
            <Link href="#services" className="text-sm hover:text-accent transition-colors">
              خدمات
            </Link>
            <Link href="#contact" className="text-sm hover:text-accent transition-colors">
              تماس
            </Link>
            <a
              href="https://www.instagram.com/sanaayea_choub/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              اینستاگرام
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="#portfolio" className="block text-sm hover:text-accent transition-colors">
              نمونه کارها
            </Link>
            <Link href="#services" className="block text-sm hover:text-accent transition-colors">
              خدمات
            </Link>
            <Link href="#contact" className="block text-sm hover:text-accent transition-colors">
              تماس
            </Link>
            <a
              href="https://www.instagram.com/sanaayea_choub/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm text-center"
            >
              اینستاگرام
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
